import React from 'react';
import { gimmeSomeCopy } from './helpers/getCopy';

const APIS = {
  GEMINI: "GEMINI",
  // OPENAI: "OPENAI", // TODO - allow openai
}

const defaultPrompt = "What is the response in LOTR when Aragorn says: Legolas, what do your elf eyes see?"

export async function GimmeP ({
  apiKey,
  apiChoice,
  prompt,
  ...props
}: {
  apiKey: string,
  apiChoice: string,
  prompt: string,
}) {
  const { text, error } = await gimmeSomeCopy(
    apiKey,
    prompt || defaultPrompt,
    apiChoice || APIS.GEMINI
  )
  return (
    <p {...props}>{text}</p>
  )
}
