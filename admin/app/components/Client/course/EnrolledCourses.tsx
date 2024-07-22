import React, { useEffect, useState } from "react";
import { useGetUserEnrolledCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import Image from "next/image";

interface EnrolledCourse {
  _id: string;
  name: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  completed: boolean;
}

const EnrolledCourses: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetUserEnrolledCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [courses, setCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    setCourses(data?.enrolledCourses || []);
  }, [data]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refetch();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses. Please try again later.</div>;

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto">
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight mb-8">
        Your Enrolled Courses
      </h1>
      {courses.length === 0 ? (
        <p className="text-center">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course: EnrolledCourse) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                {" "}
                {/* 16:9 aspect ratio */}
                <Image
                  src={course.thumbnail.url}
                  alt={course.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 truncate">
                  {course.name}
                </h3>
                <p
                  className={`text-sm ${
                    course.completed ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  {course.completed ? "Completed" : "In Progress"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
