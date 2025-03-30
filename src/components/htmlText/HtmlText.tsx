import { IHtmlText } from "@/types/interfaces/index";
import { forwardRef, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "./HtmlText.module.scss";

const HtmlText = forwardRef<HTMLDivElement, IHtmlText>(
	({ html, id, width, height, isEditing, setValue, onCallbackHandler }, ref) => {
		const [value, setLocalValue] = useState(html);
		const quillRef = useRef<ReactQuill | null>(null);
		const containerRef = useRef<HTMLDivElement | null>(null);

		// Нашел рабочее решение для запекания форматирования от квилла
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (!isEditing) return;

				const quillContainer = quillRef.current?.getEditor()?.root;
				const toolbar = document.querySelector(".ql-toolbar");

				if (
					quillContainer &&
					!quillContainer.contains(event.target as Node) &&
					toolbar &&
					!toolbar.contains(event.target as Node) &&
					containerRef.current &&
					!containerRef.current.contains(event.target as Node)
				) {
					onCallbackHandler();
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, [isEditing, onCallbackHandler]);

		return (
			<div
				id={`htmltext_${id}`}
				ref={(el) => {
					if (typeof ref === "function") ref(el);
					else if (ref) ref.current = el;
					containerRef.current = el;
				}}
				style={{
					width: width ? `${width}px` : "auto",
					height: height ? `${height}px` : "auto",
					overflowWrap: "break-word",
				}}
			>
				<ReactQuill
					ref={quillRef}
					value={value}
					onChange={(val) => {
						setLocalValue(val);
						setValue(val);
					}}
					theme="bubble"
					style={{ height: "100%", width: "100%" }}
					modules={{
						toolbar: [
							[{ header: [1, 2, 3, false] }],
							[{ font: [] }],
							[{ size: [] }],
							["bold", "italic", "underline", "strike"],
							[{ color: [] }, { background: [] }],
							[{ list: "ordered" }, { list: "bullet" }],
							[{ align: [] }],
							["clean"],
						],
					}}
				/>

			</div>
		);
	}
);

export default HtmlText;
