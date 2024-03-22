import { TMenu } from "../../types";

export function Menu({setColor}:TMenu) {
    const colors = ['red', 'green', 'blue', 'yellow'];

  return (
    <div>
      {colors.map((color) => (
        <button key={color} onClick={() => setColor(color)}>
          {color}
        </button>
      ))}
    </div>
  );
}