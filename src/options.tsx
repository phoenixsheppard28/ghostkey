import LLMOptionsComponent from "~components/LLMoptions"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"

export default function IndexOptions() {
  return ( // should only use mantine prover once, and also can inject style into it there
    <MantineProvider> 
      <LLMOptionsComponent/>
    </MantineProvider>
  )
}

