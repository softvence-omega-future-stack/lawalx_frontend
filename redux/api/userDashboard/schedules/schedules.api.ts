import { SchedulePayload, ScheduleResponse } from "@/types/schedule";
import { baseApi } from "../../baseApi";


const schedulesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postSchedules: build.mutation<ScheduleResponse, SchedulePayload>({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Schedules"],
    }),

    getCategory: build.query({
      query: () => ({
        url: "/schedule",
        method: "GET",
      }),
      providesTags: ["Schedules"],
    }),

    // updateCategory: build.mutation<
    //   AdminActionResponse,
    //   { id: number; data: FormData }
    // >({
    //   query: ({ data, id }) => ({
    //     url: `/admin-dashboard/categories/${id}/`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Category"],
    // }),
    // deleteCategory: build.mutation<AdminActionResponse, number>({
    //   query: (id) => ({
    //     url: `/admin-dashboard/categories/${id}/delete/`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Category"],
    // }),

    // getUserData: build.query<UsersResponse, ProviderParams>({
    //   query: (params) => ({
    //     url: "/admin-dashboard/users/",
    //     method: "GET",
    //     params,
    //   }),
    //   providesTags: ["userManagement"],
    // }),
  }),
});

export const {
    usePostSchedulesMutation,
} = schedulesApi;
