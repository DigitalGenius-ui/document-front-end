import { Link2Icon } from "lucide-react";
import { ToolBarButton } from "../../utils/ToolBarButton";
import { type Editor } from "@tiptap/react";
import { useState } from "react";
import clsx from "clsx";
import Select from "../../utils/Select";
import type { Level } from "@tiptap/extension-heading";

export const PostLink = ({ editor }: { editor: Editor | null }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section className="relative">
      <ToolBarButton
        icon={Link2Icon}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute -bottom-16 !p-3 shadow-md flex items-center gap-2 bg-white z-10">
          <input
            className="!p-1.5 outline-none border border-gray-300 rounded-sm !text-sm"
            type="text"
            placeholder="https://"
          />
          <button className="bg-black rounded-sm text-white !p-2 !px-3 !text-[10px] cursor-pointer hover:opacity-80">
            Submit
          </button>
        </div>
      )}
    </section>
  );
};

export const FontFamily = ({ editor }: { editor: Editor | null }) => {
  const [open, setOpen] = useState<boolean>(false);

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Time New Roman", value: "Time New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  const handleClick = (item: string) => {
    editor?.chain().focus().setFontFamily(item).run();
    setOpen(false);
  };

  return (
    <Select
      open={open}
      setOpen={setOpen}
      title={editor?.getAttributes("textStyle").fontFamily || "Arial"}
    >
      <>
        {fonts.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.value)}
            className={clsx(
              "!p-1 w-full text-start cursor-pointer hover:bg-gray-200 text-sm",
              editor?.getAttributes("textStyle").fontFamily === item.value &&
                "bg-gray-300"
            )}
            style={{ fontFamily: item.value }}
          >
            {item.label}
          </button>
        ))}
      </>
    </Select>
  );
};

// get headings
export const Headings = ({ editor }: { editor: Editor | null }) => {
  const [open, setOpen] = useState<boolean>(false);
  const headings = [
    { label: "Normal Text", level: 0, fontSize: "16px" },
    { label: "Heading 1", level: 1, fontSize: "32px" },
    { label: "Heading 2", level: 2, fontSize: "24px" },
    { label: "Heading 3", level: 3, fontSize: "20px" },
    { label: "Heading 4", level: 4, fontSize: "18px" },
    { label: "Heading 5", level: 5, fontSize: "16px" },
  ];

  const currentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }

    return "Normal Text";
  };

  const handleClick = (level: number) => {
    if (level === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: level as Level })
        .run();
    }
    setOpen(false);
  };

  return (
    <Select open={open} setOpen={setOpen} title={currentHeading()}>
      <>
        {headings.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item?.level)}
            className={clsx(
              "!p-1 w-full text-start cursor-pointer hover:bg-gray-200",

              item.level === 0 ||
                (editor?.isActive("heading", { level: item.level }) &&
                  "bg-gray-300")
            )}
            style={{ fontSize: item.fontSize }}
          >
            {item.label}
          </button>
        ))}
      </>
    </Select>
  );
};
