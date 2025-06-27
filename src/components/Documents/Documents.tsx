import { useQuery } from "@tanstack/react-query";
import Document from "./Document";
import queryKeys from "../../constant/query-keys";
import { getAllDocuments } from "../../api-calls/docuemnt-api";
import useErrorToest from "../../hooks/useErrorToest";

const Documents = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [queryKeys.DOCUMENT],
    queryFn: getAllDocuments,
  });

  useErrorToest({ isError, error: error ?? undefined });

  if (isPending) return <p>Loading...</p>;

  return (
    <section className="container !my-5 !space-y-5">
      {data?.map((doc, i) => (
        <Document doc={doc} key={i} />
      ))}
    </section>
  );
};

export default Documents;
