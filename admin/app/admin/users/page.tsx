"use client";
import Heading from "../../utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="EduVoyage"
        description="EduVoyage is a elearning platform for students to do online courses"
        keywords="EduVoyage"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5"></div>
      </div>
    </div>
  );
};

export default page;
