export function getEditableContent(element: HTMLElement): string {
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    return element.value
  } else if (element.isContentEditable) {
    return element.innerText
  }
  return ""
}

export function setEditableContent(element: HTMLElement, content: string): void {
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    element.value = content
  } else if (element.isContentEditable) {
    element.innerText = content
  }
  element.dispatchEvent(new Event("input", { bubbles: true }))
}