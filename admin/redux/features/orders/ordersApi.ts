import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    enrollInFreeCourse: builder.mutation({
        query: (courseId) => ({
          url: "enroll-course",
          method: "POST",
          body: {
            courseId,
          },
          credentials: "include" as const,
        }),
      }),
    }),
  });

export const {useEnrollInFreeCourseMutation} =
  ordersApi;
