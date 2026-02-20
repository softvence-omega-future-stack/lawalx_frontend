export enum WorkoutStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ACTIVE = "ACTIVE",
}

export interface CreateProgramPayload {
  name: string;
  description: string;
  serene_size: string;
  status: WorkoutStatus;
  content_ids: string[];
  device_ids: string[];
}