import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailFn } from "../api-calls/auth-api";
import useCreateData from "../hooks/useCreateData";
import queryKeys from "../constant/query-keys";

const VerifyEmailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { submitForm, isPending } = useCreateData({
    key: [queryKeys.USER],
    func: verifyEmailFn,
  });

  const handleSubmit = async () => {
    await submitForm({
      inputData: code as string,
      dataMessage: "Email has been verified!",
    });
    navigate("/", { replace: true });
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[20rem] border rounded-lg flex flex-col !p-2 text-center gap-3">
        <h1>Click to verify your Email</h1>

        <button
          onClick={handleSubmit}
          className="!p-4 bg-blue-600 text-white cursor-pointer hover:opacity-90"
        >
          {isPending ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
