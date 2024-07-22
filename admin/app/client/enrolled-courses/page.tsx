// client/app/client/enrolled-courses/page.tsx
"use client";
import React from "react";
import ClientSidebar from "../../components/Client/sidebar/ClientSidebar";
import EnrolledCourses from "../../components/Client/course/EnrolledCourses";

type Props = {};

const EnrolledCoursesPage: React.FC<Props> = () => {
  return (
    <div>
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <ClientSidebar />
        </div>
        <div className="w-[85%]">
          <EnrolledCourses />
        </div>
      </div>
    </div>
  );
};

export default EnrolledCoursesPage;
