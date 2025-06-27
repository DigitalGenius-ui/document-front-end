import React from "react";
import { getUser, type userApiType } from "../api-calls/api";
import queryKeys from "../constant/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Context } from "../hooks/useUser";
import useErrorToest from "../hooks/useErrorToest";

const UserContext = ({ children }: { children: React.ReactElement }) => {
  const {
    data: user,
    isError,
    error,
  } = useQuery<userApiType>({
    queryKey: [queryKeys.USER],
    queryFn: getUser,
    staleTime: Infinity,
  });

  useErrorToest({ isError, error: error ?? undefined });
  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
};

export default UserContext;
