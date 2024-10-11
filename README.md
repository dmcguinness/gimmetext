# gimmetext
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
      apiKey={process.env.GEMINI_API_KEY} />
  )
}
```
