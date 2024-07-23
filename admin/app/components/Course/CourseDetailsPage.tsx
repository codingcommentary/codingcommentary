import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useGetCourseDetailsQuery } from "../../../redux/features/courses/coursesApi";
import Heading from "../../utils/Heading";
import CourseDetails from "../../components/Course/CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "../../../redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useRedeemPointsForCourseMutation } from "../../../redux/features/user/userApi";
import { toast } from "react-hot-toast";

type CourseDetailsPageProps = {
  id: string;
};

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetCourseDetailsQuery(id);
  const { user } = useSelector((state: any) => state.auth);

  // Stripe related states and queries
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  // Points redemption
  const [redeemPointsForCourse] = useRedeemPointsForCourseMutation();

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
  }, [config]);

  useEffect(() => {
    if (data && data.course.price > 0) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/me", {
      method: "GET",
      credentials: "include", // Include credentials (cookies, headers)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle user data
        console.log("User data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleRedeemPoints = async () => {
    try {
      await redeemPointsForCourse(id).unwrap();
      toast.success("Course redeemed successfully!");
      refetch(); // Refetch course details to update the UI
    } catch (error) {
      toast.error("Failed to redeem course. Please try again.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + " - Eduvoyage"}
            description={"Eduvoyage is an elearning platform"}
            keywords={data?.course?.tags}
          />
          <CourseDetails
            data={data.course}
            setRoute={setRoute}
            stripePromise={stripePromise}
            clientSecret={clientSecret}
            userPoints={user?.points || 0}
            handleRedeemPoints={handleRedeemPoints}
          />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
