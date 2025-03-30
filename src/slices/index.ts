import {
	addShape,
	removeShape,
	clearCanvas,
} from "@slices/canvasElementsSlice";
import { setTool } from "@slices/controlSlice";
import { startEditing, stopEditing } from "@/slices/editSlice";
import {
	selectElement,
	deselectElement,
	clearSelection,
} from "@/slices/selectedSlice";

export {
	addShape,
	removeShape,
	clearCanvas,
	setTool,
	startEditing,
	stopEditing,
	selectElement,
	deselectElement,
	clearSelection,
};
