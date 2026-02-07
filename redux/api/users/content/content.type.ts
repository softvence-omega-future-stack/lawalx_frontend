// create folder type definition
export type CreateFolderPayload = {
  name: string;
  parentId?: string;
};
// Upload payload will be sent as FormData (files + optional parentId)
export type UploadFilePayload = FormData;

// all content get route type definition
export type ContentType = "FOLDER" | "IMAGE" | "VIDEO" | "AUDIO" | "FILE";

export interface ContentItem {
  id: string;
  name: string;
  isFolder: boolean;

  filename: string | null;
  url: string | null;
  filePath: string | null;
  fileType: string | null;
  size: number | null;

  type: ContentType;
  duration: number | null;

  parentId: string | null;
  userId: string;

  uploadedAt: string; // ISO date
  createdAt: string;  // ISO date
  updatedAt: string;  // ISO date
}

export interface MyContentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ContentItem[];
}

// All success response 
export interface SuccessResponse {
  success: boolean;
  message: string;
}