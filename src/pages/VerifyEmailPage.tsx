import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailFn } from "../libs/api";

const VerifyEmailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => await verifyEmailFn(code as string),
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {isError && (
        <p className="text-rose-600">Verification failed. Please try again.</p>
      )}
      <button
        onClick={() => mutate()}
        className="!p-4 bg-blue-600 text-white cursor-pointer hover:opacity-90"
      >
        {isPending ? "Verifying..." : "Verify Email"}
      </button>
    </div>
  );
};

export default VerifyEmailPage;
