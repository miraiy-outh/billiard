import { Canvas } from "./components/canvas/Canvas";

function App() {
  const width = 1000;
  const height = 800;
  const balls = [
    { x: 100, y: 100, radius: 20, color: 'red' },
    { x: 200, y: 200, radius: 30, color: 'blue' },
    { x: 300, y: 300, radius: 25, color: 'yellow' }
  ];

  return (
    <div className="app">
      <Canvas 
        width={width}
        height={height}
        balls={balls}
      />
    </div>
  );
}

export default App
