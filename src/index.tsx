import React from 'react';
import { gimmeSomeCopy, gimmeAList } from './helpers/getCopy';
import {omit} from 'lodash'

const APIS = {
  GEMINI: "GEMINI",
  // OPENAI: "OPENAI", // TODO - allow openai
}

const OMIT_PROPS = [
  'apiKey',
  'apiChoice',
  'prompt',
  'prompts',
  'context'
]

const defaultPrompt = "What is the response in LOTR when Aragorn says: Legolas, what do your elf eyes see?"

function setLocalStorageKey (uuid: string, value: string) {
  let error, saved
  try {
    localStorage.setItem(`gimme-text-${uuid}`, value)
    saved = true
  } catch (err) {
    error = err
    console.warn(`error setting localstorage key: `, err)
    saved = false
  } finally {
    return { error, saved }
  }
}

function getLocalStorageKey(uuid: string) {
  let error, value;
  try {
    value = localStorage.getItem(`gimme-text-${uuid}`);
  } catch (err) {
    error = err;
    value = null;
  } finally {
    return { error, value };
  }
}

const getText = async ({
  apiKey,
  apiChoice,
  prompt,
  context,
  uuid,
}: {
  apiKey: string,
  apiChoice?: string,
  prompt: string,
  context?: string,
  uuid: string,
}) => {
  if (!!uuid) {
    const { error, value } = getLocalStorageKey(uuid)
    if (!!error) console.warn(`Error retrieving localstorage: ${error.message}`)
    if (!error && value?.length) return { text: value, error: null }
  }

  const { text, error } = await gimmeSomeCopy({
    apiKey,
    prompt: prompt || defaultPrompt,
    apiChoice: apiChoice || APIS.GEMINI,
    systemInstruction: context,
  })
  
  !!uuid && text?.length && setLocalStorageKey(uuid, text)
  return { text, error }
}

const getListText = async ({
  apiKey,
  apiChoice,
  prompts,
  context,
  uuid,
}: {
  apiKey: string,
  apiChoice?: string,
  prompts: string,
  context?: string,
  uuid: string,
}) => {
  if (!!uuid) {
    const { error, value } = getLocalStorageKey(uuid)
    if (!!error) console.warn(`Error retrieving localstorage: ${error.message}`)
    if (!error && value?.length) return { text: value, error: null }
  }

  const { results, error } = await gimmeAList({
    apiKey,
    prompts: prompts || [],
    apiChoice: apiChoice || APIS.GEMINI,
    systemInstruction: context,
  })
  
  !!uuid && results?.length && setLocalStorageKey(uuid, JSON.stringify(results))
  return { results, error }
}

export async function GimmeSpan (props) {
  const { text, error } = await getText({...props})
  if (!!error) console.error(error?.message)
  return <span {...omit(props, OMIT_PROPS)}>{text}</span>
}

export async function GimmeP (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <p {...omit(props, OMIT_PROPS}>{text}</p>
}

export async function GimmeH1 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h1 {...omit(props, OMIT_PROPS}>{text}</h1>
}

export async function GimmeH2 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h2 {...omit(props, OMIT_PROPS}>{text}</h2>
}

export async function GimmeH3 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h3 {...omit(props, OMIT_PROPS}>{text}</h3>
}

export async function GimmeH4 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h4 {...omit(props, OMIT_PROPS}>{text}</h4>
}

export async function GimmeH5 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h5 {...omit(props, OMIT_PROPS}>{text}</h5>
}

export async function GimmeH6 (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <h6 {...omit(props, OMIT_PROPS}>{text}</h6>
}

export async function GimmeStrong (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <strong {...omit(props, OMIT_PROPS}>{text}</strong>
}

export async function GimmeEm (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <em {...omit(props, OMIT_PROPS}>{text}</em>
}

export async function GimmeQ (props) {
  const {text, error} = await getText({...props})
  if (!!error) console.error(error?.message)
  return <q {...omit(props, OMIT_PROPS}>{text}</q>
}

export async function GimmeBlockQuote (props) {
  const {text, error} = await getText({...props})
  return <blockquote {...omit(props, OMIT_PROPS}>{text}</blockquote>
}

export async function GimmeOL (props) {
  const {results, error} = await getListText({...props})
  return <ol {...omit(props, OMIT_PROPS}>
    {results.map(result => (<li>{result}</li>))}
  </ol>
}

// TODO - generate lists <ol> and <ul> based on a prompt
// TODO - generate a data table based on a prompt
// TODO - generate code in <code></code> tag with gemini code prompt
// TODO - cache info in localstorage
