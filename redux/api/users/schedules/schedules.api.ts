import { baseApi } from "../../baseApi";
import { SuccessResponse } from "../content/content.type";
import { GetSchedulesResponse } from "./schedules.type";

const schedulesAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation<SuccessResponse, any>({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Schedules"],
    }),
    getAllSchedulesData: build.query<GetSchedulesResponse, void>({
          query: () => ({
            url: "/schedule",
            method: "GET",
          }),
          providesTags: ["Schedules"],
        }),
  }),
});

export const { useCreateScheduleMutation, useGetAllSchedulesDataQuery } = schedulesAPI;
