import { IToolbar } from "@/types/interfaces/Toolbar/IToolbar";
import React, { useEffect, useRef, useState } from "react";
import { Html } from "react-konva-utils";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import "./ToolBar.module.scss";
const Toolbar: React.FC<IToolbar> = ({ setValue, value, width, height }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <Html>
      <div
        ref={toolbarRef}
        style={{
          width: width ? `${width}px` : "100px",
          height: height ? `${height}px` : "100px",
          background: "transparent",
          padding: 0,
        }}
        spellCheck={false}
      >
        <ReactQuill
          value={value}
          style={{
            width: "inherit",
            height: "inherit",
          }}
          onChange={setValue}
          className="toolbarContainer"
          theme="bubble"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }], // Заголовки H1, H2, H3 и обычный текст
              [{ font: [] }], // Шрифты
              [{ size: [] }], // Размер шрифта
              ["bold", "italic", "underline", "strike"], // Жирный, курсив, подчёркнутый, зачёркнутый
              [{ color: [] }, { background: [] }], // Цвет текста и фона
              [{ list: "ordered" }, { list: "bullet" }], // Нумерованный и маркированный список
              [{ align: [] }], // Выравнивание
              ["clean"],
            ],
          }}
        />
      </div>
    </Html>
  );
};

export default Toolbar;
