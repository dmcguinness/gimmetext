
import { getModel } from './getModel'

const getGEMINICopy = async ({apiKey, prompt, systemInstruction}) => {
  const model = getModel(apiKey, systemInstruction)
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
  prompts,
  systemInstruction,
}: {
  apiKey: string,
  prompts: Array<string>,
  apiChoice: string,
  systemInstruction?: string,
}) {
  if (!apiKey) return { results: [], error: new Error(CONSTANTS.MISSING_API_KEY) }

  if (apiChoice === "GEMINI") {
    const results = await Promise.all(prompts.map(async (prompt) => {
      const text = await getGEMINICopy({prompt, apiKey, systemInstruction})
      return text
    }));
    
    let error;
    results.forEach(element => {
      if (element.length === 0) {
        error = new Error(CONSTANTS.REQUEST_ERR)
      }
    });

    return { results, error: error || null }
  } 

  return { results: [], error: new Error(CONSTANTS.UNSUPPORTED_API) }
}