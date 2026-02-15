import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query({
      query: (filter: string) => ({
        url: `/dashboard/overview/filter?filter=${filter}`,
        method: "GET",
      }),
    }),
    getSubscriptionDistribution: builder.query({
      query: (filter: string) => ({
        url: `/dashboard/subscription-distribution?filter=${filter}`,
        method: "GET",
      }),
    }),
    getActivityTrend: builder.query({
      query: (filter: string) => ({
        url: `/dashboard/activity-trend?filter=${filter}`,
        method: "GET",
      }),
    }),
    getRealTimeMetrics: builder.query({
      query: () => ({
        url: "/dashboard/real-time-metrics",
        method: "GET",
      }),
    }),
    getRecentSupportTickets: builder.query({
      query: ({ limit, filter }: { limit: number; filter: string }) => ({
        url: `/dashboard/recent-support-tickets?limit=${limit}&filter=${filter}`,
        method: "GET",
      }),
    }),
    getContentUsageBreakdown: builder.query({
      query: (filter: string) => ({
        url: `/dashboard/content-usage-breakdown?filter=${filter}`,
        method: "GET",
      }),
    }),
    getPaymentBreakdown: builder.query({
      query: (filter: string) => ({
        url: `/dashboard/payment-breakdown?filter=${filter}`,
        method: "GET",
      }),
    }),
    getDashboardExport: builder.query({
      query: (filter: string) => ({
        url: `/dashboard/export?filter=${filter}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDashboardOverviewQuery,
  useGetSubscriptionDistributionQuery,
  useGetActivityTrendQuery,
  useGetRealTimeMetricsQuery,
  useGetRecentSupportTicketsQuery,
  useGetContentUsageBreakdownQuery,
  useGetPaymentBreakdownQuery,
  useGetDashboardExportQuery,
  useLazyGetDashboardExportQuery,
} = dashboardApi;
