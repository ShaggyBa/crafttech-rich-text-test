import HtmlText from "@/components/HtmlText/HtmlText";
import { selectElement, startEditing, stopEditing } from "@/slices/index";
import { RootState } from "@/store/store";
import { SHAPE_TYPES, TOOLS } from "@/types/enum";
import { IShape } from "@/types/interfaces/index";
import Toolbar from "@components/ToolBar/ToolBar";
import html2canvas from "html2canvas";
import Konva from "konva";
import React, { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Circle, Group, Image, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Shape = React.memo((props: IShape) => {
	const { x, y, width, height, id, text, style } = props;
	const [value, setValue] = useState<string>(text || "");
	const [image, setImage] = useState<CanvasImageSource | null>(null);
	console.log("rerender shape");
	const groupRef = useRef<Konva.Group>(null);
	const imageRef = useRef<Konva.Image | null>(null);
	const htmlRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const { currentTool, editedElementId, selectedElements } = useSelector(
		(state: RootState) => ({
			currentTool: state.control.selectedTool,
			editedElementId: state.edit.editedElementId,
			selectedElements: state.selected.selectedElements,
		}),
		shallowEqual
	);

	const isSelected = useMemo(() => selectedElements.includes(id), [selectedElements, id]);
	const isEditing = useMemo(() => editedElementId === id, [editedElementId, id]);


	const renderImage = async () => {
		const htmltext = document.getElementById(`htmltext_${id}`);
		if (!htmltext || htmltext.innerHTML.trim() === "") return;
		console.log(htmltext.innerHTML);

		// await new Promise((resolve) => setTimeout(resolve, 100));

		const computedStyles = window.getComputedStyle(htmltext);
		for (const key of computedStyles) {
			htmltext.style.setProperty(key, computedStyles.getPropertyValue(key));
		}
		const canvas = await html2canvas(htmltext, {
			backgroundColor: "rgba(0, 0, 0, 0)",
			useCORS: true,
			width: width,
			height: height,
		});

		if (canvas.width === 0 || canvas.height === 0) return;

		setImage(canvas);
	};

	useEffect(() => {
		setImage(null);
		if (!isEditing) renderImage();
	}, [id, isEditing]);

	const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
		e.cancelBubble = true;
		if (currentTool !== TOOLS.CURSOR) return;

		if (isEditing || id !== editedElementId) {
			dispatch(stopEditing());
			setValue(value);
		}

		if (!isSelected) {
			dispatch(selectElement(id));
		}
	};

	const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
		e.cancelBubble = true;
		if (currentTool !== TOOLS.CURSOR) return;

		dispatch(startEditing(id));
	};

	const RenderShape = useMemo(() => {
		switch (style.type) {
			case SHAPE_TYPES.RECT:
				return <Rect width={width} height={height} fill={style.fill || "white"} stroke={isSelected ? "blue" : style.stroke || "black"} strokeWidth={2} data-id={id} />;
			case SHAPE_TYPES.CIRCLE:
				return <Circle radius={width / 2} fill={style.fill || "white"} stroke={isSelected ? "blue" : style.stroke || "black"} strokeWidth={2} data-id={id} />;
			default:
				return <Rect width={width} height={height} fill={style.fill || "white"} stroke={isSelected ? "blue" : style.stroke || "black"} strokeWidth={2} data-id={id} />;
		}
	}, [style, isSelected, width, height, id]);

	return (
		<>
			<Group
				x={x}
				y={y}
				onClick={handleClick}
				onDblClick={handleDoubleClick}
				ref={groupRef}
				draggable
				onDragMove={() => { }} //Избавиться от предупреждений
				onDragEnd={() => { }} //Избавиться от предупреждений
			>
				{RenderShape}

				{isEditing ? (
					<Toolbar
						setValue={setValue}
						value={value}
						width={width}
						height={height}
					/>
				) : image ? (
					<Image
						ref={imageRef}
						image={image}
						x={0}
						y={0}
						width={width}
						height={height}
						data-id={id}
					/>
				) : null}
				<Html>
					<HtmlText
						ref={htmlRef}
						html={value}
						width={width}
						height={height}
						id={id}
					/>
				</Html>
			</Group>
		</>
	);
});

export default Shape;
