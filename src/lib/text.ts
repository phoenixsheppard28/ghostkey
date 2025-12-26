export function isEditable(el: HTMLElement | null): boolean {
  if (!el) return false

  if (el instanceof HTMLInputElement) {
    const type = el.type.toLowerCase()
    return ["text", "search", "email", "url", "password"].includes(type)
  }

  if (el instanceof HTMLTextAreaElement) return true

  if (el.isContentEditable) return true

  return false
}


export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function isValidLocalUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    // Accepts only http://localhost, http://127.0.0.1, or their https equivalents (any port/path)
    return (
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") &&
      (parsed.protocol === "http:" || parsed.protocol === "https:")
    )
  } catch {
    return false
  }
}