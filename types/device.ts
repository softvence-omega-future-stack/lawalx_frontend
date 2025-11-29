// types/device.ts
export type DeviceStatus = "Online" | "Offline" | "In Disconnect";

export interface Device {
  id: number;
  name: string;
  mac: string;
  location: string;
  screen: string;
  status: DeviceStatus;
  lastSynced: string;
  storage: string;
}