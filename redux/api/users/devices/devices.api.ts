/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../baseApi";
import { CreateDevicePinPayload, SuccessResponse } from "./devices.type";

const devicesAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDevicePin: build.mutation<SuccessResponse, CreateDevicePinPayload>({
      query: (data) => ({
        url: "/device/pin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Devices"],
    }),
  }),
});

export const { useCreateDevicePinMutation } = devicesAPI;
