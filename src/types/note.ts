export interface Note {
  id: string;
  title: string;
  subject: string;
  description: string;
  fileUrl: string;
  fileName: string;
  uploadedBy: string;
  uploadedAt: Date;
  downloads: number;
  rating: number;
}