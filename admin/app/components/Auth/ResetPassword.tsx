"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../styles/style";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  token: string; // The reset token passed in the URL
  setRoute: (route: string) => void;
  email: string; // The email to be pre-filled
};

const schema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your new password!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], "Passwords must match")
    .required("Please confirm your new password!"),
});

const ResetPassword: FC<Props> = ({ token, setRoute, email }) => {
  const [show, setShow] = useState(false);
  const [resetPassword, { isSuccess, error }] = useResetPasswordMutation();

  const formik = useFormik({
    enableReinitialize: true, // Add this prop
    initialValues: { email, newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ email, newPassword }) => {
      await resetPassword({ email, newPassword, resetToken: token });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully!");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, setRoute]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}  // Use formik.values.email
            readOnly
            id="email"
            placeholder="Enter your email"
            className={`${styles.input}`}
          />
        </div>

        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="newPassword">
            New Password
          </label>
          <div className="relative mb-1">
            <input
              type={!show ? "password" : "text"}
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              id="newPassword"
              placeholder="New password"
              className={`${errors.newPassword && touched.newPassword && "border-red-500"} ${styles.input}`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            {errors.newPassword && touched.newPassword && (
              <span className="text-red-500 pt-2 block">{errors.newPassword}</span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative mb-1">
            <input
              type={!show ? "password" : "text"}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              placeholder="Confirm password"
              className={`${errors.confirmPassword && touched.confirmPassword && "border-red-500"} ${styles.input}`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="text-red-500 pt-2 block">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className="w-full mt-5">
          <input type="submit" value="Reset Password" className={`${styles.button}`} />
        </div>
      </form>

      <br />
      <h5>
        Remembered your password?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Login Here
        </span>
      </h5>
    </div>
  );
};

export default ResetPassword;
