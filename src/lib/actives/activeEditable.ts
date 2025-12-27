
export class ActiveEditable {
  private static active: HTMLElement | null = null

  static setActiveEditable(el:HTMLElement| null): void {
    this.active = el
  }

  static getActiveEditable(): HTMLElement | null{
    return this.active
  }
}