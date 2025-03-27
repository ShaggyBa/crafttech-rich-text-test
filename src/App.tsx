import { useRef } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import Control from "./components/Control/Control";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Konva from "konva";

function App() {
	const tool = useSelector((state: RootState) => state.control.selectedTool);
	const stageRef = useRef<Konva.Stage>(null);
	return (
		<>
			<Canvas tool={tool} stageRef={stageRef} />
			<Control tool={tool} />
		</>
	);
}

export default App;
