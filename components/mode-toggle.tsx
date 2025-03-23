"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative overflow-hidden group">
          <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-effect">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <span>浅色</span>
          {theme === "light" && (
            <motion.span layoutId="theme-check" className="ml-auto h-4 w-4 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          <span>深色</span>
          {theme === "dark" && (
            <motion.span layoutId="theme-check" className="ml-auto h-4 w-4 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
          <span>系统</span>
          {theme === "system" && (
            <motion.span layoutId="theme-check" className="ml-auto h-4 w-4 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

