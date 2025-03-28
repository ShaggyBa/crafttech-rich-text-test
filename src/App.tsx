import { useRef } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Control from "./components/Control/Control";
import Konva from "konva";

function App() {
  return (
    <>
      <Canvas />
      <Control />
    </>
  );
}

export default App;
