"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import { useGetUserCourseCompletionQuery } from "../../../redux/features/user/userApi"; // Adjust the import path as needed
import { useGetCourseDetailsQuery } from "../../../redux/features/courses/coursesApi"; // Adjust the import path based on your folder structure
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const [courseCompleted, setCourseCompleted] = useState(false);

  // Fetch user data
  const { data: userData, refetch: refetchUser } = useLoadUserQuery(
    undefined,
    {}
  );
  const user = userData?.user;

  // Fetch user course completion status
  const {
    data: userCourseCompletion,
    error: userError,
    isLoading: userLoading,
    refetch: refetchUserCourseCompletion,
  } = useGetUserCourseCompletionQuery({});

  // Fetch course details
  const {
    data: courseDetails,
    error: courseError,
    isLoading: courseLoading,
    refetch: refetchCourseDetails,
  } = useGetCourseDetailsQuery(item._id);

  useEffect(() => {
    if (userCourseCompletion) {
      const completedCourses = userCourseCompletion.courses
        .filter((course: any) => course.completed)
        .map((course: any) => course.courseId);
      const isCompleted = completedCourses.includes(item._id);
      setCourseCompleted(isCompleted);
    }
  }, [userCourseCompletion, item._id]);

  useEffect(() => {
    refetchUserCourseCompletion();
    refetchCourseDetails();
  }, [item._id, refetchUserCourseCompletion, refetchCourseDetails]);

  // Additional effect to handle refetching when user exits and re-enters the course
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refetchUserCourseCompletion();
        refetchCourseDetails();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetchUserCourseCompletion, refetchCourseDetails]);

  if (userLoading || courseLoading) return <div>Loading...</div>;
  if (userError || courseError) return <div>Error fetching data</div>;

  return (
    <Link
      href={
        !isProfile ? `/client/course/${item._id}` : `course-access/${item._id}`
      }
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner relative">
        <Image
          src={item.thumbnail.url}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded w-full"
          alt={item.name}
        />
        <br />
        <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff]">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {item.price === 0 ? "Free" : `${item.price}$`}
            </h3>
            {item.estimatedPrice && (
              <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
                {item.estimatedPrice}$
              </h5>
            )}
          </div>
          <div className="flex items-center pb-3">
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {item.courseData?.videoLength} Lectures
            </h5>
          </div>
        </div>
        {/* Add the completion status badge */}
        {courseCompleted && user?.role !== "admin" && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
            Completed
          </div>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
