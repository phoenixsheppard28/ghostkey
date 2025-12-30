import { ActionIcon, Group, Paper, TextInput } from "@mantine/core"
import type { JSX } from "react"
import { useEffect, useRef, useState } from "react"
import { FiX } from "react-icons/fi"

export default function InlinePopup({
  onClose,
  onSubmit
}: {
  onClose: () => void
  onSubmit: (value: string) => void
}): JSX.Element {
  const [value, setValue] = useState("")
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
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    onSubmit(value)
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
          />
          <ActionIcon
            onClick={onClose}
            aria-label="Close popup"
            size="lg"
            variant="subtle">
            <FiX size={18} />
          </ActionIcon>
        </Group>
      </form>
    </Paper>
  )
}
