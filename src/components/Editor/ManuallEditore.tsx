import { ChevronDown, Link2Icon } from "lucide-react";
import { ToolBarButton } from "../../utils/ToolBarButton";
import { type Editor } from "@tiptap/react";
import { useState } from "react";
import clsx from "clsx";

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
    <section className="relative !mx-2">
      <p
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-[8rem] border 
        border-gray-300 !py-0.5 !px-2 !text-sm cursor-pointer`}
      >
        <span className="!line-clamp-1">
          {editor?.getAttributes("textStyle").fontFamily || "Arial"}
        </span>
        <ChevronDown className="size-3" />
      </p>
      {open && (
        <div
          className="flex flex-col items-start bg-white shadow-md absolute left-0 right-0 
        -bottom-[9rem] z-10"
        >
          {fonts.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.value)}
              className={clsx(
                "!p-1 w-full text-start cursor-pointer hover:bg-gray-200",
                editor?.getAttributes("textStyle").fontFamily === item.value &&
                  "bg-gray-300"
              )}
              style={{ fontFamily: item.value }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
