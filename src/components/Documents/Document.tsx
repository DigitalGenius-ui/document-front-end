import { useEffect, useState } from "react";
import moment from "moment";
import { visibilityStatus } from "../../constant/visibilty";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  removeDoc,
  updateDoc,
  type documentType,
} from "../../api-calls/docuemnt-api";
import useCreateData from "../../hooks/useCreateData";
import queryKeys from "../../constant/query-keys";
import { useUser } from "../../hooks/useUser";
import clsx from "clsx";

type docType = documentType & {
  user: { email: string; id: string; userName: string };
};

const Document = ({ doc }: { doc: docType }) => {
  const { user } = useUser();
  const [edit, setEdit] = useState<string | null>(null);
  const [visibility, setVisibilty] = useState("");
  const [newTitle, setNewTitle] = useState<string>("Untitled");

  const { submitForm: updateData, isPending: updatePending } = useCreateData({
    key: [queryKeys.DOCUMENT],
    func: updateDoc,
  });

  const { submitForm: remove, isPending: removePending } = useCreateData({
    key: [queryKeys.DOCUMENT],
    func: removeDoc,
  });

  const handleEdit = async () => {
    if (edit === doc.documentId) {
      await updateData({
        inputData: {
          documentId: doc.documentId,
          title: newTitle,
          visibility,
        },
        dataMessage: "Document has been updated!!",
      });
      setEdit(null);
      return;
    } else {
      setEdit(doc.documentId);
    }
  };

  const handleRemove = async () => {
    await remove({
      inputData: doc?.documentId,
      dataMessage: "Document has been removed!",
    });
  };

  useEffect(() => {
    if (doc) {
      setVisibilty(doc.visibility);
      setNewTitle(doc.title);
    }
  }, [doc]);

  const isUserMatch = user?.id === doc.userId;

  const openLink = isUserMatch
    ? `/singleDocument/${doc?.documentId}`
    : `/previewDocument/${doc.documentId}`;

  const visibilityColor = {
    Public: "bg-green-500",
    Draft: "bg-gray-500",
    Private: "bg-yellow-500",
  };

  return (
    <div
      className={clsx(
        `bg-white !p-3 shadow-md !rounded-sm relative`,
        doc?.visibility === "Draft" && "opacity-50 hover:opacity-100"
      )}
    >
      {isUserMatch && (
        <div className="!absolute !top-3 !right-3 !text-sm mb-5 !space-x-2">
          {edit === doc?.documentId && (
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleRemove}
            >
              {removePending ? "Removing..." : "Delete"}
            </Button>
          )}
          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={handleEdit}
          >
            {edit !== null ? (updatePending ? "Editing..." : "Save") : "Edit"}
          </Button>
        </div>
      )}
      {isUserMatch && edit === doc.documentId ? (
        <input
          placeholder="Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border border-gray-400 !p-1 text-sm outline-none"
        />
      ) : (
        <Link
          to={openLink}
          className="!max-w-fit text-xl line-clamp-2 text-gray-700 hover:text-blue-600"
        >
          {doc?.title}
        </Link>
      )}
      <div className="flex items-center justify-between !pt-10 !text-sm text-gray-600">
        <p>@{doc.user.userName}</p>
        <div className="flex items-center gap-2">
          <p>Last Modified : {moment(doc.updatedAt).fromNow()}</p>
          {isUserMatch && edit === doc.documentId ? (
            <select
              value={visibility}
              onChange={(e) => setVisibilty(e.target.value)}
              className="border border-gray-400 !text-sm !p-1 outline-none !cursor-pointer"
            >
              {visibilityStatus.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          ) : (
            <p className="relative">
              {doc?.visibility}
              <span
                className={clsx(
                  `block !w-[7px] !h-[7px] rounded-full absolute top-0 -right-1
                  ${visibilityColor[doc.visibility]}`
                )}
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Document;
