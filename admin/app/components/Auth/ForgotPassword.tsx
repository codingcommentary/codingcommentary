"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "../../../app/styles/style";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
});

const ForgotPassword: FC<Props> = ({ setRoute }) => {
//   const [show, setShow] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
  const [resetPassword, { data, error, isSuccess }] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Email sent";
      toast.success(message);
      setRoute('ForgotPassword');
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {email: ""},
    validationSchema: schema,
    onSubmit: async ({email}) => {
      const data = {
        email
      };
      await resetPassword(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Reset your password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="yourmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>


        <div className="w-full mt-5">
          <input type="submit" value="Reset Password" className={`${styles.button}`} />
        </div>
        <br />
      </form>
      <br />
      <h5>
        Go back to{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          login!
        </span>
      </h5>
    </div>
  );
};

export default ForgotPassword;