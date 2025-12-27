import { ActionIcon, Box, Group, Popover, TextInput } from "@mantine/core"
import { useState } from "react"
import { FiX } from "react-icons/fi"

export default function InlinePopup({
  onClose,
  onSubmit
}: {
  onClose: () => void
  onSubmit?: (value: string) => void
}) {
  const [value, setValue] = useState("")
  const [opened, setOpened] = useState(true)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(value)
    }
    handleClose()
  }

  const handleClose = () => {
    setOpened(false)
    onClose()
  }

  return (
    <Popover
      opened={opened}
      onClose={handleClose}
      position="bottom-start"
      shadow="md"
      withinPortal={false}>
      <Popover.Target>
        <Box style={{ width: 1, height: 1 }} />
      </Popover.Target>
      <Popover.Dropdown
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.stopPropagation()}
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
              onClick={handleClose}
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
