import React, { useEffect, useState } from "react";
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
import Placeholder from "@tiptap/extension-placeholder";
import useAllUsers from "../../hooks/useAllUsers";
import useCreateData from "../../hooks/useCreateData";
import queryKeys from "../../constant/query-keys";
import { createDocument } from "../../api-calls/docuemnt-api";
import { useParams } from "react-router-dom";
import useSingleDoc from "../../hooks/useSingleDoc";
import { useDebouncedCallback } from "use-debounce";
import type { documentValidation } from "../../validation/document-validation";
import type { z } from "zod";

const TextEditor = () => {
  // display the mentioned users
  const { allUsers } = useAllUsers();
  const userNamesRef = React.useRef<string[]>([]);
  userNamesRef.current = allUsers?.map((u) => u.userName) ?? [];

  const [title, setTitle] = useState<string>("Untitled");
  const [content, setContent] = useState<string>("");
  const [mention, setMention] = useState<string[]>([]);

  // update the document
  const { submitForm, isPending } = useCreateData({
    key: [queryKeys.DOCUMENT],
    func: createDocument,
  });

  const { id } = useParams();

  const { doc } = useSingleDoc(id);

  useEffect(() => {
    if (doc) {
      setContent(doc?.content || "");
      setTitle(doc?.title || "Untiltled");
    }
  }, [doc]);

  const debouncedSave = useDebouncedCallback(
    async (value: z.infer<typeof documentValidation>) => {
      await submitForm({
        inputData: value,
        dataMessage: "",
      });
    },
    1000
  );

  useEffect(() => {
    if (!id || !content) return;
    if (content) {
      debouncedSave({
        title,
        content,
        mentions: mention,
        documentId: id,
      });
    }
  }, [title, content, mention, debouncedSave, id]);

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Type something here...",
      }),
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
        suggestion: {
          items: ({ query }: { query: string }) => {
            return userNamesRef.current
              .filter((item) =>
                item.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 5);
          },
          ...suggestion,
        },
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
      const doc = editor.getJSON();
      const mentions: string[] = [];

      type MentionNode = {
        type?: string;
        attrs?: {
          id?: string;
          label?: string;
          class?: string;
        };
        content?: MentionNode[];
      };
      const findMentions = ({ type, attrs, content }: MentionNode) => {
        if (type === "mention" && attrs?.id) {
          mentions.push(attrs.id);
        }
        if (content) {
          content.forEach(findMentions);
        }
      };
      findMentions(doc);
      setMention([...new Set(mentions)]);
    },
  });

  // replaced the saved document to the editor.
  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor?.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <>
      <Toolbar
        isPending={isPending}
        title={title}
        setTitle={setTitle}
        editor={editor}
      />
      <section className="!w-[816px] !mx-auto bg-white h-full shadow-md">
        <EditorContent editor={editor} />
      </section>
    </>
  );
};

export default TextEditor;
