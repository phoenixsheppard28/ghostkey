import { ActiveEditable } from "~lib/actives/activeEditable"
import { isEditable } from "~lib/text"

export function registerFocusTracker(): void {
  document.addEventListener("focusin", (e: FocusEvent) => {
    let el = e.target

    if (!(el instanceof HTMLElement)) {
      ActiveEditable.setActiveEditable(null)
      return
    }

    if (!isEditable(el)) {
      el = el.closest('[contenteditable="true"]')
    }

    ActiveEditable.setActiveEditable(el instanceof HTMLElement && isEditable(el) ? el : null)
  })
}
