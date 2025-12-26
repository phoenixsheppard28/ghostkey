import type { PlasmoCSConfig } from "plasmo"
import { isEditable } from "~lib/text"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_start"
}


window.addEventListener("load", () => {
  console.log("content script loaded")
  // document.body.style.background = "pink"
})


let activeEditable: HTMLElement | null = null

document.addEventListener("focusin", (e) => {
  let el = e.target
  if (!(el instanceof HTMLElement)) {
    activeEditable = null
    return
  }

  // Walk up the DOM to find a contenteditable parent
  if (!isEditable(el)) {
    el = el.closest('[contenteditable="true"]')
  }

  activeEditable = el instanceof HTMLElement && isEditable(el)
    ? el
    : null
})

document.addEventListener("keydown", (e) => {
  const isCmdOrCtrl = e.ctrlKey || e.metaKey

  if (isCmdOrCtrl && e.key === "k" && activeEditable) {
    e.preventDefault()
    e.stopPropagation()
    console.log("detected") // works!
    // openPopup(activeEditable)
  }
},true)