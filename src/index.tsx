import React from 'react';
import { gimmeSomeCopy } from './helpers/getCopy';
import {omit} from 'lodash'

const APIS = {
  GEMINI: "GEMINI",
  // OPENAI: "OPENAI", // TODO - allow openai
}
const OMIT_PROPS = [
  'apiKey',
  'apiChoice',
  'prompt',
  'context'
]

const defaultPrompt = "What is the response in LOTR when Aragorn says: Legolas, what do your elf eyes see?"
const CHARACTERS_PER_TOKEN = 4

const getText = async ({
  apiKey,
  apiChoice,
  prompt,
  context,
}: {
  apiKey: string,
  apiChoice?: string,
  prompt: string,
  context?: string,
}) => {
  const { text, error } = await gimmeSomeCopy({
    apiKey,
    prompt: prompt || defaultPrompt,
    apiChoice: apiChoice || APIS.GEMINI,
    systemInstruction: context,
  })
  return { text, error }
}

export async function GimmeSpan (props) {
  const { text, error } = await getText({...props})
  if (!!error) console.error(error?.message)
  return <span {...omit(props, OMIT_PROPS)}>{text}</span>
}

export async function GimmeP (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <p {...props}>{text}</p>
}

export async function GimmeH1 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h1 {...props}>{text}</h1>
}

export async function GimmeH2 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h2 {...props}>{text}</h2>
}

export async function GimmeH3 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h3 {...props}>{text}</h3>
}

export async function GimmeH4 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h4 {...props}>{text}</h4>
}

export async function GimmeH5 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h5 {...props}>{text}</h5>
}

export async function GimmeH6 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h6 {...props}>{text}</h6>
}

export async function GimmeStrong (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <strong {...props}>{text}</strong>
}

export async function GimmeEm (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <em {...props}>{text}</em>
}

export async function GimmeQ (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <q {...props}>{text}</q>
}

export async function GimmeBlockQuote (props) {
  const {text, error} = await getText({...props})
  return <blockquote {...props}>{text}</blockquote>
}

// TODO - generate lists <ol> and <ul> based on a prompt
// TODO - generate a data table based on a prompt

// TODO - generate code in <code></code> tag with gemini code prompt
// TODO - cache info in localstorage
