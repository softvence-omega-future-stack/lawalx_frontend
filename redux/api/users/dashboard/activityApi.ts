import { baseApi } from "../../baseApi";

export const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivities: builder.query<any, void>({
      query: () => ({
        url: "/activity/all",
        method: "GET",
      }),
      providesTags: ["Activity"],
    }),
    deleteActivity: builder.mutation<any, string>({
      query: (id) => ({
        url: `/activity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Activity"],
    }),
  }),
});

export const { useGetAllActivitiesQuery, useDeleteActivityMutation } = activityApi;
