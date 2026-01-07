import type { ChatRequest, ChatResponse, Message } from "ollama"
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { LLMConfig } from "~lib/storage"

const SYSTEM_PROMPT =
  "You are an AI assistant that modifies and generates text. When given existing text with an instruction, apply the requested changes and return only the modified text. When given just an instruction, generate the requested text. Do not include explanations or markdown formatting unless specifically requested."

async function chat(host: string, request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${host}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...request, stream: false })
  })

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<ChatResponse>
}

const handler: PlasmoMessaging.MessageHandler = async (
  req: PlasmoMessaging.Request,
  res: PlasmoMessaging.Response
) => {
  try {
    const { prompt, currentContent, model } = req.body as {
      prompt: string
      currentContent: string
      model: string
    }

    const host = await LLMConfig.get_local_url()
    const userContent = currentContent
      ? `Current text:\n${currentContent}\n\nInstruction: ${prompt}`
      : prompt

    const messages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userContent }
    ]

    const response = await chat(host, { model, messages })

    res.send(response.message.content)
  } catch (e) {
    res.send({ error: e instanceof Error ? e.message : "Unknown error" })
  }
}

export default handler