/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../baseApi";

const programsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProgram: build.mutation<any, any>({
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
