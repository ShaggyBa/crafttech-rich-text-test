import { ICanvasContext } from "@/types/interfaces/Canvas/ICanvasContext";
import { IShape } from "@/types/interfaces/Shape/IShape";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICanvasContext = {
  figures: [],
};

const canvasElementsSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<IShape>) => {
      state.figures.push(action.payload);
    },
    updateShape: (state, action: PayloadAction<IShape>) => {
      const index = state.figures.findIndex(
        (fig) => fig.id === action.payload.id
      );
      if (index !== -1) {
        state.figures[index] = action.payload;
      }
    },
    removeShape: (state, action: PayloadAction<string>) => {
      state.figures = state.figures.filter((fig) => fig.id !== action.payload);
    },
    clearCanvas: (state) => {
      state.figures = [];
    },
  },
});

export const { addShape, removeShape, clearCanvas } =
  canvasElementsSlice.actions;
export default canvasElementsSlice.reducer;
