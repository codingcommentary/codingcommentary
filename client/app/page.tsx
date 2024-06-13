"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Signup from "./components/Auth/SignUp";
import { redirect } from "next/navigation";

interface Props {}

const Page: FC<Props> = (props) => {
  const [route, setRoute] = useState("SignUp");

  // useEffect(() => {
  //   if (user) {
  //     redirect("/admin");
  //   }
  // }, [user]);
  
  return (
    <div>
      <Heading
        title="LEARNING "
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="w-[90%] md:w-[420px] m-auto h-screen flex items-center justify-center">
        {route === "Sign-up" && <Signup setRoute={setRoute} />}
      </div>
    </div>
  );
};

export default Page;
