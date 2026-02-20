export enum WorkoutStatus {
  DRAFT = "DRAFT",
  PUBLISH = "PUBLISH",
  ARCHIVE = "ARCHIVE",
}

export interface CreateProgramPayload {
  name: string;
  description: string;
  serene_size?: string;
  status?: WorkoutStatus;
  content_ids: string[];
  device_ids: string[];
}

// get all programs data type 
export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

// Use this type for shared Program structure
export interface Program {
  id: string;
  name: string;
  description: string;
  serene_size: string;
  status: string; // e.g., "DRAFT"
  userId: string;
  created_at: string;
  updated_at: string;
  timeline: Timeline[];
  devices: Device[];
  schedules: Schedule[];
}

export interface Timeline {
  id: string;
  programId: string;
  fileId: string;
  position: number;
  duration: number;
  createdAt: string;
  file: FileData;
}

export interface FileData {
  id: string;
  url: string;
  filePath: string;
  fileType: string; // e.g., "video/mp4"
  originalName: string;
  size: number;
  type: string; // e.g., "VIDEO"
  duration: number;
  userId: string;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Device {
  id: string;
  name: string;
  status: string; // e.g., "ONLINE" | "OFFLINE"
  deviceSerial: string;
  ip: string;
  location: string | null;
  adminBlock: boolean;
  targets: any[];
}

export interface Schedule {
  // empty array in your examples
}

// ✅ Usage examples:

// For GET ALL programs
export type GetAllProgramsResponse = ApiResponse<Program[]>;

// For GET SINGLE program by ID
export type GetProgramByIdResponse = ApiResponse<Program>;