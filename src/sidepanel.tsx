  import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import  { useStorage } from "@plasmohq/storage/hook" // for chat 


function Sidebar() {

  // will need to load chat history that was stored in storage before we load the chat 
  // todo, draw out the damn architecture diagram 
 return (
    <div
    style={{
    display: "flex",
      flexDirection: "column",
      padding: 0
    }}>
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
 )
}

export default Sidebar