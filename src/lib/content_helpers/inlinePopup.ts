export function openInlinePopup(activeEditable: HTMLElement) {
    console.log("detected");
  
    // Create a container div to attach shadow root to
    const container = document.createElement("div");
  
    // Optionally add a class or style to container
    container.style.position = "relative"; // or "absolute" depending on positioning needs
  
    // Attach shadow root (open so you can inspect in devtools; or closed if you want to hide internals)
    const shadowRoot = container.attachShadow({ mode: "closed" });
  
    // Add your popup content inside the shadow DOM
    shadowRoot.innerHTML = `
      <style>
        .popup {
          position: absolute;
          top: 100%; /* below the activeEditable */
          left: 0;
          background: white;
          border: 1px solid #ccc;
          padding: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          z-index: 9999;
          font-size: 14px;
          min-width: 150px;
        }
      </style>
      <div class="popup">
        Inline popup content here!
      </div>
    `;
  
    // Insert the container into the DOM as a sibling of activeEditable or inside it
    // For inline popup, you might want it right after activeEditable:
    activeEditable.insertAdjacentElement("afterend", container);
  
    // Or append inside activeEditable (depends on your use case)
    // activeEditable.appendChild(container);
  
    // Now the popup is rendered isolated inside the Shadow DOM,
    // so its styles won't clash with page styles.
  }
  