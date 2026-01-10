import { MantineProvider } from "@mantine/core"
import mantineCss from "bundle-text:@mantine/core/styles.css"
import { createRoot } from "react-dom/client"
import { GRAPE_MANTINE_THEME, } from "~styles/MantineStyles"
import InlinePopup from "~components/InlinePopup"
import { ActivePopup } from "~lib/actives/activePopup"
import { getEditableContent, setEditableContent } from "~lib/editableUtils"
import { sendToBackground, type PlasmoMessaging } from "@plasmohq/messaging"
import type { LLMModel } from "~lib/models/llm"

export function openInlinePopup(activeEditable: HTMLElement): void {

  console.log("detected")

  const container = document.createElement("div")
  container.style.position = "relative"
  container.style.zIndex = "99999999" // this ish is hackey

  const shadowRoot = container.attachShadow({ mode: "open" })

  const styleElement = document.createElement("style")
  styleElement.textContent = mantineCss
  shadowRoot.appendChild(styleElement)

  // Create a container for React to render into
  const reactContainer = document.createElement("div")
  reactContainer.id = "inline-popup-root"
  shadowRoot.appendChild(reactContainer)

  // Insert the container into the DOM
  activeEditable.insertAdjacentElement("beforebegin", container) // ! afterend or beforebegin change placing alot

  // Create React root and render
  const root = createRoot(reactContainer)

  // Store reference to active popup
  ActivePopup.set({ container, shadowRoot, root })

  const handleClose = (): void => {
    root.unmount()
    container.remove()
    ActivePopup.set(null)
  }

  const handleSubmit = async (value: string, model: LLMModel): Promise<{success: boolean}> => {
    try {
    console.log("Submitted:", value)
  
    const currentContent = getEditableContent(activeEditable)
    const resp: PlasmoMessaging.Response = await sendToBackground({
      name: "queryLLM",
      body: { prompt: value, currentContent: currentContent, model: model }
    })
    console.log(resp)

    if (typeof resp === "string") {
      setEditableContent(activeEditable, resp)
      return {success: true}
    } else {
      console.error("LLM error:", resp)
      return {success: false}
    }
  }
  catch (error) {
    console.error("Error submitting prompt to LLM:", error)
    return {success: false}
  }
  }

  root.render(
    <MantineProvider
      getRootElement={() => reactContainer}
      cssVariablesSelector="#inline-popup-root"
      theme={GRAPE_MANTINE_THEME}
    >
      <InlinePopup onClose={handleClose} onSubmit={handleSubmit} />
    </MantineProvider>
  )

}
