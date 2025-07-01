import { Menu } from "@mui/material";
import type React from "react";

type DropMenu = {
  open: HTMLElement | null;
  setOpen: (el: HTMLElement | null) => void;
  children: React.ReactNode;
};

const DropMenu = ({ open, children, setOpen }: DropMenu) => {
  const anchorEl = Boolean(open);

  const handleClose = () => {
    setOpen(null);
  };
  return (
    <Menu
      id="basic-menu"
      anchorEl={open}
      open={anchorEl}
      onClose={handleClose}
      slotProps={{
        list: {
          "aria-labelledby": "basic-button",
        },
      }}
    >
      {children}
    </Menu>
  );
};

export default DropMenu;
