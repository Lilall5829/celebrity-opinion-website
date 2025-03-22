"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { getSearchSuggestions } from "@/lib/api"
import type { Celebrity } from "@/lib/api-types"

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Celebrity[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        const response = await getSearchSuggestions(query)
        setSuggestions(response.data)
      } catch (error) {
        console.error("Error fetching search suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSelect = (id: string) => {
    setOpen(false)
    router.push(`/celebrity/${id}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative flex w-full items-center">
        <Input
          type="text"
          placeholder="搜索名人、政要、公众人物..."
          className="pr-10 h-12 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
        />
        <Button type="submit" size="icon" className="absolute right-0 top-0 h-full rounded-l-none">
          <Search className="h-5 w-5" />
          <span className="sr-only">搜索</span>
        </Button>
      </form>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜索名人、政要、公众人物..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>{loading ? "搜索中..." : "未找到相关人物"}</CommandEmpty>
          <CommandGroup heading="推荐人物">
            {suggestions.map((item) => (
              <CommandItem key={item.id} onSelect={() => handleSelect(item.id)}>
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.profession}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

