import "~style.css"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import  { useStorage } from "@plasmohq/storage/hook" // for chat 
import { FaGear } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { MantineProvider } from "@mantine/core"



function Sidebar() {

  // will need to load chat history that was stored in storage before we load the chat 
  // todo, draw out the damn architecture diagram 
  const options_url = chrome.runtime.getURL("options.html")
  const original_side_panael_url = chrome.runtime.getURL("sidepanel.html")

 return (
  <MantineProvider>
    <div
    style={{
    display: "flex",
      flexDirection: "column",
      padding: 0
    }}>
      <div className="settings-icon">
        <a href={options_url} target="_blank"> 
          <FaGear />
        </a>
      </div>
    <h2>
      Welcome to your
      <a href="https://www.plasmo.com" target="_blank">
        {" "}
        Plasmo
      </a>{" "}
      Extension!
    </h2>
    <a href="https://docs.plasmo.com" target="_blank">
      View Docs
    </a>
  </div>
  </MantineProvider>
 )
}

export default Sidebar