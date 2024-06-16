"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Signup from "./components/Auth/SignUp";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Verification from "./components/Auth/Verification";
import Login from "./components/Auth/Login";

interface Props {}

const Page: FC<Props> = (props) => {
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //   if (user) {
  //     redirect("/admin");
  //   }
  // }, [user]);

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
      </div>
    </div>
  );
};

export default Page;
