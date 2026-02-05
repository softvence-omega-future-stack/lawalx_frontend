import { baseApi } from "../../baseApi";

const programsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFolder: build.mutation<any, any>({
      query: (data) => ({
        url: "/file/create-folder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const { useCreateFolderMutation } = programsAPI;
