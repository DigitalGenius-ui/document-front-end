import { useQuery } from "@tanstack/react-query";
import { AUTH_KEY } from "../config/APiClient";
import { getUser, type userApiType } from "../libs/api";

const useUser = () => {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery<userApiType>({
    queryKey: [AUTH_KEY],
    queryFn: getUser,
    staleTime: Infinity,
  });

  return { user, isPending, isError };
};

export default useUser;
