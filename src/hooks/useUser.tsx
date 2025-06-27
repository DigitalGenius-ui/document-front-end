import { createContext, useContext } from "react";
import type { userApiType } from "../api-calls/auth-api";

interface userContext {
  user: userApiType | undefined;
  isPending: boolean;
}

export const Context = createContext<userContext>({} as userContext);

export const useUser = () => useContext(Context);
