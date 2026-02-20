/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../baseApi";
import { SuccessResponse } from "../content/content.type";
import { CreateProgramPayload } from "./programs.type";

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
  }),
});

export const { useCreateProgramMutation } = programsAPI;
