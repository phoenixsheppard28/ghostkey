import type { JSX } from "react"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import InlinePopup from "~components/InlinePopup"
import LLMOptionsComponent from "~components/LLMoptions"

export default function IndexOptions(): JSX.Element {
  return ( // should only use mantine prover once, and also can inject style into it there
    <MantineProvider> 
      <LLMOptionsComponent/>
      <InlinePopup onClose={() => {}} />
    </MantineProvider>
  )
}

