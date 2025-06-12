import SignUpForm from "./components/Authentication/signUp/signUp";
import SignInForm from "./components/Authentication/signin/signIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Emailverify from "./components/Authentication/verification/Emailverify";
import AuthenticationContext from "./components/Contexts/AuthenticationContext/AuthenticationContext";
import ForgetPassword from "./components/Authentication/forgetPassword/ForgetPassword";
import VerifyForgetOtp from "./components/Authentication/verifyforgetotp/VerifyForgetOtp";
import ChangePassword from "./components/Authentication/changePassword/ChangePassword";
function App() {
  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{}}>
        <Routes>

          <Route path="/" element={<SignInForm />} />
          <Route path="/SignUp" element={<SignUpForm />} />
          <Route path="/Verify" element={<Emailverify />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/VerifyForgetOtp" element={<VerifyForgetOtp />} />
          <Route path="/changepassword" element={<ChangePassword />} />

        </Routes>
      </AuthenticationContext.Provider>


    </BrowserRouter>
  );
}

export default App;
