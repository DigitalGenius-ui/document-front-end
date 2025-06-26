import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface ToolBarButtonType {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export const ToolBarButton = ({
  onClick,
  icon: Icon,
  isActive,
}: ToolBarButtonType) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `!text-sm w-8 min-h-8 flex items-center justify-center
        hover:bg-neutral-200 cursor-pointer`,
        isActive && "bg-neutral-300"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};
