export type LLMConfigType = {
    localLLMUrl: string
    openAIKey: string
  }
  
export const defaultConfig: LLMConfigType = {
    localLLMUrl: "",
    openAIKey: "",
}

export type LLMModel = {
    provider: "ollama" | "openai"
    model: string
}

export const models: LLMModel[] = [
    { provider: "ollama", model: "llama3" },
    { provider: "ollama", model: "llama3.1" },
    { provider: "ollama", model: "mistral" },
    { provider: "ollama", model: "codellama" },
    { provider: "ollama", model: "phi3" },
    { provider: "openai", model: "gpt-4o" },
    { provider: "openai", model: "gpt-4-turbo" },
    { provider: "openai", model: "gpt-4" },
    { provider: "openai", model: "gpt-3.5-turbo" },
]