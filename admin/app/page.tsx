"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Signup from "./components/Auth/SignUp";
import { useSelector } from "react-redux";
import Verification from "./components/Auth/Verification";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";

interface Props {}

const Page: FC<Props> = (props) => {
  const [route, setRoute] = useState("Login");
  const [resetToken, setResetToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // Check for reset token and email in URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const emailParam = urlParams.get('email');

    if (token) {
      setResetToken(token);
      setRoute("ResetPassword");
    }

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  // Debugging
  console.log("User:", user);
  console.log("Route:", route);
  console.log("Reset Token:", resetToken);
  console.log("Email:", email);

  return (
    <div>
      <Heading
        title="EduVoyage"
        description="EduVoyage is a elearning platform for students to do online courses"
        keywords="EduVoyage"
      />
      <div className="w-[90%] md:w-[420px] m-auto h-screen flex items-center justify-center">
        {route === "Login" && <Login setRoute={setRoute} />}
        {route === "Sign-up" && <Signup setRoute={setRoute} />}
        {route === "Verification" && <Verification setRoute={setRoute} />}
        {route === "ForgotPassword" && <ForgotPassword setRoute={setRoute} />}
        {route === "ResetPassword" && email && <ResetPassword token={resetToken} email={email} setRoute={setRoute} />}
      </div>
    </div>
  );
};

export default Page;
