/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../baseApi";
import { SuccessResponse } from "../content/content.type";
import { CreateProgramPayload, GetAllProgramsResponse, GetProgramByIdResponse } from "./programs.type";

const programsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProgram: build.mutation<SuccessResponse, CreateProgramPayload>({
      query: (data) => ({
        url: "/program/create-program",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Programs"],
    }),
    getAllProgramsData: build.query<GetAllProgramsResponse, void>({
      query: () => ({
        url: "/program/my-programs",
        method: "GET",
      }),
      providesTags: ["Programs"],
    }),
    getSingleProgramData: build.query<GetProgramByIdResponse, {id: string}>({
      query: ({id}) => ({
        url: `/program/${id}`,
        method: "GET",
      }),
      providesTags: ["Programs"],
    }),
  
  }),
});

export const { useCreateProgramMutation, useGetAllProgramsDataQuery, useGetSingleProgramDataQuery } = programsAPI;
