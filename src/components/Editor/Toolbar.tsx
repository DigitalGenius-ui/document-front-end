import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  SpellCheck,
  Underline,
  Undo2Icon,
  type LucideIcon,
} from "lucide-react";
import { ToolBarButton } from "../../utils/ToolBarButton";
import { type Editor } from "@tiptap/react";
import { FontFamily, PostLink } from "./ManuallEditore";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const sections: {
    lable: string;
    isActive?: boolean;
    icon: LucideIcon;
    onClick: () => void;
  }[][] = [
    [
      {
        lable: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        lable: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        lable: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        lable: "spell check",
        icon: SpellCheck,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
      {
        lable: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
    ],
    [
      {
        lable: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        lable: "underline",
        icon: Underline,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
      {
        lable: "list todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        lable: "remove formatting",
        icon: RemoveFormatting,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <section className="!py-2 shadow-sm flex items-center !px-2 bg-white">
      <div className="!w-[80%] !mx-auto">
        <div className="flex items-center">
          {sections[0].map((item) => (
            <ToolBarButton key={item.lable} {...item} />
          ))}
          <div className="w-[0.5px] h-[20px] bg-gray-300" />
          <PostLink editor={editor} />
          <FontFamily editor={editor} />
          <div className="w-[0.5px] h-[20px] bg-gray-300" />
          {sections[1].map((item) => (
            <ToolBarButton key={item.lable} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Toolbar;
