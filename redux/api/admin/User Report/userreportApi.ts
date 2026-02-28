import { baseApi } from "../../baseApi";

export const userreportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserActivityOverview: builder.query({
      query: (params) => ({
        url: `/useractivityreport/overview`,
        method: "GET",
        params,
      }),
      providesTags: ["Activity"],
    }),
    getUserActivityCharts: builder.query({
      query: (params) => ({
        url: `/useractivityreport/charts`,
        method: "GET",
        params,
      }),
    }),
    getAuditOverview: builder.query({
      query: (params) => ({
        url: `/useractivityreport/audit-overview`,
        method: "GET",
        params,
      }),
    }),
    getRecentActivity: builder.query({
      query: (params) => ({
        url: `/useractivityreport/recent-activity`,
        method: "GET",
        params,
      }),
    }),
    getActionDistribution: builder.query({
      query: (params) => ({
        url: `/useractivityreport/action-distribution`,
        method: "GET",
        params,
      }),
    }),
    getSecurityEvents: builder.query({
      query: (params) => ({
        url: `/useractivityreport/security-events`,
        method: "GET",
        params,
      }),
    }),
    getAdoptionTrend: builder.query({
      query: (params) => ({
        url: `/useractivityreport/adoption-trend`,
        method: "GET",
        params,
      }),
    }),
    getAdoptionOverview: builder.query({
      query: (params) => ({
        url: `/useractivityreport/adoption-overview`,
        method: "GET",
        params,
      }),
    }),
    getFeatureUsage: builder.query({
      query: (params) => ({
        url: `/useractivityreport/feature-usage`,
        method: "GET",
        params,
      }),
    }),
    getEngagementLevels: builder.query({
      query: (params) => ({
        url: `/useractivityreport/engagement-levels`,
        method: "GET",
        params,
      }),
    }),
    getSessionDurationTrend: builder.query({
      query: (params) => ({
        url: `/useractivityreport/session-duration-trend`,
        method: "GET",
        params,
      }),
    }),
    getInventoryOverview: builder.query({
      query: (params) => ({
        url: `/useractivityreport/inventory-overview`,
        method: "GET",
        params,
      }),
    }),
    getUserDirectory: builder.query({
      query: (params) => ({
        url: `/useractivityreport/user-directory`,
        method: "GET",
        params,
      }),
    }),
    getUsersByRole: builder.query({
      query: (params) => ({
        url: `/useractivityreport/users-by-role`,
        method: "GET",
        params,
      }),
    }),
    getPermissionOverview: builder.query({
      query: (params) => ({
        url: `/useractivityreport/permission-overview`,
        method: "GET",
        params,
      }),
    }),
    getUserActivityExport: builder.query({
      query: (params) => ({
        url: `/useractivityreport/export`,
        method: "GET",
        params,
      }),
    }),
    getAuthOverview: builder.query({
      query: (params) => ({
        url: `/useractivityreport/auth-overview`,
        method: "GET",
        params,
      }),
    }),
    getAuthEvents: builder.query({
      query: (params) => ({
        url: `/useractivityreport/auth-events`,
        method: "GET",
        params,
      }),
    }),
    getLoginActivityTrend: builder.query({
      query: (params) => ({
        url: `/useractivityreport/login-activity-trend`,
        method: "GET",
        params,
      }),
    }),
    getSecurityAlerts: builder.query({
      query: (params) => ({
        url: `/useractivityreport/security-alerts`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetUserActivityOverviewQuery,
  useGetUserActivityChartsQuery,
  useGetAuditOverviewQuery,
  useGetRecentActivityQuery,
  useGetActionDistributionQuery,
  useGetSecurityEventsQuery,
  useGetAdoptionTrendQuery,
  useGetAdoptionOverviewQuery,
  useGetFeatureUsageQuery,
  useGetEngagementLevelsQuery,
  useGetSessionDurationTrendQuery,
  useGetInventoryOverviewQuery,
  useGetUserDirectoryQuery,
  useGetUsersByRoleQuery,
  useGetPermissionOverviewQuery,
  useLazyGetUserActivityExportQuery,
  useGetAuthOverviewQuery,
  useGetAuthEventsQuery,
  useGetLoginActivityTrendQuery,
  useGetSecurityAlertsQuery,
} = userreportApi;
