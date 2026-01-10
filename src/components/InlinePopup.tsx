import { ActionIcon, Group, Paper, TextInput, Text } from "@mantine/core"
import type { JSX } from "react"
import { useEffect, useRef, useState } from "react"
import { FiX } from "react-icons/fi"
import type { LLMModel } from "~lib/models/llm"
import { models } from "~lib/models/llm"

function LoadingDots(): JSX.Element {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[0, 1, 2].map((i: number) => (
        <span
          key={i}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "currentColor",
            animation: "pulse 1.4s infinite",
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </span>
  )
}

export default function InlinePopup({
  onClose,
  onSubmit
}: {
  onClose: () => void
  onSubmit: (value: string, model: LLMModel) => Promise<{success: boolean}>
}): JSX.Element {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState<LLMModel>(models[0])
  const inputRef = useRef<HTMLInputElement>(null)
  const shouldReclaimFocusRef = useRef(false)

  // Focus the input on mount, prevents focus stealing
  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
    return (): void => clearTimeout(focusTimeout)
  }, [])

  useEffect(() => {
    // add the escape handler to the page
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return (): void => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue(event.target.value)
    setError(null)
  }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setLoading(true)
    
    const { success } = await onSubmit(value, model)
    setLoading(false)
    if (!success) {
      setError("Error submitting prompt to LLM. Please check your local LLM server is running and try again.")
      // Don't close the popup, allow the user to fix their input
      return
    }
    onClose()
  }

  return (
    <Paper
      shadow="md"
      p="sm"
      radius="md"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
          onClose()
        }
        e.stopPropagation()
      }}
    >
      <form onSubmit={handleSubmit}>
        <Group align="flex-start" wrap="nowrap">
          <TextInput
            ref={inputRef}
            placeholder="Describe your changes..."
            value={value}
            onChange={handleInputChange}
            disabled={loading}
            rightSection={loading ? <LoadingDots /> : null}
            onFocus={() => {
              shouldReclaimFocusRef.current = true
            }}
            onBlur={(): void => {
              if (shouldReclaimFocusRef.current) {
                setTimeout(() => inputRef.current?.focus(), 0)
              }
              shouldReclaimFocusRef.current = false
            }}
            style={{ flex: 1 }}
            error={!!error}
          />
          <ActionIcon
            onClick={onClose}
            aria-label="Close popup"
            size="lg"
            variant="subtle">
            <FiX size={18} />
          </ActionIcon>
        </Group>
        {error && (
          <Text color="red" size="xs" mt={6} style={{ whiteSpace: "pre-line" }}>
            {error}
          </Text>
        )}
      </form>
    </Paper>
  )
}
