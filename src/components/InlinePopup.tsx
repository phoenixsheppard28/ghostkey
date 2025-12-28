import type { JSX } from "react"
import { ActionIcon, Box, Group, Popover, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { FiX } from "react-icons/fi"

export default function InlinePopup({
  onClose,
  onSubmit
}: {
  onClose: () => void
  onSubmit?: (value: string) => void
}): JSX.Element {
  const [value, setValue] = useState("")

  useEffect(() => { // add the escape handler to the page 
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return (): void => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent):void => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(value)
    }
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
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>  { // handler inside the actual element
          if (e.key === "Escape") {
            onClose()
          }
          e.stopPropagation()
        }}
      >
        <form onSubmit={handleSubmit} style={{ minWidth: 280, maxWidth: 400 }}>
          <Group align="flex-start">
            <TextInput
              autoFocus
              placeholder="Describe your changes..."
              value={value}
              onChange={handleInputChange}
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
