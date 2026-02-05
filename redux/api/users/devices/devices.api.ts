import { baseApi } from "../../baseApi";

const devicesAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFolder: build.mutation<any, any>({
      query: (data) => ({
        url: "/file/create-folder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Devices"],
    }),
  }),
});

export const { useCreateFolderMutation } = devicesAPI;
