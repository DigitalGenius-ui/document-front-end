import { Menu } from "@mui/material";
import type React from "react";

type DropMenu = {
  open: HTMLElement | null;
  handleClose: () => void;
  children: React.ReactElement;
};

const DropMenu = ({ open, children, handleClose }: DropMenu) => {
  const anchorEl = Boolean(open);
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
