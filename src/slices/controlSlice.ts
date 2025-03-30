import { TOOLS } from "@/types/enum";
import { IControlState } from "@/types/interfaces/index"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IControlState = {
	selectedTool: TOOLS.CURSOR, // начальный инструмент
};

const controlSlice = createSlice({
	name: "control",
	initialState,
	reducers: {
		setTool: (state, action: PayloadAction<string>) => {
			state.selectedTool = action.payload;
		},
	},
});

export const { setTool } = controlSlice.actions;
export default controlSlice.reducer;
