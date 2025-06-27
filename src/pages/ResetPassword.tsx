import { useState } from "react";
import { resetPasswordFn } from "../api-calls/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useCreateData from "../hooks/useCreateData";
import queryKeys from "../constant/query-keys";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [isError, setIsError] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();

  const validLink = code && exp && exp > now;

  const { submitForm, isPending } = useCreateData({
    key: [queryKeys.AUTH],
    func: resetPasswordFn,
  });

  const codeString = code as string;

  const handleSubmit = async () => {
    if (!password || !confPassword) {
      setIsError("Please fill the inputs!!");
      return;
    }
    await submitForm({
      inputData: { password, code: codeString },
      dataMessage: "Password has been resetted!",
    });
    navigate("/sign-in", { replace: true });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[20rem] border rounded-lg ">
        {validLink ? (
          <div className="flex flex-col !p-2 text-center gap-3">
            <h1>Reset Password Form</h1>
            <p className="text-rose-600">
              {isError && "Pleas fill all the fields"}
            </p>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!p-2 rounded-full border"
            />
            <input
              type="password"
              placeholder="confirm password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className="!p-2 rounded-full border"
            />
            <button
              onClick={handleSubmit}
              disabled={password !== confPassword}
              type="submit"
              className="bg-gray-500 !p-2 text-white cursor-pointer"
            >
              {isPending ? "Loading..." : "Reset Password"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col !p-2 text-center gap-3">
            <h1>Invalid or Expired Link</h1>
            <Link to="/forgot-password" className="text-rose-600">
              Please request a new password reset link.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
