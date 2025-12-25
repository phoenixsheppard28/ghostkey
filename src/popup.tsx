import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div style={{ width: "150px" }}>
      <h1>
        Welcome to Email-llm!
      </h1>
      <h4>
        if you're just starting out, check out our {" "}
        <a
          href="chrome-extension://hcoeajiofhoifjklbclambdgnahafihp/tabs/quickstart.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          quickstart guide!
        </a>
      </h4>
      <p></p>
    </div>
  )
}

export default IndexPopup
