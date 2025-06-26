import { useState } from "react";
import useUser from "../hooks/useUser";
import User from "../components/User";
import Session from "../components/Session";
import { useMutation } from "@tanstack/react-query";
import { AUTH_KEY } from "../config/APiClient";
import { logOut } from "../libs/api";
import queryClient from "../config/react-query";

const UserPage = () => {
  const { user, isPending: userPending } = useUser();
  const [activeTab, setActiveTab] = useState("user");

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: [AUTH_KEY],
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
    },
  });

  const handleClick = () => {
    console.log("clicked");
    mutate();
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="!space-y-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab("user")}
            className="bg-gray-300 hover:bg-gray-200 !p-2 cursor-pointer rounded-md text-black"
          >
            User
          </button>
          <button
            onClick={() => setActiveTab("session")}
            className="bg-gray-300 hover:bg-gray-200 !p-2 cursor-pointer rounded-md text-black"
          >
            Sessions
          </button>
        </div>
        {user && <>{activeTab === "user" ? <User /> : <Session />}</>}
        <button onClick={handleClick} className="cursor-pointer border !p-1">
          {isPending ? "loading..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default UserPage;
