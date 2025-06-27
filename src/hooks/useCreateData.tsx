import { useMutation, useQueryClient } from "@tanstack/react-query";
import useErrorToest from "./useErrorToest";
import toast from "react-hot-toast";

type createDataParams<TInput> = {
  key: string[];
  func: (inputData: TInput) => Promise<unknown>;
};

type submitFun<TInput> = {
  inputData: TInput;
  dataMessage: string;
};

const useCreateData = <TInput,>({ key, func }: createDataParams<TInput>) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: func,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: key });
    },
  });

  const submitForm = async ({ inputData, dataMessage }: submitFun<TInput>) => {
    const newData = await mutateAsync(inputData);

    // toast notification
    if (dataMessage) {
      toast.success(dataMessage);
    }
    return newData;
  };

  useErrorToest({ isError, error: error ?? undefined });

  return { submitForm, isPending };
};

export default useCreateData;
