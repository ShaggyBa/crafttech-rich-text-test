import { forwardRef } from "react";

const HtmlText = forwardRef(({ html, id, width, height }: any, ref: any) => {
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
