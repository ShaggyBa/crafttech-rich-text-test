import { IHtmlText } from "@/types/interfaces/IHtmlText";
import { forwardRef } from "react";



const HtmlText = forwardRef<HTMLDivElement, IHtmlText>(({ html, id, width, height }, ref) => {
	return (
		<div
			id={`htmltext_${id}`}
			dangerouslySetInnerHTML={{ __html: html }}
			style={{
				position: "fixed",
				overflow: "hidden",
				left: "100000px",
				top: "100000px",
				padding: "5px",
				margin: "0px",
				fontSize: "12px",
				fontFamily: "Arial, sans-serif",
				width: width ? `${width}px` : "auto",
				height: height ? `${height}px` : "auto",
				overflowWrap: "break-word"
			}}
			ref={ref}
		></div>
	);
});

export default HtmlText;
