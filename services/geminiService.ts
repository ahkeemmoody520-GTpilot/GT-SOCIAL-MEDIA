import { GoogleGenAI } from "@google/genai";
import type { MetricData } from '../types';

export const analyzePerformance = async (metricsData: MetricData[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Please set the API_KEY environment variable.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const metricsString = metricsData
      .map(metric => `- ${metric.label}: ${metric.value.toFixed(1)}%`)
      .join('\n');

    const prompt = `
      You are an expert social media analyst for a high-tech brand called "GT Pilot".
      Your tone is professional, insightful, and cinematic, like a mission briefing.
      Based on the following social media performance data, provide a concise analysis and three actionable recommendations.
      Format your response clearly with "Analysis:" and "Recommendations:" sections.

      Current Performance Metrics:
      ${metricsString}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing performance with Gemini:", error);
    if (error instanceof Error) {
        return `Error during analysis: ${error.message}`;
    }
    return "An unknown error occurred during analysis.";
  }
};
