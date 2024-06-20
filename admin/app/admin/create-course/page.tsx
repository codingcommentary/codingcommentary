'use client'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../app/utils/Heading';
import CreateCourse from "../../components/Admin/Course/CreateCourse";

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
         title="EduVoyage - Admin"
         description="EduVoyage is a elearning platform for students to do online courses"
         keywords="EduVoyage"
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
              
               <CreateCourse /> 
            </div>
        </div>
    </div>
  )
}

export default page