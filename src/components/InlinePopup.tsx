import { ActionIcon, Box, Group, Popover, TextInput } from "@mantine/core"
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
    <Popover
      opened={true}
      onClose={onClose}
      position="bottom-start"
      shadow="md"
      withinPortal={false}>
      <Popover.Target>
        <Box style={{ width: 1, height: 1 }} />
      </Popover.Target>
      <Popover.Dropdown
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
          e.stopPropagation()
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {``
          // handler inside the actual element
          if (e.key === "Escape") {
            onClose()
          }
          e.stopPropagation()
        }}>
        <form onSubmit={handleSubmit} style={{ minWidth: 280, maxWidth: 400 }}>
          <Group align="flex-start">
            <TextInput
              ref={inputRef}
              placeholder="Describe your changes..."
              value={value}
              onChange={handleInputChange}
              onFocus={() => {
                shouldReclaimFocusRef.current = true
              }} // this and onBlur fix youtube focus stealing
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
      </Popover.Dropdown>
    </Popover>
  )
}
