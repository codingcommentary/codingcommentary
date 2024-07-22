import { useGetUsersAllCoursesQuery } from "../../../redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../../components/Course/CourseCard";

type Props = {};

const Courses: React.FC<Props> = (props: Props) => {
  const { data, isLoading, refetch } = useGetUsersAllCoursesQuery({});

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    console.log("Data:", data);
    setCourses(data?.courses || []);
  }, [data]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refetch(); // Refetch data when the user returns to the page
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto">
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
        View
        <span className="text-gradient"> The Available Course</span> <br />
      </h1>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
        {courses &&
          courses.map((item: any) => <CourseCard item={item} key={item._id} />)}
      </div>
    </div>
  );
};

export default Courses;
