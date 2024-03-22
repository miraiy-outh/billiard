import { useEffect, useRef, useState } from "react";
import { TBall, TBallMove } from "../../types";
import "./canvas.css"
export function Canvas({width, height, balls}:{width:number, height:number, balls:TBall[]}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ballsState, setBallsState] = useState<TBall[]>(balls); // Состояние для хранения координат и других данных о шариках
  const [isDragging, setIsDragging] = useState<boolean>(false); // Состояние для отслеживания зажатия кнопки мыши
  const [draggedBallIndex, setDraggedBallIndex] = useState<number | null>(null); // Состояние для хранения индекса перемещаемого шарика
  const [ballCoordinates, setMouseCoordinates] = useState<TBallMove>({prevX: 0, prevY: 0, speedX: 0, speedY: 0})

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Функция для обновления холста
    const updateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ballsState.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
      });
    };

    // Обработчик события mousedown
    const handleMouseDown = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect(); // Получаем размеры и позицию холста
      const mouseX = event.clientX - rect.left; // Получаем координаты мыши относительно холста
      const mouseY = event.clientY - rect.top;

      // Проверяем, был ли щелчок внутри какого-либо шарика
      const clickedBallIndex = ballsState.findIndex(ball =>
        Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2) <= ball.radius
      );

      if (clickedBallIndex !== -1) { // Если щелчок был внутри шарика
        setIsDragging(true); // Устанавливаем состояние зажатия кнопки мыши
        setDraggedBallIndex(clickedBallIndex); // Сохраняем индекс перемещаемого шарика
      }
    };

    // Обработчик события mousemove
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || draggedBallIndex === null) return; // Если кнопка не зажата или индекс не установлен, выходим

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      

      // Обновляем координаты перемещаемого шарика
      setBallsState(prevBalls =>
        prevBalls.map((ball, index) =>
          index === draggedBallIndex
            ? { ...ball, x: mouseX, y: mouseY }
            : ball
        )
      );
      // Обновляем координаты мыши
      setMouseCoordinates(prevMouse => {
        return {
          speedX: prevMouse.prevX - mouseX,
          speedY: prevMouse.prevY - mouseY,
          prevX: mouseX,
          prevY: mouseY 
        }
      })

      console.log(ballCoordinates)
    };

    const handleBallMoveAfterMouseUp = () => {
      let speedX = ballCoordinates.speedX;
      let speedY = ballCoordinates.speedY;
      const releaseSpeed = Math.sqrt(speedX ** 2 + speedY ** 2); // Вычисляем общую скорость при отпускании кнопки мыши
      const decelerationFactor = 0.95; // Фактор замедления
      const maxDecelerationIterations = 100; // Максимальное количество итераций замедления
    
      let iterations = 0;
      const decelerate = setInterval(function() {
        if (iterations >= maxDecelerationIterations || releaseSpeed < 0.1) { // Проверяем, достигли ли мы минимальной скорости или максимального количества итераций
          clearInterval(decelerate);
        } 
        else {
          // Обновляем координаты перемещаемого шарика
          setBallsState(prevBalls =>
          prevBalls.map((ball, index) =>
          index === draggedBallIndex
            ? { ...ball, x: ball.x - speedX, y: ball.y - speedY }
            : ball
        )
      );
          speedX *= decelerationFactor; // Уменьшаем скорость с каждой итерацией
          speedY *= decelerationFactor;
          iterations++;
        }
      }, 1000 / 60);  
    }

    // Обработчик события mouseup
    const handleMouseUp = () => {
      setIsDragging(false); // Сбрасываем состояние зажатия кнопки мыши
      handleBallMoveAfterMouseUp();
      setDraggedBallIndex(null); // Сбрасываем индекс перемещаемого шарика
    };

    updateCanvas(); // Обновляем холст при инициализации

    // Добавляем обработчики событий
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    // Удаляем обработчики событий при завершении работы
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [ballsState, isDragging, draggedBallIndex]);

  // Возвращаем JSX-разметку с элементом canvas
  return <canvas
    id="canvas"
    ref={canvasRef} // Подключаем ссылку на элемент canvas
    height={height}
    width={width}
  />;
}
