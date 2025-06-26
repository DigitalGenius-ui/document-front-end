import useSession from "../hooks/useSession";

import SingleSession from "./SingleSession";

const Session = () => {
  const {
    session,
    isPending: sessionPending,
    isError: sessionError,
  } = useSession();

  return (
    <div>
      {session && (
        <div className="">
          <div>
            <p>
              {sessionPending
                ? "Loading..."
                : sessionError
                ? "Session has been expired"
                : null}
            </p>
            {session && (
              <div className="w-[30rem] h-[20rem] overflow-y-scroll scroll-m-1">
                {session?.map((s) => (
                  <SingleSession key={s.id} s={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Session;
