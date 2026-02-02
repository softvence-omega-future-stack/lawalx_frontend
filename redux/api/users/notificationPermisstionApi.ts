import { baseApi } from "../baseApi";

export const notificationPermissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationPermission: builder.query<any, void>({
      query: () => "/notification-permission",
      providesTags: ["NotificationPermission"],
    }),
    updateNotificationPermission: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "/notification-permission",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["NotificationPermission"],
    }),
  }),
});

export const { 
  useGetNotificationPermissionQuery, 
  useUpdateNotificationPermissionMutation 
} = notificationPermissionApi;
