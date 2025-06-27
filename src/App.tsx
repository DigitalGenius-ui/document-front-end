import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyPage from "./pages/VerifyEmailPage";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { setNavigate } from "./utils/setNavigate";
import CreateDocument from "./components/Editor/CreateDocument";
import { useUser } from "./hooks/useUser";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

  const { user } = useUser();
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
