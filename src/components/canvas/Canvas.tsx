import { stopEditing } from "@/slices/editSlice";
import { clearSelection } from "@/slices/selectedSlice";
import { ICanvas } from "@/types/interfaces/ICanvas";
import { IShape } from "@/types/interfaces/IShape";
import Konva from "konva";
import { useState } from "react";
import { Layer, Stage } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import Shape from "@components/Shape/Shape";
import styles from "./Canvas.module.scss"; // Импортируем модульные SCSS стили
import { RootState } from "@/store/store";



const Canvas = ({ stageRef }: ICanvas) => {
	const [figures, setFigures] = useState<IShape[]>([]);

	const tool = useSelector((state: RootState) => state.control.selectedTool);

	const dispatch = useDispatch()

	const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {

		switch (tool) {
			case "cursor":
				break;
			case "shape":
				const stage = e.target.getStage();

				if (!stage) return

				const stageOffset = stage.absolutePosition();
				const point = stage.getPointerPosition();

				if (!point) return

				setFigures((prev: IShape[]) => [
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
						tool: tool,
					},
				]);
				break;
			default:
				break;
		}


	};

	const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
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
					{figures.map((figure: IShape, i: number) => (
						<Shape key={i} {...figure} stageRef={stageRef} tool={tool} />
					))}
				</Layer>
			</Stage>
		</div>
	);
};

export default Canvas;
