import type { Root } from "react-dom/client"

export interface PopupInstance {
  container: HTMLElement
  shadowRoot: ShadowRoot
  root: Root
}

export class ActivePopup {
  private static instance: PopupInstance | null = null

  static set(popup: PopupInstance | null):void  {
    this.instance = popup
  }

  static get(): PopupInstance | null {
    return this.instance
  }

  static focus(): void {
    if (this.instance) {
      const input = this.instance.shadowRoot.querySelector("input")
      if (input) {
        input.focus()
      }
    }
  }

  static exists(): boolean {
    // Check if instance exists AND is still in the DOM
    if (this.instance && this.instance.container.isConnected) {
      return true
    }
    // Clear stale reference if container was removed from DOM
    if (this.instance) {
      this.instance = null
    }
    return false
  }
}
