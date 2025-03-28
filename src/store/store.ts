import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "@slices/selectedSlice";
import editReducer from "@slices/editSlice";
import controlReducer from "@slices/controlSlice";
import canvasElementsReducer from "@/slices/canvasElementsSlice";
export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    edit: editReducer,
    control: controlReducer,
    canvasElements: canvasElementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
