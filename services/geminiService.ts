
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GenerationRequest, WallpaperVariation } from "../types";

export const generateSingleImage = async (
  request: GenerationRequest
): Promise<WallpaperVariation> => {
  // Always create a new instance to ensure latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = {
    parts: [] as any[]
  };

  if (request.referenceImageBase64) {
    contents.parts.push({
      inlineData: {
        data: request.referenceImageBase64,
        mimeType: 'image/png'
      }
    });
    contents.parts.push({
      text: `Using the provided image as a strong visual reference for style, composition, and mood, generate a new variation that matches this vibe: ${request.prompt}`
    });
  } else {
    contents.parts.push({
      text: request.prompt
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: contents,
    config: {
      imageConfig: {
        aspectRatio: request.aspectRatio,
        imageSize: request.size
      }
    }
  });

  let base64Data = '';
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      base64Data = part.inlineData.data;
      break;
    }
  }

  if (!base64Data) {
    throw new Error("No image data returned from model");
  }

  return {
    id: Math.random().toString(36).substring(7),
    url: `data:image/png;base64,${base64Data}`,
    base64: base64Data,
    prompt: request.prompt,
    aspectRatio: request.aspectRatio,
    size: request.size,
    timestamp: Date.now()
  };
};

export const checkApiKey = async (): Promise<boolean> => {
  try {
    // @ts-ignore - window.aistudio is injected
    return await window.aistudio.hasSelectedApiKey();
  } catch (e) {
    return false;
  }
};

export const selectApiKey = async (): Promise<void> => {
  // @ts-ignore - window.aistudio is injected
  await window.aistudio.openSelectKey();
};
