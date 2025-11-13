
import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary, Tone } from '../types';

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy, brief title for the trip. E.g., 'Amalfi Coast Dream Vacation'." },
    destination: { type: Type.STRING, description: "The primary country or city. E.g., 'Italy'." },
    dates: { type: Type.STRING, description: "The start and end dates of the trip. E.g., 'September 10-18, 2024'." },
    summary: { type: Type.STRING, description: "A concise, one-paragraph summary of the trip's highlights." },
    inclusions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of bullet points of what is included in the price."
    },
    exclusions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of bullet points of what is NOT included in the price."
    },
    cost: { type: Type.STRING, description: "The total cost, specifying per person or for the package. E.g., '$4,500 per person'." }
  },
  required: ['title', 'destination', 'dates', 'summary', 'inclusions', 'exclusions', 'cost']
};

export async function generateItineraryJson(rawText: string): Promise<Itinerary> {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not set. Returning mock data.");
    return new Promise(resolve => setTimeout(() => resolve({
        title: "Mocked: Italian Riviera Holiday",
        destination: "Italy",
        dates: "October 5-12, 2024",
        summary: "This is a mocked summary for a beautiful trip to the Italian Riviera, featuring charming villages, stunning coastlines, and exquisite cuisine.",
        inclusions: ["7 nights in luxury hotels", "Private airport transfers", "Daily breakfast", "A guided tour of Cinque Terre"],
        exclusions: ["International airfare", "Travel insurance", "Lunches and dinners", "Personal expenses"],
        cost: "$5,000 per person"
    }), 2000));
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Analyze the following travel supplier data and extract the key itinerary details into a structured JSON format.

  Supplier Data:
  ---
  ${rawText}
  ---
  
  Extract the information according to the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Itinerary;

  } catch (error) {
    console.error("Error generating itinerary JSON:", error);
    throw new Error("Failed to parse itinerary data from the provided text.");
  }
}

export async function refineProseWithTone(itinerary: Itinerary, tone: Tone): Promise<string> {
   if (!process.env.API_KEY) {
    return new Promise(resolve => setTimeout(() => resolve(`This is a mocked summary for a beautiful trip to ${itinerary.destination}, tailored with a ${tone} tone. It highlights the key features from the itinerary in an engaging way.`), 1000));
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `You are a creative travel writer. Based on the following structured itinerary data, write an engaging, single-paragraph summary for a client.
  
  **Tone to adopt:** ${tone}
  - **Luxury:** Emphasize comfort, exclusivity, and premium experiences.
  - **Adventure:** Focus on excitement, unique activities, and exploration.
  - **Family:** Highlight fun for all ages, safety, and creating memories together.

  **Itinerary Data:**
  - Title: ${itinerary.title}
  - Destination: ${itinerary.destination}
  - Dates: ${itinerary.dates}
  - Key Inclusions: ${itinerary.inclusions.join(', ')}
  
  Now, write the new summary paragraph.`;
  
  try {
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error refining prose:", error);
    return itinerary.summary; // Fallback to original summary
  }
}
