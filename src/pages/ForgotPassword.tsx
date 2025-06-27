import { useState } from "react";
import { forgotPasswordFn } from "../api-calls/auth-api";
import useCreateData from "../hooks/useCreateData";
import queryKeys from "../constant/query-keys";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { submitForm, isPending } = useCreateData({
    key: [queryKeys.AUTH],
    func: forgotPasswordFn,
  });

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Pleas fill the input");
      return;
    }
    await submitForm({
      inputData: email,
      dataMessage: "Reset link sent to your email.",
    });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[20rem] border rounded-lg flex flex-col !p-2 text-center gap-3">
        <h1>Forgot Password</h1>
        <p className="text-rose-600">
          {message && <span className="text-red-600">{message}</span>}
        </p>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="!p-2 rounded-full border"
        />
        <button
          onClick={handleSubmit}
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
