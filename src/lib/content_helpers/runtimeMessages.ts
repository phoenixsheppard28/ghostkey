import { ActiveEditable } from "~lib/actives/activeEditable"
import { openInlinePopup } from "~lib/content_helpers/openInlinePopup"

export function registerRuntimeMessages(): void {
  chrome.runtime.onMessage.addListener((msg: MessageEvent) => {
    if (msg.type === "OPEN_INLINE_POPUP") {
      const activeEditable = ActiveEditable.getActiveEditable()
      if (activeEditable) {
        openInlinePopup(activeEditable)
      }
    }
  })
}
