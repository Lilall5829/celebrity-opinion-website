"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSearchSuggestions } from "@/lib/api";
import type { Celebrity } from "@/lib/api-types";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";

// 模拟数据，当API调用失败时使用
const mockSuggestions: Celebrity[] = [
  {
    id: "1",
    name: "马斯克",
    english_name: "Elon Musk",
    profession: "企业家",
    nationality: "美国",
    image_url: "/placeholder.svg?height=80&width=80",
    bio: "特斯拉和SpaceX CEO",
    keywords: ["科技", "创新", "电动车"],
  },
  {
    id: "2",
    name: "泰勒·斯威夫特",
    english_name: "Taylor Swift",
    profession: "歌手",
    nationality: "美国",
    image_url: "/placeholder.svg?height=80&width=80",
    bio: "美国流行音乐歌手",
    keywords: ["音乐", "流行", "演唱会"],
  },
  {
    id: "3",
    name: "姚明",
    english_name: "Yao Ming",
    profession: "运动员",
    nationality: "中国",
    image_url: "/placeholder.svg?height=80&width=80",
    bio: "前NBA球星，中国篮协主席",
    keywords: ["篮球", "体育", "慈善"],
  },
  {
    id: "4",
    name: "刘德华",
    english_name: "Andy Lau",
    profession: "演员",
    nationality: "中国香港",
    image_url: "/placeholder.svg?height=80&width=80",
    bio: "香港著名演员、歌手",
    keywords: ["电影", "音乐", "慈善"],
  },
  {
    id: "5",
    name: "成龙",
    english_name: "Jackie Chan",
    profession: "演员",
    nationality: "中国香港",
    image_url: "/placeholder.svg?height=80&width=80",
    bio: "功夫电影明星",
    keywords: ["功夫", "电影", "动作"],
  },
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        // 尝试从API获取建议
        const response = await getSearchSuggestions(query);
        if (!response || !response.data) {
          throw new Error("Invalid API response");
        }
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        // 当API调用失败时，使用模拟数据并根据查询进行过滤
        const filteredMockData = mockSuggestions.filter(
          (celebrity) =>
            celebrity.name.toLowerCase().includes(query.toLowerCase()) ||
            (celebrity.english_name &&
              celebrity.english_name
                .toLowerCase()
                .includes(query.toLowerCase())) ||
            celebrity.profession.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredMockData);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    // 点击外部区域时关闭建议框
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    setShowSuggestions(false);
    router.push(`/celebrity/${id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full items-center"
      >
        <Input
          type="text"
          placeholder="搜索名人、政要、公众人物..."
          className="pr-10 h-14 text-base bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 transition-all rounded-full pl-6"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1 h-12 w-12 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">搜索</span>
        </Button>
      </form>

      {/* 搜索建议下拉框 */}
      <AnimatePresence>
        {showSuggestions &&
          (query.trim().length >= 2 || suggestions.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg overflow-hidden"
            >
              <div className="p-2">
                <div className="text-sm font-medium text-muted-foreground px-3 py-2">
                  {loading ? "搜索中..." : ""}
                </div>

                {loading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                  </div>
                )}

                {!loading &&
                  suggestions.length === 0 &&
                  query.trim().length >= 2 && (
                    <div className="px-3 py-6 text-center text-muted-foreground">
                      未找到相关人物
                    </div>
                  )}

                {suggestions.length > 0 && (
                  <div className="max-h-[300px] overflow-y-auto">
                    {suggestions.map((item, index) => (
                      <div
                        key={item.id}
                        className="px-3 py-2 hover:bg-primary/10 rounded-md cursor-pointer transition-colors"
                        onClick={() => handleSelect(item.id)}
                      >
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.profession}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {query.trim().length >= 2 && (
                  <div className="border-t border-border/50 mt-2 pt-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        if (query.trim()) {
                          setShowSuggestions(false);
                          router.push(`/search?q=${encodeURIComponent(query)}`);
                        }
                      }}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      搜索 "{query}"
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}
