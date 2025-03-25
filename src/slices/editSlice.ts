import { EditState } from "@/types/interfaces/IEditState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: EditState = {
	editedElementId: null,
};

const editSlice = createSlice({
	name: "edit",
	initialState,
	reducers: {
		startEditing: (state, action: PayloadAction<string>) => {
			state.editedElementId = action.payload;
		},
		stopEditing: (state) => {
			state.editedElementId = null;
		},
	},
});

export const { startEditing, stopEditing } = editSlice.actions;
export default editSlice.reducer;
