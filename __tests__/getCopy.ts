import { gimmeSomeCopy, gimmeAList } from '../src/helpers/getCopy'
import { GoogleGenerativeAI } from "@google/generative-ai"

describe('helpers/getCopy', () => {
  // test list and individual
  test('gimmeSomeCopy errors when no apiKey', async () => {
    let response
    try {
      response = await gimmeSomeCopy({
        apiKey: null,
        prompt: 'This is a prompt',
        apiChoice: "GEMINI",
        systemInstruction: "you're a pig that speaks a funny version of latin"
      })
    } catch (e) {
      expect(e?.message).toBeInstanceOf('string')
    } finally {
      expect(response?.text).toBe('')
      expect(typeof response?.error).toBe('object')
      expect(response?.error?.message).toBe('Please provide a valid api key')
    } 

  })

  // test when errors

  // test when api not gemini
})


