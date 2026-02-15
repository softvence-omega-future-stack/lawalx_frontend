import { baseApi } from "../baseApi";

export const contentreportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContentDashboard: builder.query({
      query: (params) => ({
        url: `/contentreport/dashboard`,
        method: "GET",
        params,
      }),
      providesTags: ["Content"],
    }),
    getContentExport: builder.query({
      query: () => ({
        url: `/contentreport/export`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetContentDashboardQuery,
  useGetContentExportQuery,
  useLazyGetContentExportQuery,
} = contentreportApi;
