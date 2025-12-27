import { setActiveEditable } from "~lib/actives/activeEditable"
import { isEditable } from "~lib/text"

export function registerFocusTracker() {
  document.addEventListener("focusin", (e) => {
    let el = e.target

    if (!(el instanceof HTMLElement)) {
      setActiveEditable(null)
      return
    }

    if (!isEditable(el)) {
      el = el.closest('[contenteditable="true"]')
    }

    setActiveEditable(el instanceof HTMLElement && isEditable(el) ? el : null)
  })
}
