import OpenAI from "openai";
import { GEMINI_API } from "./firebase";


const openai = new OpenAI({
  apiKey:GEMINI_API,
  dangerouslyAllowBrowser: true
})

export default openai;