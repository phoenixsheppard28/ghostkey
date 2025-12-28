import { ActiveEditable } from "~lib/actives/activeEditable"
import { ActivePopup } from "~lib/actives/activePopup"
import { openInlinePopup } from "~lib/content_helpers/openInlinePopup"

export function registerRuntimeMessages(): void {
  chrome.runtime.onMessage.addListener((msg: MessageEvent) => {
    if (msg.type === "OPEN_INLINE_POPUP") {
      if (ActivePopup.exists()) {
        console.log("focused existing popup")
        ActivePopup.focus()
        return
      }

      const activeEditable = ActiveEditable.getActiveEditable()
      if (activeEditable) {
        // maybe othrer logic here to control k come back
        openInlinePopup(activeEditable)
      }
      else{
        console.log("none detected")
      }
    }
  })
}
