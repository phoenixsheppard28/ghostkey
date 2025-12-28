import type { JSX } from "react"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import LLMOptionsComponent from "~components/LLMoptions"
import { GRAPE_MANTINE_THEME } from "~styles/MantineStyles"

export default function IndexOptions(): JSX.Element {
  return ( // should only use mantine prover once, and also can inject style into it there
    <MantineProvider theme={GRAPE_MANTINE_THEME}> 
      <LLMOptionsComponent/>
    </MantineProvider>
  )
}

