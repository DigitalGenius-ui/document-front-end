import { useEffect } from "react";
import toast from "react-hot-toast";

interface errorToast {
  isError: boolean;
  error?: {
    message?: string;
    response?: {
      data?: {
        message?: string;
      };
    };
  };
}

const useErrorToest = ({ error, isError }: errorToast) => {
  const message = error?.response?.data?.message || error?.message;

  useEffect(() => {
    if (isError) {
      toast.error(message || "something went wrong!!");
    }
  }, [isError, message]);
};

export default useErrorToest;
