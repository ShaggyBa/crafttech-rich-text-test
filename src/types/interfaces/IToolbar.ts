import Konva from "konva";

export interface IToolbar {
	targetRef: React.RefObject<Konva.Group>; // ссылка на Konva-объект
	setValue: React.Dispatch<React.SetStateAction<string>>;
	value: string;
	width?: number;
	height?: number;
}