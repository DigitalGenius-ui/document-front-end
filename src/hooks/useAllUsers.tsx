import { useQuery } from "@tanstack/react-query";
import queryKeys from "../constant/query-keys";
import { getAllUsers } from "../api-calls/user-api";

const useAllUsers = () => {
  const { data: allUsers, isPending } = useQuery({
    queryKey: [queryKeys.USERS],
    queryFn: getAllUsers,
  });

  return { allUsers, isPending };
};

export default useAllUsers;
