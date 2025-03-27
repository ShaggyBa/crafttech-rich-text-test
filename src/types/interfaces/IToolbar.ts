import Konva from "konva";
import ReactQuill from "react-quill";

export interface IToolbar {
	ref: React.RefObject<ReactQuill>;
	targetRef: React.RefObject<Konva.Group>; // ссылка на Konva-объект
	setValue: React.Dispatch<React.SetStateAction<string>>;
	value: string;
}