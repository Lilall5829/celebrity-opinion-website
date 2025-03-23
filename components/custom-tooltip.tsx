"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CustomTooltipProps {
  text: string
  children: React.ReactNode
  className?: string
}

export function CustomTooltip({ text, children, className }: CustomTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div
          className={cn(
            "absolute z-50 p-2 text-xs bg-popover text-popover-foreground rounded-md shadow-md whitespace-nowrap",
            "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2",
            "border border-border",
            className,
          )}
        >
          {text}
          <div className="absolute w-2 h-2 bg-popover rotate-45 border-r border-b border-border -bottom-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
      )}
    </div>
  )
}

