import Konva from "konva";
import { RefObject } from "react";

export interface ICanvas {
	tool: string;
	stageRef: RefObject<Konva.Stage>
}
