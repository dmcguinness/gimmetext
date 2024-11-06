// import { ChatGPTAPI } from 'chatgpt'
import { GoogleGenerativeAI } from "@google/generative-ai"


// todo make this by api choice
export function getModel (apiKey, systemInstruction) {
  const genAI = new GoogleGenerativeAI(apiKey)
  let modelParams = { model: "gemini-1.5-flash" }
  if (!!systemInstruction) {
    modelParams['systemInstruction'] = systemInstruction 
  }

  const model = genAI.getGenerativeModel(modelParams);
  return model
}