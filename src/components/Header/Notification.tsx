import { IconButton, Badge, MenuItem, Menu } from "@mui/material";
import { Bell } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constant/query-keys";
import {
  getUserNotification,
  openNotification,
} from "../../api-calls/docuemnt-api";
import { useUser } from "../../hooks/useUser";
import moment from "moment";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import useCreateData from "../../hooks/useCreateData";

const Notification = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<null | HTMLElement>(null);
  const anchorEl = Boolean(open);
  const { user } = useUser();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  //   display all notifications
  const { data } = useQuery({
    queryKey: [queryKeys.NOTIFY],
    queryFn: async () => await getUserNotification(user?.userName),
  });

  const unOpenNotifications = data?.filter((notify) => !notify?.isOpen);

  // open the notification
  const { submitForm } = useCreateData({
    key: [queryKeys.NOTIFY],
    func: openNotification,
  });

  const handleClose = () => {
    setOpen(null);
  };

  const itemClick = async (docId: string) => {
    await submitForm({ inputData: docId, dataMessage: "" });
    navigate(`/singleDocument/${docId}`);
    handleClose();
  };
  return (
    <>
      <Badge badgeContent={unOpenNotifications?.length} color="primary">
        <IconButton size="small" color="primary" onClick={handleClick}>
          <Bell />
        </IconButton>
      </Badge>

      <Menu
        anchorEl={open}
        open={anchorEl}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {data && data?.length > 0 ? (
          data?.map((item) => (
            <MenuItem
              className={clsx(
                "!border-b !border-black/20",
                !item.isOpen && "!bg-blue-100"
              )}
              key={item.id}
              onClick={() => itemClick(item.documentId)}
            >
              <div className={clsx("text-sm !space-y-2")}>
                <p>{item.title}</p>
                <span className="!block !text-end text-[10px]">
                  {moment(item.updatedAt).format("LL")}
                </span>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No notification is detected!</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Notification;
