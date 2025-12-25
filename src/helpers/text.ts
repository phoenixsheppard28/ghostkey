export function isEditable(el) {
    if (!el) return false
  
    const tag = el.tagName?.toLowerCase()
  
    if (tag === "input") {
      const type = el.type?.toLowerCase()
      return !type || ["text", "search", "email", "url", "password"].includes(type)
    }
  
    if (tag === "textarea") return true
  
    if (el.isContentEditable) return true
  
    return false
}

