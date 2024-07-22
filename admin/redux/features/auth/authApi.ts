import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";
import Cookies from "js-cookie";
import { toast } from 'react-hot-toast';

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  email: string;
  password: string;
  name: string;
};

type ResetPasswordRequestData = {
  email: string;
};

type ResetPasswordData = {
  email: string;
  newPassword: string;
  resetToken: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          Cookies.set("accessToken", result.data.accessToken);
          Cookies.set("refreshToken", result.data.refreshToken);
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          Cookies.set("accessToken", result.data.accessToken);
          Cookies.set("refreshToken", result.data.refreshToken);

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
              refreshToken: result.data.refreshToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    requestPasswordReset: builder.mutation<{ message: string }, ResetPasswordRequestData>({
      query: ({ email }) => ({
        url: "request-password-reset",
        method: "POST",
        body: { email },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message || "Reset password email sent successfully.");
        } catch (error: any) {
          toast.error(error.data?.message || "Failed to send reset password email.");
        }
      },
    }),

    resetPassword: builder.mutation<{ message: string }, ResetPasswordData>({
      query: ({ email, newPassword, resetToken }) => ({
        url: "reset-password",
        method: "POST",
        body: {
          email,
          newPassword,
          resetToken,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message || "Password reset successfully.");
        } catch (error: any) {
          toast.error(error.data?.message || "Failed to reset password.");
        }
      },
    }),

    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useLogOutQuery,
} = authApi;