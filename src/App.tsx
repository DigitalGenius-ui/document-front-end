import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyPage from "./pages/VerifyEmailPage";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CreateDocument from "./components/Editor/CreateDocument";
import { useUser } from "./hooks/useUser";

function App() {
  const { user, isPending } = useUser();
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/singleDocument/:id" element={<CreateDocument />} />
      {!user && (
        <>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/email/verify/:code" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
        </>
      )}
      <Route path="*" element={<Navigate to={user ? "/" : "/sign-in"} />} />
    </Routes>
  );
}

export default App;
