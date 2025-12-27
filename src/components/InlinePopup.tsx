import { useState } from "react"
import { TextInput, ActionIcon, Group } from "@mantine/core"
import { FiX } from "react-icons/fi"

export default function InlinePopup({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit?: (value: string) => void
}) {
  const [value, setValue] = useState("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(value)
    }
    onClose()
  }

  return (
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
          variant="subtle"
        >
          <FiX size={18} />
        </ActionIcon>
      </Group>
    </form>
  )
}
