// import { ChatGPTAPI } from 'chatgpt'
import { GoogleGenerativeAI } from "@google/generative-ai"

// const getOPENAICopy = async (prompt, apiKey) => {
//   const api = new ChatGPTAPI({ apiKey })
// }

const getGEMINICopy = async (prompt, apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text()
}

export async function gimmeSomeCopy(apiKey: string, prompt: string, apiChoice: string) {
  if (!apiKey) {
    return { 
      text: null,
      error: new Error("Please provide a valid api key")
    }
  }

  if (apiChoice === "GEMINI") {
    const text = await getGEMINICopy(prompt, apiKey)
    if (!text?.length) {
      return {
        text,
        error: new Error("Something went wrong")
      }
    }
    return { text, error: null }
  } 

  return { text: null, error: new Error("Please choose a valid api") }
}