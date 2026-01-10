// src/lib/storage.ts
import { Storage } from "@plasmohq/storage"
import { defaultConfig, type LLMConfigType } from "./models/llm"

export const LLM_CONFIG_KEY = "llm_config"

const storage = new Storage() // use "local" for larger data


export const LLMConfig = {
    get: async (): Promise<LLMConfigType> => await storage.get<LLMConfigType>(LLM_CONFIG_KEY) ?? defaultConfig,
    set: async (config: LLMConfigType): Promise<void> => storage.set(LLM_CONFIG_KEY, config),
    get_local_url: async (): Promise<string> => (await LLMConfig.get()).localLLMUrl,
    get_openai_key: async (): Promise<string> => (await LLMConfig.get()).openAIKey,
}

