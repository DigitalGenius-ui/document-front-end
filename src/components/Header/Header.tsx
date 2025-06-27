import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useUser } from "../../hooks/useUser";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../api-calls/auth-api";
import queryClient from "../../config/react-query";
import queryKeys from "../../constant/query-keys";
import Notification from "./Notification";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.setQueryData([queryKeys.USER], null);
    },
  });

  return (
    <header className="h-[70px] shadow-sm bg-white">
      <div className="h-full container flex items-center justify-between">
        <h1 className="uppercase text-gray-500">Document</h1>
        <div className="!space-x-4">
          {!user ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
          ) : (
            <>
              <Notification />
              <Button
                onClick={() => mutate()}
                size="small"
                variant="contained"
                color="primary"
              >
                Sign Out
              </Button>
              <Button
                onClick={() => navigate(`/singleDocument/${uuidv4()}`)}
                size="small"
                variant="contained"
                color="primary"
              >
                Create Document
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
