import React, { useState } from "react"; // ✅ Add this
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticationContext from "./components/Contexts/AuthenticationContext/AuthenticationContext";

import SignUpForm from "./components/Authentication/signUp/signUp";
import SignInForm from "./components/Authentication/signin/signIn";
import Emailverify from "./components/Authentication/verification/Emailverify";
import ForgetPassword from "./components/Authentication/forgetPassword/ForgetPassword";
import VerifyForgetOtp from "./components/Authentication/verifyforgetotp/VerifyForgetOtp";
import ChangePassword from "./components/Authentication/changePassword/ChangePassword";
import Home from "./Pages/Home/Home";
import MyNetwork from "./Pages/MyNetwork/Network";
import Jobs from "./Pages/Jobs/Jobs";
import Feed from "./components/Feed/Feed"; // 🧠 Import the layout component
import Messaging from "./Pages/Messaging/Messaging"
import Notification from "./Pages/Notifications/Notification"
import Profile from "./Pages/Profile/Profile"
function App() {
  const [user, setUser] = useState('')
  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ user, setUser }}>
        {" "}
        {/* ✅ Fix applied */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/verify" element={<Emailverify />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/verifyforgetotp" element={<VerifyForgetOtp />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          {/* Protected Routes inside Layout */}
          <Route element={<Feed />}>
            <Route path="/feed" element={<Home />} />
            <Route path="/network" element={<MyNetwork />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/Post" element={<Post />} />
            {/* Add more protected routes here */}
          </Route>
        </Routes>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;