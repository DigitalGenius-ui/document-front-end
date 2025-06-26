import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Mention from "@tiptap/extension-mention";
import Toolbar from "./Toolbar";
import { suggestion } from "./suggestions";
import { useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";

const TextEditor = () => {
  const [content, setContent] = useState<string>("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      Underline,
      TextStyle,
      FontFamily,
      Placeholder.configure({
        placeholder: "Type something here...",
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        style: "padding-left:50px; padding-right:56px; padding-top:10px;",
        class: "focus:outline-none flex flex-col min-h-[1054px] w-[816px]",
      },
    },
    onUpdate: ({ editor }: { editor: Editor }) => {
      setContent(editor.getHTML());
    },
  });
  return (
    <>
      <Toolbar editor={editor} />
      <section className="!w-[816px] !mx-auto bg-white h-full shadow-md !my-2">
        <EditorContent editor={editor} />
      </section>
    </>
  );
};

export default TextEditor;
