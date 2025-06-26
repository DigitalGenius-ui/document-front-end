import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signInFn } from "../libs/api";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    mutate: handleLogin,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => await signInFn(email, password),
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[20rem] border rounded-lg flex flex-col !p-2 text-center gap-3"
      >
        <h1>Sign form</h1>
        <p className="text-rose-600">{isError && "Wrong email or password"}</p>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="!p-2 rounded-full border"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="!p-2 rounded-full border"
        />
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
