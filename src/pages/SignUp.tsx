import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUpFn } from "../libs/api";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();

  const {
    mutate: handleRegister,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => await signUpFn(email, password, confPassword),
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[20rem] border rounded-lg flex flex-col !p-2 text-center gap-3"
      >
        <h1>SignUp form</h1>
        <p className="text-rose-600">
          {isError && "Pleas fill all the fields"}
        </p>
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
        <input
          type="password"
          placeholder="confirm password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          className="!p-2 rounded-full border"
        />
        <button
          type="submit"
          className="bg-gray-500 !p-2 text-white cursor-pointer"
        >
          {isPending ? "Loading..." : "Sign In"}
        </button>
        <Link to={"/sign-in"}>Sign in Here</Link>
      </form>
    </div>
  );
};

export default SignUp;
