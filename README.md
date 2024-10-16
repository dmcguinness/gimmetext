# gimme-text
Generate AI placeholder or production copy in your product

# Getting Started
To get started using AI generated placeholder or production text, follow the steps below

```
npm install -S gimme-text
```

or for yarn:
```
yarn add gimme-text
```


# Usage
```
import { GimmeP } from 'gimme-text'

function Component() {
  return (
    <GimmeP 
      className="yourclassnames"
      prompt="Write me two sentences that seem important with no real point."
      context="You are a sentient toaster observing the kitchen around you."
      apiKey={YOUR_GEMINI_API_KEY} />
  )
}

/*
  Props:
  - prompt: write a prompt describing what you would like to see or asking a question you would like answered
  - context: any additional context you would like to add for the resulting text
  - apiKey: Gemini API project key
  - apiChoice: one of ["GEMINI"], defaults to "GEMINI" (future plans to add openai support)
*/
```
