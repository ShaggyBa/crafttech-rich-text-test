import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "@slices/selectedSlice";
import editReducer from "@slices/editSlice";
import controlReducer from "@slices/controlSlice";
export const store = configureStore({
	reducer: {
		selected: selectedReducer,
		edit: editReducer,
		control: controlReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
