import useUser from "../hooks/useUser";
import { timeChange } from "../utils/date";

const User = () => {
  const { user, isPending, isError } = useUser();

  const { email, createdAt, verified } = user || {};
  return (
    <div className="flex items-center justify-center">
      <div className="border !p-4">
        <p>
          {isPending
            ? "Loading..."
            : isError
            ? "Session has been expired"
            : null}
        </p>
        {user && (
          <div>
            <h1>Email : {email}</h1>
            <p>
              {verified
                ? "You are already verified"
                : "Your account is not verified yet!"}
            </p>
            <p>Created on : {timeChange(createdAt)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
