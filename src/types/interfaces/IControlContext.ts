import { RefObject } from "react";

export interface IControlContext {
	selectedControl: RefObject<string> | undefined;
}