import { ChevronDown } from "lucide-react";
import React from "react";

type SelectType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement;
  title: string;
};

const Select = ({ open, setOpen, children, title }: SelectType) => {
  return (
    <section className="relative !mx-2">
      <p
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-[10rem] border 
        border-gray-300 !py-0.5 !px-2 !text-sm cursor-pointer`}
      >
        <span className="!line-clamp-1">{title}</span>
        <ChevronDown className="size-3" />
      </p>
      {open && (
        <div
          className="flex flex-col items-start bg-white shadow-md absolute left-0 right-0 
            top-7 z-10"
        >
          {children}
        </div>
      )}
    </section>
  );
};

export default Select;
