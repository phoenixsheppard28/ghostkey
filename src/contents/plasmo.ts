import type { PlasmoCSConfig } from "plasmo"

import { isEditable } from "~lib/text"
import { registerFocusTracker } from "./focusTracker"
import { registerRuntimeMessages } from "./runtimeMessages"

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
