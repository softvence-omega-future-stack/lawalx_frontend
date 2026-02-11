import { baseApi } from "../../baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: "/settings/password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = settingsApi;
