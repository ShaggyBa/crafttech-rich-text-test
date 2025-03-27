import { Stage } from "konva/lib/Stage";
import { RefObject } from "react";

export interface IShape {
	id: string;
	width: number;
	height: number;
	type: string;
	x: number;
	y: number;
	html: string;
	text: string;
	stageRef?: RefObject<Stage>;
	tool: string;
}
