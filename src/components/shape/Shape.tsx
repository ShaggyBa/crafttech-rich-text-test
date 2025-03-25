import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { Group, Rect, Image } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../HtmlText/HtmlText";
import { IShape } from "@/types/interfaces/IShape";

import { useDispatch, useSelector } from "react-redux";
import { startEditing, stopEditing } from "@/slices/editSlice";
import { selectElement } from "@/slices/selectedSlice";
import { RootState } from "@/store/store";

const Shape = (props: IShape) => {
	const { x, y, width, height, id, text } = props;
	const [value, setValue] = useState(text);
	const [image, setImage] = useState<any>(null);

	const groupRef = useRef<any>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const imageRef = useRef<any>(null);
	const htmlRef = useRef<any>(null);

	const currentTool = useSelector((state: RootState) => state.control.selectedTool);

	const dispatch = useDispatch();
	const editedElementId = useSelector((state: RootState) => state.edit.editedElementId);
	const selectedElements = useSelector((state: RootState) => state.selected.selectedElements);

	const isSelected = selectedElements.includes(id);
	const isEditing = editedElementId === id;

	// Отрисовка текста в Image
	const renderImage = async () => {
		const htmltext = document.getElementById(`htmltext_${id}`);
		if (!htmltext || htmltext.innerHTML.trim() === "") return;

		// Даем время на рендер перед захватом canvas
		await new Promise((resolve) => setTimeout(resolve, 50));

		console.log(htmltext)
		const canvas = await html2canvas(htmltext, {
			backgroundColor: "rgba(0,0,0,0)",
			width: width, // Принудительно задаем ширину
			height: height, // Принудительно задаем высоту
		});

		// Проверяем, чтобы размеры canvas не были 0x0
		if (canvas.width === 0 || canvas.height === 0) return;

		setImage(canvas);
	};

	useEffect(() => {
		renderImage();

		textareaRef.current?.focus();

	}, [isEditing, value]);

	const handleClick = (event: any) => {
		event.cancelBubble = true;
		if (currentTool !== "cursor") return;

		if (isEditing || id !== editedElementId) {
			dispatch(stopEditing());
			setValue(value);
		}

		if (!isSelected) {
			dispatch(selectElement(id));
		}
	};

	const handleDoubleClick = (event: any) => {
		event.cancelBubble = true;
		if (currentTool !== "cursor") return;

		dispatch(startEditing(id));

	};

	const handleInput = (e: any) => {
		setValue(e.target.value);
	};

	return (
		<Group
			x={x}
			y={y}
			onClick={handleClick}
			onDblClick={handleDoubleClick}
			ref={groupRef}
			draggable
		>
			<Rect stroke={isSelected ? "blue" : "black"} width={width} height={height} fill="white" />

			{
				isEditing ? (
					<Html>
						<textarea
							ref={textareaRef}
							value={value}
							onChange={handleInput}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: `${width}px`,
								height: `${height}px`,
								border: "none",
								outline: "none",
								fontSize: "16px",
								fontFamily: "Arial, sans-serif",
								padding: "5px",
								margin: "0px",
								overflow: "hidden",
								background: "transparent",
								resize: "none",
							}}
						/>
					</Html>
				) : image ? (
					<Image ref={imageRef} image={image} x={0} y={0} width={width} height={height} />
				) : null
			}
			{/* Сюда должен будет вставляться отформатированный текст с react-quill */}
			<Html>
				<HtmlText ref={htmlRef} html={value} width={width} height={height} id={id} />
			</Html>
		</Group>
	);
};

export default Shape;