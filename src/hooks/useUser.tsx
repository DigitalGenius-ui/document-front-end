import { createContext, useContext } from "react";
import type { userApiType } from "../api-calls/api";

interface userContext {
  user: userApiType | undefined;
}

export const Context = createContext<userContext>({} as userContext);

export const useUser = () => useContext(Context);
