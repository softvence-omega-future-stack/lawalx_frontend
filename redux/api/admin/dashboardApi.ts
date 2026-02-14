import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboardOverview: build.query({
            query: () => ({
                url: "/dashboard/overview",
                method: "GET",
            }),
            providesTags: ["Overview"],
        }),
        getFilteredOverview: build.query({
            query: (filter: string) => ({
                url: `/dashboard/overview/filter?filter=${filter}`,
                method: "GET",
            }),
            providesTags: ["Overview"],
        }),
        getActivityTrend: build.query({
            query: ({ days, filter }: { days: number; filter: string }) => ({
                url: `/dashboard/activity-trend?days=${days}&filter=${filter}`,
                method: "GET",
            }),
            providesTags: ["Activity"],
        }),
    }),
});

export const {
    useGetDashboardOverviewQuery,
    useGetFilteredOverviewQuery,
    useGetActivityTrendQuery,
} = dashboardApi;
