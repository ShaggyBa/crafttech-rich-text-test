import { IToolbar } from "@/types/interfaces/IToolbar";
import React, { useEffect, useRef, useState } from "react";
import { Html } from "react-konva-utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";


const Toolbar: React.FC<IToolbar> = ({
	ref,
	targetRef,
	setValue,
	value,
}) => {
	const toolbarRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ top: 0, left: 0, visible: false });



	// не работает
	useEffect(() => {
		const updatePosition = () => {
			if (!targetRef.current) return;

			const stage = targetRef.current.getStage();
			if (!stage) return;

			const { x, y } = targetRef.current.absolutePosition();
			const stageBox = stage.container().getBoundingClientRect();

			setPosition({
				top: y + stageBox.top - 50, // выше выделенного элемента
				left: x + stageBox.left - 50,
				visible: true,
			});
		};

		if (targetRef.current) {
			updatePosition();
			window.addEventListener("scroll", updatePosition);
			window.addEventListener("resize", updatePosition);
		}

		return () => {
			window.removeEventListener("scroll", updatePosition);
			window.removeEventListener("resize", updatePosition);
		};
	}, [targetRef]);

	if (!position.visible) return null;

	return (
		<Html
		>
			<div
				ref={toolbarRef}
				style={{
					background: "transparent",
					padding: "5px",
				}}
			>
				<ReactQuill
					value={value}
					style={{
						width: "200px",
						fontSize: "16px"
					}}
					ref={ref}
					onChange={setValue}
					theme="bubble"
					modules={{
						toolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link"]],
					}}
				/>
			</div>
		</Html>
	);
};

export default Toolbar;
