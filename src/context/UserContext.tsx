import React from "react";
import { type userApiType } from "../api-calls/auth-api";
import queryKeys from "../constant/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Context } from "../hooks/useUser";
import { getUser } from "../api-calls/user-api";

const UserContext = ({ children }: { children: React.ReactElement }) => {
  const { data: user, isPending } = useQuery<userApiType>({
    queryKey: [queryKeys.USER],
    queryFn: getUser,
    staleTime: Infinity,
  });

  return (
    <Context.Provider value={{ user, isPending }}>{children}</Context.Provider>
  );
};

export default UserContext;
