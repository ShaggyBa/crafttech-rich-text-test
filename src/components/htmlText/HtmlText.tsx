import { IHtmlText } from "@/types/interfaces/IHtmlText";
import { forwardRef } from "react";
import "./HtmlText.module.scss";


const HtmlText = forwardRef<HTMLDivElement, IHtmlText>(({ html, id, width, height }, ref) => {

	// Функция нужна для удаления стилей Quill, которые не рендерились при конвертации html2canvas
	function cleanQuillHtml(html: string): string {
		if (!html) return "";

		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html");

		doc.querySelectorAll<HTMLElement>("[class*='ql-size-']").forEach((el) => {
			const classList = el.classList;
			if (classList.contains("ql-size-small")) {
				el.style.fontSize = ".75em";
			} else if (classList.contains("ql-size-large")) {
				el.style.fontSize = "1.5em";
			} else if (classList.contains("ql-size-huge")) {
				el.style.fontSize = "2.5em";
			}
			el.classList.remove("ql-size-small", "ql-size-large", "ql-size-huge");
		});

		doc.querySelectorAll<HTMLElement>("[class*='ql-font-']").forEach((el) => {
			const classList = el.classList;
			if (classList.contains("ql-font-serif")) {
				el.style.fontFamily = "serif";
			} else if (classList.contains("ql-font-monospace")) {
				el.style.fontFamily = "monospace";
			}
			el.classList.remove("ql-font-serif", "ql-font-monospace");
		});

		doc.querySelectorAll<HTMLElement>("[class*='ql-align-']").forEach((el) => {
			const classList = el.classList;

			if (classList.contains("ql-align-center")) {
				el.style.textAlign = "center";
			} else if (classList.contains("ql-align-right")) { //Осталась проблема с правым выравниванием
				el.style.textAlign = "right";
			}
			else if (classList.contains("ql-align-left")) {
				el.style.textAlign = "left";

			} else if (classList.contains("ql-align-justify")) {
				el.style.textAlign = "justify";
			}
			el.classList.remove("ql-align-center", "ql-align-right", "ql-align-justify");
		})

		doc.querySelectorAll<HTMLElement>("li[data-list='bullet']").forEach((li) => {
			let parent = li.closest("ol");
			if (parent) {
				const ul = document.createElement("ul");
				ul.innerHTML = parent.innerHTML;
				parent.replaceWith(ul);
			}
		});

		doc.querySelectorAll<HTMLElement>("li[data-list]").forEach((li) => {
			li.removeAttribute("data-list");
		});

		return doc.body.innerHTML;
	}


	return (
		<div
			id={`htmltext_${id}`}
			dangerouslySetInnerHTML={{ __html: cleanQuillHtml(html) }}
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
