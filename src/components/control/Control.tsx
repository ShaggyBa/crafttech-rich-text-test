import { setTool } from "@/slices/index";
import { RootState } from "@/store/store";
import { TOOLS } from "@/types/enum";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Control.module.scss";
import { BsEraser } from "react-icons/bs";
import { FaShapes } from "react-icons/fa6";
import { GiArrowCursor } from "react-icons/gi";

const Control = () => {
	const dispatch = useDispatch();
	const tool = useSelector((state: RootState) => state.control.selectedTool);

	const handleOnChange = (toolType: TOOLS) => {
		dispatch(setTool(toolType));

	};

	const getIconStyle = (currentTool: TOOLS) => {
		return {
			fill: currentTool === tool ? "blue" : "black",
			fontSize: "1.5em",
		};
	};

	return (
		<div className={styles.controlContainer}>
			<button
				onClick={() => handleOnChange(TOOLS.CURSOR)}
				className={tool === TOOLS.CURSOR ? styles.toolButton + " " + styles.active : styles.toolButton}
				aria-label="Взаимодействие"
			>
				<GiArrowCursor style={getIconStyle(TOOLS.CURSOR)} />
				<label htmlFor={TOOLS.CURSOR}>Взаимодействие</label>
			</button>
			<button
				onClick={() => handleOnChange(TOOLS.SHAPE)}
				className={tool === TOOLS.SHAPE ? styles.toolButton + " " + styles.active : styles.toolButton}
				aria-label="Добавление"
			>
				<FaShapes style={getIconStyle(TOOLS.SHAPE)} />
				<label htmlFor={TOOLS.SHAPE}>Добавление</label>
			</button>
			<button
				onClick={() => handleOnChange(TOOLS.ERASER)}
				className={tool === TOOLS.ERASER ? styles.toolButton + " " + styles.active : styles.toolButton}
				aria-label="Удаление"
			>
				<BsEraser style={getIconStyle(TOOLS.ERASER)} />
				<label htmlFor={TOOLS.ERASER}>Удаление</label>
			</button>
		</div >
	);
};

export default Control;
