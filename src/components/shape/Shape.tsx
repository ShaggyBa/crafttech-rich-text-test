import { IShape } from "@/types/interfaces/Shape/IShape";
import HtmlText from "@components/HtmlText/HtmlText";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { Group, Image, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import { startEditing, stopEditing } from "@/slices/editSlice";
import { selectElement } from "@/slices/selectedSlice";
import { RootState } from "@/store/store";
import Toolbar from "@components/ToolBar/ToolBar";
import { useDispatch, useSelector } from "react-redux";
import Konva from "konva";
import ReactQuill from "react-quill-new";

const Shape = (props: IShape) => {
  const { x, y, width, height, id, text } = props;
  const [value, setValue] = useState<string>(text || "");
  const [image, setImage] = useState<CanvasImageSource | null>(null);

  const groupRef = useRef<Konva.Group>(null);
  const textareaRef = useRef<ReactQuill | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const currentTool = useSelector(
    (state: RootState) => state.control.selectedTool
  );

  const dispatch = useDispatch();
  const editedElementId = useSelector(
    (state: RootState) => state.edit.editedElementId
  );
  const selectedElements = useSelector(
    (state: RootState) => state.selected.selectedElements
  );

  const isSelected = selectedElements.includes(id);
  const isEditing = editedElementId === id;

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
    if (!isEditing) renderImage();

    textareaRef.current?.focus();
  }, [isEditing]);

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    if (currentTool !== "cursor") return;

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
    if (currentTool !== "cursor") return;

    dispatch(startEditing(id));
  };

  return (
    <>
      <Group
        x={x}
        y={y}
        onClick={handleClick}
        onDblClick={handleDoubleClick}
        ref={groupRef}
        draggable
        onDragMove={() => {}} //Избавиться от предупреждений
        onDragEnd={() => {}} //Избавиться от предупреждений
      >
        <Rect
          stroke={isSelected ? "blue" : "black"}
          width={width}
          height={height}
          fill="white"
          data-id={id}
        />

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
};

export default Shape;
