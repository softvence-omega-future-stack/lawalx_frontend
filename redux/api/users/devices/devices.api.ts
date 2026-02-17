/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../baseApi";
import { SuccessResponse } from "../content/content.type";
import { AddDevicePin } from "./devices.type";

const devicesAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDevice: build.mutation<SuccessResponse, AddDevicePin>({
      query: (data) => ({
        url: "/device/pair-check",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Devices"],
    }),
  }),
});

export const { useAddDeviceMutation } = devicesAPI;
