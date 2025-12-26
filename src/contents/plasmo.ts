import type { PlasmoCSConfig } from "plasmo"
import { registerFocusTracker } from "../lib/content_helpers/focusTracker"
import { registerRuntimeMessages } from "../lib/content_helpers/runtimeMessages"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_start"
}

window.addEventListener("load", () => {
  console.log("content script loaded")
  // document.body.style.background = "pink"
})

registerFocusTracker()
registerRuntimeMessages()
