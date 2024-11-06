import { gimmeSomeCopy, gimmeAList } from '../src/helpers/getCopy'
jest.mock('../src/helpers/getModel', () => ({
  getModel: jest.fn()
}))
import { getModel } from '../src/helpers/getModel'

const MOCK_RETURNS_EMPTY = {
  response: {
    text: () => ('')
  }
}

describe('helpers/getCopy', () => {
  describe('gimmeSomeCopy', () => {
    const VALID_ARGS = {
      apiKey: 'abcd-efgh-ijkl-mnop',
      prompt: 'This is a prompt',
      apiChoice: "GEMINI",
      systemInstruction: "you're a pig that speaks a funny version of latin"
    }


    test('errors when no apiKey', async () => {
      let response
      try {
        response = await gimmeSomeCopy({
          ...VALID_ARGS,
          apiKey: null,
        })
      } catch (e) {
        expect(e?.message).toBeInstanceOf('string')
      } finally {
        expect(response?.text).toBe('')
        expect(typeof response?.error).toBe('object')
        expect(response?.error?.message).toBe('Please provide a valid api key')
      } 
    })

    test('errors when invalid apiChoice', async () => {
      let response
      try {
        response = await gimmeSomeCopy({
          ...VALID_ARGS,
          apiChoice: 'invalid',
        })
      } catch (e) {
        expect(e?.message).toBeInstanceOf('string')
      } finally {
        expect(response?.text).toBe('')
        expect(typeof response?.error).toBe('object')
        expect(response?.error?.message).toBe('Please choose a valid api')
      } 
    })

    test('errors when api does not return text', async () => {
      
      (getModel as jest.Mock).mockReturnValue({
        generateContent: () => (MOCK_RETURNS_EMPTY)
      })


      const response = await gimmeSomeCopy(VALID_ARGS)
      expect(response.text).toBe('')
      expect(typeof response?.error).toBe('object')
      expect(response?.error?.message).toBe('Something went wrong making the request')
    })
  })


  // test list and individual
  // test when errors
  // test when api not gemini
})


