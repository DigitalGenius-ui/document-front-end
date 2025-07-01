import { IconButton, Badge, MenuItem } from "@mui/material";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { socket } from "../../config/socket.io";
import queryClient from "../../config/react-query";
import DropMenu from "../../utils/DropMenu";

type notificationType = {
  createdAt: Date;
  documentId: string;
  id: string;
  isOpen: boolean;
  mentionedUser: string;
  title: string;
  updatedAt: Date;
};

const Notification = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<null | HTMLElement>(null);
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

  const itemClick = async (docId: string) => {
    await submitForm({ inputData: docId, dataMessage: "" });
    navigate(`/previewDocument/${docId}`);
  };

  useEffect(() => {
    const handleNotify = (data: notificationType) => {
      queryClient.setQueryData(
        [queryKeys.NOTIFY],
        (old: notificationType[] | undefined) => [...(old ?? []), data]
      );
    };

    const handleNotifyRemove = (message: string) => {
      if (message) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.NOTIFY] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.DOCUMENT] });
      }
    };

    socket.on("notify", handleNotify);
    socket.on("removeNotify", handleNotifyRemove);

    return () => {
      socket.off("notify", handleNotify);
      socket.off("removeNotify", handleNotify);
    };
  }, []);

  return (
    <>
      <Badge badgeContent={unOpenNotifications?.length} color="primary">
        <IconButton size="small" color="primary" onClick={handleClick}>
          <Bell />
        </IconButton>
      </Badge>

      <DropMenu open={open} setOpen={setOpen}>
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
                  {moment(item.createdAt).fromNow()}
                </span>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No notification is detected!</MenuItem>
        )}
      </DropMenu>
    </>
  );
};

export default Notification;
