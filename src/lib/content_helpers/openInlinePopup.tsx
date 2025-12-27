import { MantineProvider } from "@mantine/core"
import mantineCss from "bundle-text:@mantine/core/styles.css"
import { createRoot } from "react-dom/client"

import InlinePopup from "~components/InlinePopup"
import { ActivePopup } from "~lib/actives/activePopup"

export function openInlinePopup(activeEditable: HTMLElement): void {
  // If popup already exists, focus it and return
  if (ActivePopup.exists()) {
    ActivePopup.focus()
    return
  }

  console.log("detected")

  const container = document.createElement("div")
  container.style.position = "relative"
  container.style.zIndex = "99999999"

  const shadowRoot = container.attachShadow({ mode: "open" })

  const styleElement = document.createElement("style")
  styleElement.textContent = mantineCss
  shadowRoot.appendChild(styleElement)

  // Create a container for React to render into
  const reactContainer = document.createElement("div")
  reactContainer.id = "inline-popup-root"
  shadowRoot.appendChild(reactContainer)

  // Insert the container into the DOM
  activeEditable.insertAdjacentElement("beforebegin", container)

  // Create React root and render
  const root = createRoot(reactContainer)

  // Store reference to active popup
  ActivePopup.set({ container, shadowRoot, root })

  const handleClose = (): void => {
    root.unmount()
    container.remove()
    ActivePopup.set(null)
  }

  const handleSubmit = (value: string): void => {
    console.log("Submitted:", value)
    // TODO: Hook up to LLM here
  }

  root.render(
    <MantineProvider // need this to inject styles into shadow dom
      getRootElement={() => reactContainer}
      cssVariablesSelector="#inline-popup-root">
      <InlinePopup onClose={handleClose} onSubmit={handleSubmit} />
    </MantineProvider>
  )
}
