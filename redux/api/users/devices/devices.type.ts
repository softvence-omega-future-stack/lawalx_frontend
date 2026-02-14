// create device pin type definition
export type CreateDevicePinPayload = {
  deviceSerial: string;
};



// All success response 
export interface SuccessResponse {
  success: boolean;
  message: string;
}