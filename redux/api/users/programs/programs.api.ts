import { baseApi } from "../../baseApi";

const programsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFolder: build.mutation<any, any>({
      query: (data) => ({
        url: "/file/create-folder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Programs"],
    }),
  }),
});

export const { useCreateFolderMutation } = programsAPI;
