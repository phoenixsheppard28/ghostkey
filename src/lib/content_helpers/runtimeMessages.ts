import { getActiveEditable } from "~lib/activeEditable"
import { openInlinePopup } from "~lib/content_helpers/openInlinePopup"
export function registerRuntimeMessages() {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "OPEN_INLINE_POPUP") {
      const activeEditable = getActiveEditable()
      if (activeEditable) {
        openInlinePopup(activeEditable)
      }
    }
  })
}
