import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // Get user points
    getUserPoints: builder.query({
      query: () => ({
        url: "get-user-points",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // Redeem points for a course
    redeemPointsForCourse: builder.mutation({
      query: (courseId) => ({
        url: "redeem-points-for-course",
        method: "POST",
        body: { courseId },
        credentials: "include" as const,
      }),
    }),

    // Get available courses for redemption
    getAvailableCoursesForRedemption: builder.query({
      query: () => ({
        url: "get-available-courses-for-redemption",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateCourseCompletion: builder.mutation({
      query: ({ courseId, lastWatchedVideo, completed }) => ({
        url: `update-course-completion`,
        method: "PUT",
        body: { courseId, lastWatchedVideo, completed },
        credentials: "include" as const,
      }),
    }),
    getUserCourseCompletion: builder.query({
      query: () => ({
        url: "user-course-completion",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useUpdateCourseCompletionMutation,
  useGetUserCourseCompletionQuery,
  useGetUserPointsQuery,
  useRedeemPointsForCourseMutation,
  useGetAvailableCoursesForRedemptionQuery,
} = userApi;
