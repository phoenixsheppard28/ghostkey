import { createRoot } from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import InlinePopup from "~components/InlinePopup"
import mantineCss from "bundle-text:@mantine/core/styles.css"

export function openInlinePopup(activeEditable: HTMLElement) {
  // slop ahead!
  console.log("detected");

  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.zIndex= "99999999"

  const shadowRoot = container.attachShadow({ mode: "closed" });

  const styleElement = document.createElement("style");
  styleElement.textContent = mantineCss;
  shadowRoot.appendChild(styleElement);

  // Create a container for React to render into
  const reactContainer = document.createElement("div");
  reactContainer.id = "inline-popup-root";
  shadowRoot.appendChild(reactContainer);

  // Insert the container into the DOM
  activeEditable.insertAdjacentElement("beforebegin", container);

  // Create React root and render
  const root = createRoot(reactContainer);

  const handleClose = () => {
    root.unmount();
    container.remove();
  };

  const handleSubmit = (value: string) => {
    console.log("Submitted:", value);
    // TODO: Hook up to LLM here
  };


  root.render(
    <MantineProvider // need this to inject styles into shadow dom
      getRootElement={() => reactContainer}
      cssVariablesSelector="#inline-popup-root"
    >
      <InlinePopup onClose={handleClose} onSubmit={handleSubmit} />
    </MantineProvider>
  );
}
