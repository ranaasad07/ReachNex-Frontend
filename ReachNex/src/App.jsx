import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationProvider } from "./components/Contexts/AuthenticationContext/AuthenticationContext";

import SignUpForm from "./components/Authentication/signUp/signUp";
import SignInForm from "./components/Authentication/signin/signIn";
import Emailverify from "./components/Authentication/verification/Emailverify";
import ForgetPassword from "./components/Authentication/forgetPassword/ForgetPassword";
import VerifyForgetOtp from "./components/Authentication/verifyforgetotp/VerifyForgetOtp";
import ChangePassword from "./components/Authentication/changePassword/ChangePassword";
import Home from "./Pages/Home/Home";
import MyNetwork from "./Pages/MyNetwork/Network";
import Jobs from "./Pages/Jobs/Jobs";
import Feed from "./components/Feed/Feed";
import Messaging from "./Pages/Messaging/Messaging";

import Notification from "./Pages/Notifications/Notification";
import Profile from "./Pages/Profile/Profile";
import Post from "./Pages/Home/Post/Post";
import UserConnections from "./Pages/MyNetwork/networkComponent/UserConnections";
import ProfileVisitor from "./Pages/Profile/ProfileVisitor";
import PostDetail from "./Pages/Notifications/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/verify" element={<Emailverify />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/verifyforgetotp" element={<VerifyForgetOtp />} />
          <Route path="/changepassword" element={<ChangePassword />} />

          {/* Protected Routes */}
          <Route element={<Feed />}>
            <Route path="/feed" element={<Home />} />
            <Route path="/network" element={<MyNetwork />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/notifications" element={<Notification />} />
            {/* Update route paths to be consistent */}
            <Route path="/profile/me" element={<Profile />} />
            <Route path="/profile/user/:id" element={<ProfileVisitor />} />
              <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post" element={<Post />} />
            <Route path="/connections/:userId" element={<UserConnections />} />
          </Route>
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
