import moment from "moment";
import useSingleDoc from "../../hooks/useSingleDoc";
import { useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Mention from "@tiptap/extension-mention";
import { useEffect } from "react";

const PreviewDocument = () => {
  const { id } = useParams();
  const { doc } = useSingleDoc(id);

  const content = doc?.content;

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
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
      }),
    ],
    editable: false,
    content: content,
  });

  // replaced the saved document to the editor.
  useEffect(() => {
    if (!doc && editor && content) return;
    if (content && content !== editor?.getHTML()) {
      editor?.commands.setContent(content, false);
    }
  }, [doc, editor, content]);

  return (
    <section className="!w-[816px] !mx-auto bg-yellow-50 text-black text-sm min-h-[842px] shadow-md !my-2 relative">
      <div className="!p-6">
        <h1 className="text-2xl !text-gray-600 !pb-[2rem]">{doc?.title}</h1>
        <EditorContent editor={editor} />
      </div>
      <div className="flex items-center justify-between absolute bottom-3 left-3 right-3 !text-xs text-gray-500">
        <p>Author : @{doc?.user?.userName}</p>
        <p>Last Modified : {moment(doc?.updatedAt).format("LL")}</p>
      </div>
    </section>
  );
};

export default PreviewDocument;
