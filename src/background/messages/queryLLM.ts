import type { PlasmoMessaging } from "@plasmohq/messaging"

type OllamaChatCompletionRequest = {
    model: string;
    messages: {
      role: "system" | "user" | "assistant";
      content: string;
    }[];
  };

type OllamaChatCompletionResponse = {
    id?: string;
    object?: string;
    created?: number;
    model?: string;
    choices: {
      index: number;
      message: {
        role: "assistant";
        content: string;
      };
      finish_reason?: string;
    }[];
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
  };
  
// ! move types to a seperate file 


const handler: PlasmoMessaging.MessageHandler = async (req: PlasmoMessaging.Request , res: PlasmoMessaging.Response ) => {
    // Make a POST request to the Ollama API for a chat completion in a clean way
    const ollamaUrl = "http://localhost:11434/v1/chat/completions"
    const payload: OllamaChatCompletionRequest = {
        model: "granite4",
        messages: [
            {
                role: "user",
                content: "How are you today?"
            }
        ]
    }

    try {
        const response: Response = await fetch(ollamaUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        if (response.ok) {
            // Restrict data to type unknown and only send what is needed
            const data = (await response.json()) as OllamaChatCompletionResponse;
            res.send(data.choices[0].message.content)
        } else {
            console.error(response)
            res.send({ error: `LLM API error: ${response.status}` })
        }
    } catch (e) {
        res.send({ error: e instanceof Error ? e.message : "Unknown error" })
    }

}

export default handler