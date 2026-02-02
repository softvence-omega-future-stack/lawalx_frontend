import { baseApi } from "../baseApi";

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery } = userProfileApi;
