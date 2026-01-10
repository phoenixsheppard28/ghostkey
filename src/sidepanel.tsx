import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { FaGear } from "react-icons/fa6";
import { MantineProvider } from "@mantine/core"
import { GRAPE_MANTINE_THEME } from "~styles/MantineStyles"
import type { JSX } from "react";


export default function Sidebar(): JSX.Element {

  // will need to load chat history that was stored in storage before we load the chat 
  // todo, draw out the damn architecture diagram 
  const [optionsUrl, setOptionsUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!chrome?.runtime?.id) return
    setOptionsUrl(chrome.runtime.getURL("options.html"))
  }, []) // dont know if its seccesary but we keep it anyways
    


  // const original_side_panael_url = chrome.runtime.getURL("sidepanel.html")

 return (
  <MantineProvider theme={GRAPE_MANTINE_THEME}>
    <div
    style={{
    display: "flex",
      flexDirection: "column",
      padding: 0
    }}>
      <div className="settings-icon">
        <a href={optionsUrl} target="_blank"> 
          <FaGear />
        </a>
      </div>
    <h2>
      Welcome to Ghostkey!
      <p>This is a tool that lets you use ai on any website</p>
      <p></p>
    </h2>
  </div>
  </MantineProvider>
 )
}
