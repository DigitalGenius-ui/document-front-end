import { signInFn } from "../api-calls/auth-api";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidSchemas } from "../validation/auth-validation";
import type { z } from "zod";
import { signInInputs } from "../constant/Inputs";
import FormError from "../utils/FormError";
import useCreateData from "../hooks/useCreateData";
import queryKeys from "../constant/query-keys";

type loginType = z.infer<typeof loginValidSchemas>;

const SignIn = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginValidSchemas),
    defaultValues: {
      email: "amir@gmail.com",
      password: "amir12345",
    },
  });

  const { submitForm, isPending } = useCreateData<loginType>({
    key: [queryKeys.USER],
    func: ({ email, password }) => signInFn(email, password),
  });

  const onSubmit = async (values: loginType) => {
    await submitForm({
      inputData: values,
      dataMessage: "User is loggedin!",
    });
    navigate("/");
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[20rem] border rounded-lg flex flex-col !p-2 text-center gap-3"
      >
        <h1>Sign form</h1>
        {signInInputs.map((input) => (
          <div key={input.name}>
            <input
              {...input}
              className="!p-2 rounded-sm border w-full outline-none"
              {...register(input.name)}
            />
            <FormError name={input.name} errors={errors} />
          </div>
        ))}
        <button
          type="submit"
          className="bg-gray-500 !p-2 text-white cursor-pointer"
        >
          {isPending ? "Loading..." : "Sign In"}
        </button>
        <Link to={"/forgot-password"}>Forgot Password</Link>
        <Link to={"/sign-up"}>Sign Up Here</Link>
      </form>
    </div>
  );
};

export default SignIn;
