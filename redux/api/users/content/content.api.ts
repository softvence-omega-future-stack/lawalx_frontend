import { baseApi } from "../../baseApi";
import { CreateFolderPayload, FileItemSingle, GetAllDataResponse, GetSingleFilesResponse, GetSingleFolderFilesResponse, MyContentResponse, SuccessResponse, UploadFilePayload } from "./content.type";

const contentAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFolder: build.mutation<any, CreateFolderPayload>({
      query: (data) => ({
        url: "/content/create-folder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
    uploadFile: build.mutation<any, UploadFilePayload>({
      query: (data) => ({
        url: "/content/upload-file",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
    getAllContentData: build.query<GetAllDataResponse, void>({
      query: () => ({
        url: "/content/all",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getSingleContentFolderData: build.query<GetSingleFolderFilesResponse, string>({
      query: (id) => ({
        url: `/content/folder/${id}/files`,
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    getSingleFilesData: build.query<GetSingleFilesResponse, string>({
      query: (id) => ({
        url: `/content/file/${id}`,
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
        url: `/content/delete-file/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const { useCreateFolderMutation, useUploadFileMutation, useGetAllContentDataQuery, useGetSingleContentFolderDataQuery, useGetSingleFilesDataQuery, useGetSingleFileDetailsQuery, useUpdateFileMutation, useAssignProgramMutation, useDeleteFileMutation } = contentAPI;
