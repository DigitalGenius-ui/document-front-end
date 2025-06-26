import { useState } from "react";
import { forgotPasswordFn } from "../libs/api";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const {
    mutate: handleForgotPassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => await forgotPasswordFn(email),
    onSuccess: () => {
      setMessage("Reset link sent to your email.");
    },
  });
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[20rem] border rounded-lg flex flex-col !p-2 text-center gap-3">
        <h1>Forgot Password</h1>
        <p className="text-rose-600">
          {isError && "Pleas fill all the fields"}
          {message && <span className="text-green-600">{message}</span>}
        </p>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="!p-2 rounded-full border"
        />
        <button
          onClick={() => handleForgotPassword()}
          type="submit"
          className="bg-gray-500 !p-2 text-white cursor-pointer"
        >
          {isPending ? "Loading..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
