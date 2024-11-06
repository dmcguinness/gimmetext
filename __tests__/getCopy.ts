import { gimmeSomeCopy, gimmeAList } from '../src/helpers/getCopy'
jest.mock('../src/helpers/getModel', () => ({
  getModel: jest.fn()
}))
import { getModel } from '../src/helpers/getModel'

const DEFAULT_TEXT = 'I am some copy';
const MOCK_RETURNS_EMPTY = {
  response: {
    text: () => ('')
  }
};
const MOCK_RETURNS_TEXT = {
  response: {
    text: () => (DEFAULT_TEXT)
  }
};


const mockModel = contentResponse => {
  (getModel as jest.Mock).mockReturnValue({
    generateContent: () => (contentResponse)
  })
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
      
      mockModel(MOCK_RETURNS_EMPTY)

      const response = await gimmeSomeCopy(VALID_ARGS)
      expect(response.text).toBe('')
      expect(typeof response?.error).toBe('object')
      expect(response?.error?.message).toBe('Something went wrong making the request')
    })


    test('returns copy when model provides text', async () => {
      mockModel(MOCK_RETURNS_TEXT)

      const response = await gimmeSomeCopy(VALID_ARGS)
      expect(response.text).toBe(DEFAULT_TEXT)
      expect(response?.error).toBe(null)
    })
  })


  // test list and individual
  // test when errors
  // test when api not gemini
})


