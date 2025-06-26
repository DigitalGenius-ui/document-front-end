import { useQuery } from "@tanstack/react-query";
import { SESSION_KEY } from "../config/APiClient";
import { getSession, type typeSession } from "../libs/api";

const useSession = () => {
  const {
    data: session,
    isPending,
    isError,
  } = useQuery<typeSession[]>({
    queryKey: [SESSION_KEY],
    queryFn: getSession,
  });

  return { session, isPending, isError };
};

export default useSession;
