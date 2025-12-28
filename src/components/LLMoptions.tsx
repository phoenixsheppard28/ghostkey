import {
  Box,
  Button,
  Group,
  Notification,
  PasswordInput,
  Stack,
  TextInput,
  Title
} from "@mantine/core"
import { useEffect, useState } from "react"
import type { JSX } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import type { LLMConfig } from "~lib/models/llm"
import { defaultConfig } from "~lib/models/llm"
import { isValidLocalUrl } from "~lib/text"

export default function LLMOptionsComponent(): JSX.Element {
  const [config, setConfig] = useStorage<LLMConfig>("llm_config", defaultConfig)
  const [localState, setLocalState] = useState<LLMConfig>(config)
  const [submitted, setSubmitted] = useState<{
    [K in keyof LLMConfig]?: boolean
  }>({})
  const [error, setError] = useState<{ [K in keyof LLMConfig]?: string }>({})

  useEffect(() => {
    setLocalState(config)
  }, [config])

  const handleChange = (key: keyof LLMConfig, value: string):void => {
    setLocalState((prev: LLMConfig) => ({ ...prev, [key]: value }))
    setError((prev: { [K in keyof LLMConfig]?: string }) => ({ ...prev, [key]: undefined })) // clear error on edit
  }

  const handleSubmit = (key: keyof LLMConfig):void => {
    // For localLLMUrl, check format
    if (key === "localLLMUrl") {
      if (
        localState.localLLMUrl.trim() !== "" &&
        !isValidLocalUrl(localState.localLLMUrl.trim())
      ) {
        setError((prev: LLMConfig) => ({
          ...prev,
          localLLMUrl: "Please enter a valid localhost or 127.0.0.1 URL."
        }))
        return
      }
    }
    setConfig((prev: LLMConfig) => ({
      ...prev,
      [key]: localState[key]
    }))
    setSubmitted((prev: { [K in keyof LLMConfig]?: boolean }) => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setSubmitted((prev: { [K in keyof LLMConfig]?: boolean }) => ({ ...prev, [key]: false }))
    }, 2000)
  }

  return (
    <Box maw={500} mx="auto">
      <Title order={2} mb="md">
        Options
      </Title>
      <Stack gap="md">
        <Group align="flex-end">
          <TextInput
            label="Local LLM URL"
            type="url"
            value={localState.localLLMUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("localLLMUrl", e.target.value)
            }
            placeholder="http://localhost:11434"
            error={error.localLLMUrl}
            style={{ flex: 1 }}
            autoComplete="off"
          />
          <Button onClick={() => handleSubmit("localLLMUrl")}>Submit</Button>
        </Group>
        {submitted.localLLMUrl && (
          <Notification color="green" withCloseButton={false} mt={-15}>
            Submitted!
          </Notification>
        )}
        <Group align="flex-end">
          <PasswordInput
            label="OpenAI API Key"
            value={localState.openAIKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("openAIKey", e.target.value)
            }
            placeholder="sk-..."
            autoComplete="off"
            style={{ flex: 1 }}
            error={error.openAIKey}
          />
          <Button onClick={() => handleSubmit("openAIKey")}>Submit</Button>
        </Group>
        {submitted.openAIKey && (
          <Notification color="green" withCloseButton={false} mt={-15}>
            Submitted!
          </Notification>
        )}
        <Group align="flex-end">
          <PasswordInput
            label="Claude API Key"
            value={localState.claudeKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("claudeKey", e.target.value)
            }
            placeholder="claude-key"
            autoComplete="off"
            style={{ flex: 1 }}
            error={error.claudeKey}
          />
          <Button onClick={() => handleSubmit("claudeKey")}>Submit</Button>
        </Group>
        {submitted.claudeKey && (
          <Notification color="green" withCloseButton={false} mt={-15}>
            Submitted!
          </Notification>
        )}
      </Stack>
    </Box>
  )
}
