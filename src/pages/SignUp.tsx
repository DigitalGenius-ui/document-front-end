import { signUpFn } from "../api-calls/auth-api";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidSchemas } from "../validation/auth-validation";
import type { z } from "zod";
import FormError from "../utils/FormError";
import useCreateData from "../hooks/useCreateData";
import queryKeys from "../constant/query-keys";
import { signUpInputs } from "../constant/Inputs";

type registerInputType = z.infer<typeof registerValidSchemas>;

const SignUp = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerValidSchemas),
    defaultValues: {
      userName: "amir",
      email: "amir@gmail.com",
      password: "amir12345",
      confirmPassword: "amir12345",
    },
  });

  const { submitForm, isPending } = useCreateData<registerInputType>({
    key: [queryKeys.USER],
    func: signUpFn,
  });

  const onSubmit = async (values: registerInputType) => {
    await submitForm({
      inputData: values,
      dataMessage: "User is signed up!",
    });

    navigate("/");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[20rem] border rounded-lg flex flex-col !p-2 text-center gap-3"
      >
        <h1>SignUp form</h1>

        {signUpInputs.map((input) => (
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
          {isPending ? "Loading..." : "Sign Up"}
        </button>
        <Link to={"/sign-in"}>Sign in Here</Link>
      </form>
    </div>
  );
};

export default SignUp;
