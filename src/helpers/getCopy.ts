// import { ChatGPTAPI } from 'chatgpt'
import { GoogleGenerativeAI } from "@google/generative-ai"

// const getOPENAICopy = async (prompt, apiKey) => {
//   const api = new ChatGPTAPI({ apiKey })
// }

const getGEMINICopy = async ({apiKey, prompt, systemInstruction}) => {
  const genAI = new GoogleGenerativeAI(apiKey)

  let modelParams = { model: "gemini-1.5-flash" }
  if (!!systemInstruction) {
    modelParams['systemInstruction'] = systemInstruction 
  }
  
  const model = genAI.getGenerativeModel(modelParams);
  const result = await model.generateContent(prompt);
  return result.response.text()
}

const CONSTANTS = {
  MISSING_API_KEY: "Please provide a valid api key",
  REQUEST_ERR: "Something went wrong making the request",
  UNSUPPORTED_API: "Please choose a valid api",
}

export async function gimmeSomeCopy({
  apiKey,
  apiChoice,
  prompt,
  systemInstruction,
}: {
  apiKey: string,
  prompt: string,
  apiChoice: string,
  systemInstruction?: string,
}) {
  if (!apiKey) return { text: "", error: new Error(CONSTANTS.MISSING_API_KEY) }

  if (apiChoice === "GEMINI") {
    const text = await getGEMINICopy({prompt, apiKey, systemInstruction})
    if (!text?.length) {
      return { text, error: new Error(CONSTANTS.REQUEST_ERR)}
    }

    return { text, error: null }
  } 

  return { text: "", error: new Error(CONSTANTS.UNSUPPORTED_API) }
}

export async function gimmeAList({
  apiKey,
  apiChoice,
  prompt,
  systemInstruction,
  length,
}, {
  apiKey: string,
  prompt: string,
  apiChoice: string,
  systemInstruction?: string,
  length: number
}) {
  if (!apiKey) return { text: "", error: new Error(CONSTANTS.MISSING_API_KEY) }

  if (apiChoice === "GEMINI") {
  }

  return { list: [], error: new Error(CONSTANTS.UNSUPPORTED_API) }
}