export type FontSize = "Small" | "Medium" | "Large";

export type Position = "Top" | "Middle" | "Bottom";

export type ContentType = "IMAGE_TEXT" | "IMAGE" | "VIDEO" | "TEXT";

export type RecurrenceType = "daily" | "weekly" | "monthly";

export type DayOfWeek =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun";

export type SchedulePayload = {
  // Basic info
  name: string;
  description: string;

  // Text / Lower third
  text: string;
  textColor: string; // hex color (#FFFFFF)
  fontSize: FontSize;
  font: string;

  // Background
  backgroundColor: string; // hex color (#000000)
  backgroundOpacity?: number; // 0 - 100 (number is better than string)
  

  // Animation
  animation?: string;
  loop?: boolean;
  position?: Position;

  // Content & scheduling
  contentType?: ContentType;
  recurrenceType?: RecurrenceType;

  // Date & time
  startDate?: string; // ISO string
  endDate?: string;   // ISO string
  startTime?: string; // ISO string or HH:mm
  endTime?: string;   // ISO string or HH:mm
  timezone?: string;  // e.g. "Asia/Dhaka"

  // Recurrence rules
  daysOfWeek?: DayOfWeek[];
  dayOfMonth?: number[]; // 1 - 31

  // Targeting
  programId?: string;
  deviceId?: string;
  contentId?: string;
};


export type ScheduleResponse = {
    success: boolean;
    message: string;
};
