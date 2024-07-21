// src/app/page.tsx
"use client";
import React from "react";
import CourseDetailsPage from "../../../components/Course/CourseDetailsPage";
import { UserProvider } from "../../../hooks/userContext";

const Page = ({ params }: any) => {
  return (
    <UserProvider>
      <div>
        <CourseDetailsPage id={params.id} />
      </div>
    </UserProvider>
  );
};

export default Page;
