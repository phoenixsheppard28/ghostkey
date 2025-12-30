export type LLMConfigType = {
    localLLMUrl: string
    openAIKey: string
    claudeKey: string
  }
  
export const defaultConfig: LLMConfigType = {
    localLLMUrl: "",
    openAIKey: "",
    claudeKey: ""
}