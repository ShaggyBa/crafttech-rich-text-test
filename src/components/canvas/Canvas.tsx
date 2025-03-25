import { useState } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../Shape/Shape";
import styles from "./Canvas.module.scss"; // Импортируем модульные SCSS стили
import { stopEditing } from "@/slices/editSlice";
import { clearSelection } from "@/slices/selectedSlice";
import { useDispatch } from "react-redux";

const Canvas = ({ tool, stageRef }: any) => {
	const [figures, setFigures] = useState<any>([]);

	const dispatch = useDispatch()

	const handleOnClick = (e: any) => {
		if (tool === "cursor") return;
		const stage = e.target.getStage();
		const stageOffset = stage.absolutePosition();
		const point = stage.getPointerPosition();
		setFigures((prev: any) => [
			...prev,
			{
				id: Date.now().toString(36),
				width: 100,
				height: 100,
				type: "rect",
				x: point.x - stageOffset.x,
				y: point.y - stageOffset.y,
				html: "",
				text: "",
			},
		]);
	};

	const handleStageMouseDown = (e: any) => {
		// Получаем ссылку на кликнутый элемент
		const clickedOnEmpty = e.target === e.target.getStage();

		if (clickedOnEmpty) {
			// Очищаем выделенные элементы и редактируемый элемент
			dispatch(clearSelection());
			dispatch(stopEditing());
		}
	};

	return (
		<div className={styles.canvasWrapper}>
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				draggable={tool === "cursor"}
				onMouseDown={handleStageMouseDown}
				onClick={handleOnClick}
				ref={stageRef}
			>
				<Layer>
					{figures.map((figure: any, i: number) => (
						<Shape key={i} {...figure} stageRef={stageRef} tool={tool} />
					))}
				</Layer>
			</Stage>
		</div>
	);
};

export default Canvas;
