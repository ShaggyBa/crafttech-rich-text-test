import { stopEditing, clearSelection, addShape, removeShape } from "@/slices/index";
import { IShape } from "@/types/interfaces/index";
import Konva from "konva";
import { useRef } from "react";
import { Layer, Stage } from "react-konva";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Shape from "@/components/Shape/Shape";
import styles from "./Canvas.module.scss"; // Импортируем модульные SCSS стили
import { RootState } from "@/store/store";
import { SHAPE_TYPES, TOOLS } from "@/types/enum";

const Canvas = () => {
	const figures = useSelector((state: RootState) => state.canvasElements.figures, shallowEqual);

	const stageRef = useRef<Konva.Stage>(null);

	const tool = useSelector((state: RootState) => state.control.selectedTool);

	const dispatch = useDispatch();

	const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
		switch (tool) {
			case TOOLS.CURSOR:
				break;
			case TOOLS.SHAPE:
				const stage = e.target.getStage();

				if (!stage) return;

				const stageOffset = stage.absolutePosition();
				const point = stage.getPointerPosition();

				if (!point) return;

				const figure: IShape = {
					id: Date.now().toString(36),
					width: 100,
					height: 100,
					x: point.x - stageOffset.x,
					y: point.y - stageOffset.y,
					html: "",
					text: "",
					style: {
						fill: "",
						stroke: "",
						strokeWidth: 0,
						type: SHAPE_TYPES.CIRCLE,
					}
				};
				dispatch(addShape(figure));

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

		if (tool === TOOLS.ERASER) {
			const clickedShape = figures.find(
				(fig) => fig.id === e.target.attrs["data-id"]
			);
			if (!clickedShape) return;
			dispatch(removeShape(clickedShape.id));
		}
	};

	return (
		<div className={styles.canvasWrapper}>
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				draggable={tool === TOOLS.CURSOR}
				onMouseDown={handleStageMouseDown}
				onClick={handleOnClick}
				ref={stageRef}
			>
				<Layer>
					{figures.map((figure: IShape) => (
						<Shape key={figure.id} {...figure} />
					))}
				</Layer>
			</Stage>
		</div>
	);
};

export default Canvas;
