import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import VerifyPage from "./pages/VerifyEmailPage";
// import ResetPassword from "./pages/ResetPassword";
// import ForgotPassword from "./pages/ForgotPassword";
// import User from "./pages/UserPage";
import { setNavigate } from "./utils/setNavigate";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/user" element={<User />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/email/verify/:code" element={<VerifyPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} /> */}
    </Routes>
  );
}

export default App;
