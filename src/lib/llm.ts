export type LLMConfig = {
    localLLMUrl: string
    openAIKey: string
    claudeKey: string
  }
  
export const defaultConfig: LLMConfig = {
    localLLMUrl: "",
    openAIKey: "",
    claudeKey: ""
}