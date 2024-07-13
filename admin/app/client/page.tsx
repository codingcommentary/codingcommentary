"use client";
import React from "react";
import Heading from "../utils/Heading";
import UserSideBar from "../components/Client/sidebar/ClientSidebar";
import UserProtected from "../hooks/useProtected";
import Courses from "../components/Route/Courses"

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <UserProtected>
        <Heading
          title="EduVoyage - User"
          description="EduVoyage is a elearning platform for students to do online courses"
          keywords="EduVoyage"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <UserSideBar />
          </div>
          <div className="w-4/5 p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome, uSER!</h1>
            <Courses/>
          </div>
        </div>
        
      </UserProtected>
    </div>
  );
};

export default page;
