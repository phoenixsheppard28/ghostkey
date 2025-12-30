import { Ollama } from "ollama"
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { LLMConfig } from "~lib/storage"

const handler: PlasmoMessaging.MessageHandler = async (
  req: PlasmoMessaging.Request,
  res: PlasmoMessaging.Response,
) => {
  try {
    const { prompt, currentContent, model } = req.body as {
      prompt: string
      currentContent: string
      model: string
    }

    const ollama = new Ollama({ host: await LLMConfig.get_local_url() })
    const userMessage = currentContent
      ? `Current text:\n${currentContent}\n\nInstruction: ${prompt}`
      : prompt

    const response = await ollama.chat({
      model: model,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that modifies and generates text. When given existing text with an instruction, apply the requested changes and return only the modified text. When given just an instruction, generate the requested text. Do not include explanations or markdown formatting unless specifically requested."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })

    // The response from ollama.chat is expected to have a .message.content
    if (
      response &&
      response.message &&
      typeof response.message.content === "string"
    ) {
      res.send(response.message.content)
    } else {
      console.error(response)
      res.send({ error: `LLM API error: Unexpected response structure` })
    }
  } catch (e) {
    res.send({ error: e instanceof Error ? e.message : "Unknown error" })
  }
}

export default handler