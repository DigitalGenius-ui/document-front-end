type signInUpputType = {
  type: string;
  placeholder: string;
  name: "userName" | "email" | "password" | "confirmPassword";
};

export const signUpInputs: signInUpputType[] = [
  {
    type: "text",
    placeholder: "UserName...",
    name: "userName",
  },
  {
    type: "email",
    placeholder: "email",
    name: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "password",
  },
  {
    type: "password",
    placeholder: "confirm password",
    name: "confirmPassword",
  },
];

type signIninputType = {
  type: string;
  placeholder: string;
  name: "email" | "password";
};

export const signInInputs: signIninputType[] = [
  {
    type: "email",
    placeholder: "email",
    name: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "password",
  },
];
