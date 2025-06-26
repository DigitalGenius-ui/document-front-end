import API from "../config/APiClient";

export const signInFn = async (email: string, password: string) => {
  const data = await API.post("/auth/login", { email, password });
  return data;
};

export const signUpFn = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const data = await API.post("/auth/register", {
    email,
    password,
    confirmPassword,
  });
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

export const resetPasswordFn = async (password: string, code: string) => {
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
export const getUser = async (): Promise<userApiType> => API.get("/user");
export const getSession = async (): Promise<typeSession[]> =>
  API.get("/session");
export const deleteSession = async (id: string): Promise<typeSession[]> =>
  API.delete(`/session/${id}`);
