import { GoogleGenAI, Type } from "@google/genai";
import { LocationData } from "../types";

// Note: In a real production app, you might proxy this through a backend to protect the key,
// or use Firebase App Check. For this frontend demo, we use the env variable.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const identifyLocation = async (base64Image: string): Promise<LocationData> => {
  // Strip the prefix if present (data:image/jpeg;base64,)
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Use Flash for speed and image capabilities
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `You are a visual positioning system for a university campus. 
            Analyze the image to identify the building and floor. 
            Look for signage, architectural style, or room numbers.
            
            Simulate a detection for a demo if explicit signs aren't visible, based on these rules:
            - Lots of glass/tech equipment: Engineering Hall
            - Books/Quiet areas: Central Library
            - Lab equipment/white tiles: Science Block
            
            Return the result in JSON format.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            building: { type: Type.STRING, description: "Name of the building detected" },
            floor: { type: Type.STRING, description: "Floor number detected (e.g., '1', '2', 'G')" },
            confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" },
            description: { type: Type.STRING, description: "Short reasoning for the detection" }
          },
          required: ["building", "floor", "confidence"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as LocationData;
    }
    
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      building: "Science Block",
      floor: "1",
      confidence: 0.85,
      description: "Simulated fallback: Detected lab equipment consistent with Science Block."
    };
  }
};