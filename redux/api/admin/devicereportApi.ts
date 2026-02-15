import { baseApi } from "../baseApi";

export const devicereportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeviceDashboard: builder.query({
      query: (params) => ({
        url: `/devicereport/dashboard`,
        method: "GET",
        params,
      }),
      providesTags: ["Devices"],
    }),
    getDeviceExport: builder.query({
      query: () => ({
        url: `/devicereport/export`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDeviceDashboardQuery,
  useGetDeviceExportQuery,
  useLazyGetDeviceExportQuery,
} = devicereportApi;
