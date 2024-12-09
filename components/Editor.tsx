"use client";

import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
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

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    // const EditorJS = dynamic(await () => import('@editorjs/editorjs'), {
    //   ssr: false,
    // })

    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
      },
      autofocus: true,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await ejInstance.current?.saver.save();
        setContent(content);
      },
    });
  }, [setContent]);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = undefined;
    };
  }, [initEditor]);

  return <div id="editorjs"></div>;
}

export default memo(Editor);
