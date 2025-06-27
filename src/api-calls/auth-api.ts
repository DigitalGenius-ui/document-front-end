import type { z } from "zod";
import API from "../config/APiClient";
import type { registerValidSchemas } from "../validation/auth-validation";

export const signInFn = async (email: string, password: string) => {
  const data = await API.post("/auth/login", { email, password });
  return data;
};

export const signUpFn = async (
  params: z.infer<typeof registerValidSchemas>
) => {
  const data = await API.post("/auth/register", params);
  return data;
};

export const verifyEmailFn = async (code: string) => {
  const data = await API.get(`/auth/email/${code}`);
  return data;
};

export const forgotPasswordFn = async (email: string) => {
  const data = await API.post("/auth/password/forgot", { email });
  return data;
};

export const resetPasswordFn = async ({
  password,
  code,
}: {
  password: string;
  code: string;
}) => {
  const data = await API.post("auth/reset/password", {
    password,
    verificationCode: code,
  });
  return data;
};

export type userApiType = {
  createdAt: string;
  email: string;
  id: string;
  userName: string;
  updatedAt: string;
  userAgent: string;
  verified: boolean;
};

export type typeSession = {
  id: string;
  userAgent: string;
  createdAt: string;
  isCurrent?: boolean;
};

export const logOut = async (): Promise<userApiType> => API.get("auth/logout");

export const getSession = async (): Promise<typeSession[]> =>
  API.get("/session");

export const deleteSession = async (id: string): Promise<typeSession[]> =>
  API.delete(`/session/${id}`);
