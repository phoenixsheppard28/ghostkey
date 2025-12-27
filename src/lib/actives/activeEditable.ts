let activeEditable: HTMLElement | null = null

export function setActiveEditable(el: HTMLElement | null) {
  activeEditable = el
}

export function getActiveEditable(): HTMLElement | null {
  return activeEditable
}
