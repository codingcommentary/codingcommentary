import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import CoursePlayer from "../../utils/CoursePlayer";
import Link from "next/link";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { useEnrollInFreeCourseMutation } from "../../../redux/features/orders/ordersApi";
import CheckOutForm from "../Payment/CheckOutForm";

type Props = {
  data: any;
  setRoute: (route: string) => void;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails = ({
  data,
  setRoute,
  stripePromise,
  clientSecret,
}: Props) => {
  const { data: userData, refetch: refetchUser } = useLoadUserQuery(
    undefined,
    {}
  );
  console.log("userData", userData);
  const user = userData?.user;
  console.log(user?.role);
  const [open, setOpen] = useState(false);
  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const isPurchased = user && user?.courses?.find((course) => course._id === data._id || course.courseId === data._id);


  const [hasPurchased, setHasPurchased] = useState(isPurchased);

  const [enrollInFreeCourse] = useEnrollInFreeCourseMutation();

  const handleEnroll = async () => {
    try {
      const response = await enrollInFreeCourse(data._id).unwrap();
      console.log("Enrolled in course:", response);
      setHasPurchased(true);
      await refetchUser();
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handlePurchase = () => {
    setOpen(true);
  };

  const onSuccessfulPayment = async () => {
    setHasPurchased(true);
    setOpen(false);
    await refetchUser();
  };

  useEffect(() => {
    if (!user?.Courses) return;

    const purchasedCourse = user?.Courses.find(
      (course) => course._id === data._id
    );
    if (purchasedCourse) {
      setHasPurchased(true);
    }
  }, [user?.Courses, data._id]);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800">
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                What are the prerequisites of this course?
              </h1>
              <div>
                {data.prerequisites?.map((item: any, index: number) => (
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15px] mr-1">
                      <IoCheckmarkDoneOutline
                        size={20}
                        className="text-black dark:text-white"
                      />
                    </div>
                    <p className="pl-2 text-black dark:text-white">
                      {item.title}
                    </p>
                  </div>
                ))}
                <br />
                <br />
                <div>
                  <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                    Course Overview
                  </h1>
                  <CourseContentList data={data?.courseData} />
                  <br />
                  <br />
                  <div className="w-full">
                    <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                      Course Details
                    </h1>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                      {data.description}
                    </p>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="sticky top-[100px] left-0 z-50 w-full">
            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
            <div className="flex items-center">
              <h1 className="pt-5 text-[25%] text-black dark:text-white">
                {data.price === 0 ? "Free" : data.price + "$"}
              </h1>
              <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                {data.estimatedPrice}$
              </h5>
              <h4 className="pl-3 text-[22px] text-black dark:text-white">
                {discountPercentagePrice}% Off
              </h4>
            </div>
            <div className="flex items-center">
              {isPurchased || hasPurchased || user?.role === "admin" ? (
                <Link
                  className={
                    "styles.button !w-[180px] my-3 font-Poppins cursor pointer !bg-[crimson]"
                  }
                  href={`/client/course-access/${data._id}`}
                >
                  Enter to course
                </Link>
              ) : (
                <div
                  className={
                    "styles.button w-[180px] my-3 font-Poppins cursor-pointer bg-[crimson]"
                  }
                  onClick={data.price === 0 ? handleEnroll : handlePurchase}
                >
                  {data.price === 0 ? "Enroll Now" : `Buy Now ${data.price}$`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm
                    setOpen={setOpen}
                    data={data}
                    onSuccess={onSuccessfulPayment}
                  />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
