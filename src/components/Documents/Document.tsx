import { useState } from "react";
import moment from "moment";
import { visibilityStatus } from "../../constant/visibilty";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  removeDoc,
  updatedDoc,
  type documentType,
} from "../../api-calls/docuemnt-api";
import useCreateData from "../../hooks/useCreateData";
import queryKeys from "../../constant/query-keys";

const Document = ({ doc }: { doc: documentType }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [visibility, setVisibilty] = useState("");

  const { submitForm: updateData, isPending: updatePending } = useCreateData({
    key: [queryKeys.DOCUMENT],
    func: updatedDoc,
  });

  const { submitForm: remove, isPending: removePending } = useCreateData({
    key: [queryKeys.DOCUMENT],
    func: removeDoc,
  });

  const handleEdit = async () => {
    if (edit) {
      await updateData({
        inputData: { visibility, documentId: doc.documentId },
        dataMessage: "Document has been updated!!",
      });
      setEdit(false);
      return;
    } else {
      setEdit(true);
    }
  };

  const handleRemove = async () => {
    await remove({
      inputData: doc?.documentId,
      dataMessage: "Document has been removed!",
    });
  };
  return (
    <div className="bg-white !p-3 shadow-md !rounded-sm relative">
      <div className="!absolute !top-3 !right-3 !text-sm mb-5 !space-x-2">
        {edit && (
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
          {edit ? (updatePending ? "Editing..." : "Save") : "Edit"}
        </Button>
      </div>
      <Link to={`/singleDocument/${doc?.documentId}`}>
        <h1 className="text-xl line-clamp-2 text-gray-700 hover:text-blue-600">
          {doc?.title !== "" ? (
            doc?.title
          ) : (
            <div
              className="line-clamp-2"
              dangerouslySetInnerHTML={{ __html: doc.content }}
            />
          )}
        </h1>
      </Link>
      <div className="flex items-center justify-between !pt-10 !text-sm text-gray-600">
        <p>@miladamiri</p>
        <div className="flex items-center gap-2">
          <p>{moment().format("LL")}</p>
          {!edit ? (
            <p>{doc?.visibility}</p>
          ) : (
            <select
              value={visibility}
              onChange={(e) => setVisibilty(e.target.value)}
              className="border border-gray-400 !text-sm !p-1 outline-none !cursor-pointer"
            >
              {visibilityStatus.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default Document;
