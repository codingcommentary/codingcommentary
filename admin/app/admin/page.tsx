// pages/page.tsx (or .jsx if using JavaScript)
"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";

type Props = {};

const page = (props: Props) => {

  return (
    <div>
      <AdminProtected>
        <Heading
          title="EduVoyage - Admin"
          description="EduVoyage is an e-learning platform for students to do online courses"
          keywords="EduVoyage"
        />
        <div className="flex min-h-screen">
          <div className="w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-4/5 p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome, ADMIN!</h1>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
