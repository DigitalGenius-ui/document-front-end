import { useMutation } from "@tanstack/react-query";
import { deleteSession, type typeSession } from "../libs/api";
import { timeChange } from "../utils/date";
import { SESSION_KEY } from "../config/APiClient";
import queryClient from "../config/react-query";

const SingleSession = ({ s }: { s: typeSession }) => {
  const { id, userAgent, createdAt, isCurrent } = s;

  const { mutate, isPending, isError } = useMutation<typeSession[]>({
    mutationFn: () => deleteSession(id),
    onSuccess: () => {
      queryClient.setQueryData([SESSION_KEY], (oldData: typeSession) => {
        if (!oldData) return [];
        // Ensure oldData is an array before filtering
        return (Array.isArray(oldData) ? oldData : []).filter(
          (item) => item.id !== id
        );
      });
    },
  });
  return (
    <>
      <p>{isError && "Something wen wrong!!!"}</p>
      <div className="border !p-4 !mb-3">
        <p>session : {userAgent}</p>
        <p>Created on : {timeChange(createdAt)}</p>
        <p>{isCurrent ? "Current session" : ""}</p>
        {!isCurrent && (
          <button
            onClick={() => mutate()}
            className="text-red-400 !ml-auto border !p-1 !mt-2 cursor-pointer"
          >
            {isPending ? "Loading..." : "Remove"}
          </button>
        )}
      </div>
    </>
  );
};

export default SingleSession;
