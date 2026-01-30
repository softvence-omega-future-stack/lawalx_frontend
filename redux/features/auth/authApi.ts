import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerInitiate: builder.mutation({
      query: (data: { fullName: string; email: string }) => ({
        url: "/auth/register/initiate",
        method: "POST",
        body: data,
      }),
    }),
    registerVerify: builder.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: "/auth/register/verify",
        method: "POST",
        body: data,
      }),
    }),
    registerComplete: builder.mutation({
      query: (data: { email: string; password: string; fullName: string }) => ({
        url: "/auth/register/complete",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterInitiateMutation,
  useRegisterVerifyMutation,
  useRegisterCompleteMutation,
} = authApi;
