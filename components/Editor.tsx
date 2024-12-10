"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { Saver } from "@editorjs/editorjs/types/api";
import { OutputData } from "@editorjs/editorjs";

type EditorJSType = {
  destroy: () => void;
  saver: Saver;
};

interface EditorProps {
  setContent: Dispatch<SetStateAction<OutputData | undefined>>;
}

function Editor({ setContent }: EditorProps) {
  const ejInstance = useRef<EditorJSType>();
  const [isMounted, setMounted] = useState(false);

  const initEditor = useCallback(async () => {
    if (!isMounted) return;
    const EditorJS = (await import("@editorjs/editorjs")).default;

    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
      },
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await ejInstance.current?.saver.save();
        setContent(content);
      },
    });
  }, [isMounted, setContent]);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = undefined;
    };
  }, [initEditor]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <div id="editorjs"></div>;
}

export default Editor;
