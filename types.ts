
export type AspectRatio = "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "9:16" | "16:9" | "21:9";
export type ImageSize = "1K" | "2K" | "4K";
export type QualitySetting = 'Draft' | 'Standard' | 'High';

export interface WallpaperVariation {
  id: string;
  url: string;
  base64: string;
  prompt: string;
  aspectRatio: AspectRatio;
  size: ImageSize;
  quality: QualitySetting;
  timestamp: number;
}

export interface GenerationRequest {
  prompt: string;
  aspectRatio: AspectRatio;
  quality: QualitySetting;
  referenceImageBase64?: string;
}

export enum AppStatus {
  IDLE = 'idle',
  GENERATING = 'generating',
  ERROR = 'error'
}
