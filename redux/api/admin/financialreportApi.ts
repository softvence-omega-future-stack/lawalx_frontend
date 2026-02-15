import { baseApi } from "../baseApi";

export const financialreportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialOverview: builder.query({
      query: (params) => ({
        url: `/financialreport/overview`,
        method: "GET",
        params,
      }),
      providesTags: ["Activity"], // Using Activity as a general tag or add new ones if needed, but for now mostly queries
    }),
    getMrrBreakdown: builder.query({
      query: (params) => ({
        url: `/financialreport/mrr-breakdown`,
        method: "GET",
        params,
      }),
    }),
    getSubscriberOverview: builder.query({
      query: (params) => ({
        url: `/financialreport/subscriber-overview`,
        method: "GET",
        params,
      }),
    }),
    getSubscriberActivity: builder.query({
      query: (params) => ({
        url: `/financialreport/subscriber-activity`,
        method: "GET",
        params,
      }),
    }),
    getChurnByPlan: builder.query({
      query: (params) => ({
        url: `/financialreport/churn-by-plan`,
        method: "GET",
        params,
      }),
    }),
    getPlanPerformance: builder.query({
      query: (params) => ({
        url: `/financialreport/plan-overview`,
        method: "GET",
        params,
      }),
    }),
    getFinancialCharts: builder.query({
      query: (params) => ({
        url: `/financialreport/charts`,
        method: "GET",
        params,
      }),
    }),
    getArpuAnalytics: builder.query({
      query: (params) => ({
        url: `/financialreport/ARPUAnalytics`,
        method: "GET",
        params,
      }),
    }),
    getTrialConversion: builder.query({
      query: (params) => ({
        url: `/financialreport/trial-conversion`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetFinancialOverviewQuery,
  useGetMrrBreakdownQuery,
  useGetSubscriberOverviewQuery,
  useGetSubscriberActivityQuery,
  useGetChurnByPlanQuery,
  useGetPlanPerformanceQuery,
  useGetFinancialChartsQuery,
  useGetArpuAnalyticsQuery,
  useGetTrialConversionQuery,
} = financialreportApi;
