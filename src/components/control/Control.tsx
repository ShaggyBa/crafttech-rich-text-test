import { useDispatch, useSelector } from "react-redux";
import { setTool } from "@/slices/controlSlice";
import { RootState } from "@/store/store";
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
					id="cursor"
					name="control"
					value="cursor"
					checked={tool === "cursor"}
					onChange={handleOnChange}
				/>
				<label htmlFor="cursor">Взаимодействие</label>
			</div>

			<div>
				<input
					type="radio"
					id="shape"
					name="control"
					value="shape"
					checked={tool === "shape"}
					onChange={handleOnChange}
				/>
				<label htmlFor="shape">Добавление</label>
			</div>

			<div>
				<input
					type="radio"
					id="eraser"
					name="control"
					value="eraser"
					checked={tool === "eraser"}
					onChange={handleOnChange}
				/>
				<label htmlFor="eraser">Удаление</label>
			</div>
		</div>
	);
};

export default Control;
