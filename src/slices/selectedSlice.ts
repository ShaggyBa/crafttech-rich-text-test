import { ISelectedElementsState } from "@/types/interfaces/Selected/ISelectedElementsState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISelectedElementsState = {
  selectedElements: [],
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    selectElement: (state, action: PayloadAction<string>) => {
      state.selectedElements = [...state.selectedElements, action.payload];
    },
    deselectElement: (state, action: PayloadAction<string>) => {
      state.selectedElements = state.selectedElements.filter(
        (id) => id !== action.payload
      );
    },
    clearSelection: (state) => {
      state.selectedElements = [];
    },
  },
});

export const { selectElement, deselectElement, clearSelection } =
  selectedSlice.actions;
export default selectedSlice.reducer;
