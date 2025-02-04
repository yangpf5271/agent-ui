"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useChatActions from "@/hooks/playground/useChatActions"
import { usePlaygroundStore } from "@/stores/PlaygroundStore"
import { useEffect } from "react"

interface Agent {
  value: string
  label: string
}

export function AgentSelector() {
  const [open, setOpen] = React.useState(false)
  const [agents, setAgents] = React.useState<Agent[]>([])
  const selectedAgent = usePlaygroundStore((state) => state.selectedAgent)
  const setSelectedAgent = usePlaygroundStore((state) => state.setSelectedAgent)
  const { getAgents } = useChatActions()

  // Fetch agents when the component mounts
  useEffect(() => {
    const fetchAgents = async () => {
      const result: Agent[] = await getAgents()
      setAgents(result)
    }
    fetchAgents()
  }, [getAgents])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedAgent
            ? agents.find((agent) => agent.value === selectedAgent)?.label ||
              "Select agent..."
            : "Select agent..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search agent..." />
          <CommandList>
            <CommandEmpty>No agent found.</CommandEmpty>
            <CommandGroup>
              {agents.map((agent, index) => (
                <CommandItem
                  key={`${agent.value}-${index}`}
                  value={agent.value}
                  onSelect={(value) => {
                    // When selecting, update the global selected agent.
                    setSelectedAgent(value === selectedAgent ? "" : value)
                    setOpen(false)
                  }}
                >
                  {agent.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedAgent === agent.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 