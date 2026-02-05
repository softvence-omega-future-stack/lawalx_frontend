import { baseApi } from "../../baseApi";
import { CreateFolderPayload, MyContentResponse, SuccessResponse, UploadFilePayload } from "./content.type";

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
    getSingleFileDetails: build.query<MyContentResponse, string>({
      query: (id) => ({
        url: `/file/detail/${id}`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    updateFile: build.mutation<any, SuccessResponse>({
      query: (id) => ({
        url: `/file/update/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Content"],
    }),
    assignProgram: build.mutation<any, SuccessResponse>({
      query: (id) => ({
        url: `/file/${id}/assign-program`,
        method: "PATCH",
      }),
      invalidatesTags: ["Content"],
    }),
    deleteFile: build.mutation<any, SuccessResponse>({
      query: (id) => ({
        url: `/file/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const { useCreateFolderMutation, useUploadFileMutation, useGetAllContentQuery, useGetSingleFileDetailsQuery, useUpdateFileMutation, useAssignProgramMutation, useDeleteFileMutation } = contentAPI;
