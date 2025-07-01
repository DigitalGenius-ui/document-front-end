import { useQuery } from "@tanstack/react-query";
import queryKeys from "../../constant/query-keys";
import { getAllDocuments } from "../../api-calls/docuemnt-api";
import useErrorToest from "../../hooks/useErrorToest";
import { useMemo } from "react";
import { useUser } from "../../hooks/useUser";
import InvisibleDoc from "./InvisibleDoc";
import { TriangleAlert } from "lucide-react";
import { Button } from "@mui/material";
import useCreateData from "../../hooks/useCreateData";
import { sendVerifyCode } from "../../api-calls/auth-api";

const Documents = () => {
  const { user } = useUser();
  const { data, isPending, isError, error } = useQuery({
    queryKey: [queryKeys.DOCUMENT],
    queryFn: getAllDocuments,
  });

  useErrorToest({ isError, error: error ?? undefined });

  const publicDocs = useMemo(() => {
    return data?.filter((item) => item.visibility === "Public") || [];
  }, [data]);

  const draftDocs = useMemo(() => {
    return (
      data?.filter(
        (item) => item.visibility === "Draft" && item.userId === user?.id
      ) || []
    );
  }, [data, user]);

  const privateDocs = useMemo(() => {
    return (
      data?.filter(
        (item) => item.visibility === "Private" && item.userId === user?.id
      ) || []
    );
  }, [data, user]);

  const { submitForm, isPending: codePending } = useCreateData({
    key: [queryKeys.USER],
    func: sendVerifyCode,
  });

  const handleClick = async () => {
    await submitForm({
      inputData: user?.email ?? "",
      dataMessage: "Verify email has been sent",
    });
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <section className="container !my-5 !space-y-5">
      {user && !user?.verified && (
        <div className="flex items-center justify-center">
          <div
            className="flex items-center flex-col gap-3 bg-rose-200 !p-3 !rounded-md border 
            border-rose-300 text-rose-500"
          >
            <p className="flex items-center gap-2">
              <span>
                <TriangleAlert />
              </span>
              Your account is not verified yet!
            </p>
            <Button onClick={handleClick} variant="outlined" color="error">
              {codePending ? "Verifiying..." : "Click To receive Virify code!"}
            </Button>
          </div>
        </div>
      )}
      <InvisibleDoc docs={draftDocs} title="Draft Documents :" />
      <InvisibleDoc docs={privateDocs} title="Private Documents :" />
      <InvisibleDoc docs={publicDocs} title="Public Documents :" />
    </section>
  );
};

export default Documents;
