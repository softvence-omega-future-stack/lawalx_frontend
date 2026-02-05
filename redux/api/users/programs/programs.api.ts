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
    getAllPrograms: build.query<any, void>({
      query: () => ({
        url: "/program",
        method: "GET",
      }),
      providesTags: ["Programs"],
    }),
    getProgramsFilterByUser: build.query<any, void>({
      query: () => ({
        url: "/program/program-filter-by-user",
        method: "GET",
      }),
      providesTags: ["Programs"],
    }),
    getProgramById: build.query<any, any>({
      query: (id) => ({
        url: `/program/${id}`,
        method: "GET",
      }),
      providesTags: ["Programs"],
    }),
    getProgramSingleProject: build.query<any, any>({
      query: (id) => ({
        url: `/program/${id}/projects`,
        method: "GET",
      }),
      providesTags: ["Programs"],
    }),
    updateSingleProgram: build.mutation<any, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/program/${id}/name`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Programs"],
    }),
    updateSingleProgramTags: build.mutation<any, { id: string; tags: string[] }>({
      query: ({ id, tags }) => ({
        url: `/program/${id}/tags`,
        method: "PUT",
        body: { tags },
      }),
      invalidatesTags: ["Programs"],
    }),
  }),
});

export const { useCreateFolderMutation, useUpdateSingleProgramMutation, useUpdateSingleProgramTagsMutation } = programsAPI;
