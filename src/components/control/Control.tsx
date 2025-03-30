import { useDispatch, useSelector } from "react-redux";
import { setTool } from "@/slices/index";
import { RootState } from "@/store/store";
import { TOOLS } from "@/types/enum";
const Control = () => {
	const dispatch = useDispatch()

	const tool = useSelector((state: RootState) => state.control.selectedTool);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setTool(e.target.value));
	};

	return (
		<div style={{ position: "absolute", top: "50%" }}>
			<div>
				<input
					type="radio"
					id={TOOLS.CURSOR}
					name="control"
					value={TOOLS.CURSOR}
					checked={tool === TOOLS.CURSOR}
					onChange={handleOnChange}
				/>
				<label htmlFor={TOOLS.CURSOR}>Взаимодействие</label>
			</div>

			<div>
				<input
					type="radio"
					id={TOOLS.SHAPE}
					name="control"
					value={TOOLS.SHAPE}
					checked={tool === TOOLS.SHAPE}
					onChange={handleOnChange}
				/>
				<label htmlFor={TOOLS.SHAPE}>Добавление</label>
			</div>

			<div>
				<input
					type="radio"
					id={TOOLS.ERASER}
					name="control"
					value={TOOLS.ERASER}
					checked={tool === TOOLS.ERASER}
					onChange={handleOnChange}
				/>
				<label htmlFor={TOOLS.ERASER}>Удаление</label>
			</div>
		</div>
	);
};

export default Control;
