import { baseApi } from "../../baseApi";
import { CreateFolderPayload, MyContentResponse, UploadFilePayload } from "./content.type";

const contentAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFolder: build.mutation<any, CreateFolderPayload>({
      query: (data) => ({
        url: "/file/create-folder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
    uploadFile: build.mutation<any, UploadFilePayload>({
      query: (data) => ({
        url: "/file/upload-file",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
    getAllContent: build.query<MyContentResponse, void>({
      query: () => ({
        url: "/file/my-content",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
  }),
});

export const { useCreateFolderMutation, useUploadFileMutation, useGetAllContentQuery } = contentAPI;
