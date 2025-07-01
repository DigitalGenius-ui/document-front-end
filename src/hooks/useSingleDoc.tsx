import { useQuery } from "@tanstack/react-query";
import {
  getSingleDocuments,
  type documentType,
} from "../api-calls/docuemnt-api";
import queryKeys from "../constant/query-keys";

const useSingleDoc = (id: string | undefined) => {
  const { data: doc } = useQuery<documentType>({
    queryKey: [queryKeys.DOCUMENT, id],
    queryFn: async () => await getSingleDocuments(id),
  });

  return {
    doc,
  };
};

export default useSingleDoc;
