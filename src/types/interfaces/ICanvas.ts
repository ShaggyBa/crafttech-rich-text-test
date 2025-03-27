import Konva from "konva";
import { RefObject } from "react";

export interface ICanvas {
	stageRef: RefObject<Konva.Stage>
}
