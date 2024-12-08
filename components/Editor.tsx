"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

export default function Editor() {
  const ejInstance = useRef<EditorJS>();

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = undefined;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      tools: {
        header: Header,
        list: List,
      },
      autofocus: true,
    });
  };

  const handleClick = async () => {
    const aa = await await ejInstance?.current?.saver.save();
    console.log(aa);
  };

  return (
    <div className="container">
      <div id="editorjs"></div>
      <button onClick={handleClick}>버튼</button>
    </div>
  );
}
