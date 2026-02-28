import { baseApi } from "../../baseApi";

export const billingPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBillingOverview: builder.query({
      query: (params) => ({
        url: `/billingandpayment/overview`,
        method: "GET",
        params,
      }),
      providesTags: ["Activity"],
    }),
    getTransactionReport: builder.query({
      query: (params) => ({
        url: `/billingandpayment/transaction-report`,
        method: "GET",
        params,
      }),
    }),
    getRecentTransactions: builder.query({
      query: (params) => ({
        url: `/billingandpayment/recent-transactions`,
        method: "GET",
        params,
      }),
    }),
    getPaymentMethods: builder.query({
      query: (params) => ({
        url: `/billingandpayment/payment-methods`,
        method: "GET",
        params,
      }),
    }),
    getTransactionVolume: builder.query({
      query: (params) => ({
        url: `/billingandpayment/transaction-volume`,
        method: "GET",
        params,
      }),
    }),
    getAgingReport: builder.query({
      query: (params) => ({
        url: `/billingandpayment/aging-report`,
        method: "GET",
        params,
      }),
    }),
    getFailedPaymentsAnalysis: builder.query({
      query: (params) => ({
        url: `/billingandpayment/failed-payments-analysis`,
        method: "GET",
        params,
      }),
    }),
    getDelinquencyReport: builder.query({
      query: (params) => ({
        url: `/billingandpayment/delinquency-report`,
        method: "GET",
        params,
      }),
    }),
    getRefundReport: builder.query({
      query: (params) => ({
        url: `/billingandpayment/refund-report`,
        method: "GET",
        params,
      }),
    }),
    getTaxReport: builder.query({
      query: (params) => ({
        url: `/billingandpayment/tax-report`,
        method: "GET",
        params,
      }),
    }),
    getDsoAnalysis: builder.query({
      query: (params) => ({
        url: `/billingandpayment/dso-analysis`,
        method: "GET",
        params,
      }),
    }),
    getBillingExportAll: builder.query({
      query: (params) => ({
        url: `/billingandpayment/export-all`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetBillingOverviewQuery,
  useGetTransactionReportQuery,
  useGetRecentTransactionsQuery,
  useGetPaymentMethodsQuery,
  useGetTransactionVolumeQuery,
  useGetAgingReportQuery,
  useGetFailedPaymentsAnalysisQuery,
  useGetDelinquencyReportQuery,
  useGetRefundReportQuery,
  useGetTaxReportQuery,
  useGetDsoAnalysisQuery,
  useLazyGetBillingExportAllQuery,
} = billingPaymentApi;
