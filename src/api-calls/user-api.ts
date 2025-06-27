import API from "../config/APiClient";
import type { userApiType } from "./auth-api";

export const getUser = async (): Promise<userApiType> => API.get("/user");

export const getAllUsers = async (): Promise<userApiType[]> => {
  return await API.get("/user/allUsers");
};
