"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative flex items-center justify-between gap-2 bg-muted/30 hover:bg-muted/50 transition-colors rounded-lg p-1.5 pl-3 border border-border/50 w-full overflow-hidden">
      <code className="text-[13px] font-mono text-muted-foreground truncate select-all">
        {command}
      </code>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground hover:bg-background/50 shadow-sm"
        onClick={copy}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </Button>
    </div>
  )
}
