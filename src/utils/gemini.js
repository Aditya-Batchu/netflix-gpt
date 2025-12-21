import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API } from "./firebase";

const genAI = new GoogleGenerativeAI(GEMINI_API);

// 1.5-flash is the best free model for this task
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});