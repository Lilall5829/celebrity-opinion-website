"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowUp, ArrowDown, Minus } from "lucide-react"
import type { Celebrity } from "@/lib/api-types"

interface TrendingCelebrity extends Celebrity {
  trend: "up" | "down" | "neutral"
  trendPercentage: number
  sentiment: "positive" | "negative" | "neutral"
}

export function TrendingCelebrities() {
  const [celebrities, setCelebrities] = useState<TrendingCelebrity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Mock data for trending celebrities
      const mockCelebrities: TrendingCelebrity[] = [
        {
          id: "1",
          name: "马斯克",
          english_name: "Elon Musk",
          profession: "企业家",
          nationality: "美国",
          image_url: "/placeholder.svg?height=80&width=80",
          bio: "特斯拉和SpaceX CEO",
          keywords: ["科技", "创新", "电动车"],
          trend: "up",
          trendPercentage: 12,
          sentiment: "positive",
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
          trend: "up",
          trendPercentage: 8,
          sentiment: "positive",
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
          trend: "neutral",
          trendPercentage: 2,
          sentiment: "neutral",
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
          trend: "up",
          trendPercentage: 5,
          sentiment: "positive",
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
          trend: "down",
          trendPercentage: 3,
          sentiment: "negative",
        },
        {
          id: "6",
          name: "马云",
          english_name: "Jack Ma",
          profession: "企业家",
          nationality: "中国",
          image_url: "/placeholder.svg?height=80&width=80",
          bio: "阿里巴巴创始人",
          keywords: ["电商", "科技", "创业"],
          trend: "up",
          trendPercentage: 7,
          sentiment: "positive",
        },
        {
          id: "7",
          name: "周杰伦",
          english_name: "Jay Chou",
          profession: "歌手",
          nationality: "中国台湾",
          image_url: "/placeholder.svg?height=80&width=80",
          bio: "华语流行乐坛天王",
          keywords: ["音乐", "流行", "创作"],
          trend: "neutral",
          trendPercentage: 1,
          sentiment: "neutral",
        },
        {
          id: "8",
          name: "范冰冰",
          english_name: "Fan Bingbing",
          profession: "演员",
          nationality: "中国",
          image_url: "/placeholder.svg?height=80&width=80",
          bio: "中国著名女演员",
          keywords: ["电影", "时尚", "演艺"],
          trend: "down",
          trendPercentage: 4,
          sentiment: "negative",
        },
      ]

      setCelebrities(mockCelebrities)
      setLoading(false)
    }, 1000) // Simulate 1 second loading time
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-muted animate-pulse mb-4 mt-4"></div>
              <div className="h-6 w-24 bg-muted animate-pulse mb-2"></div>
              <div className="h-4 w-16 bg-muted animate-pulse mb-2"></div>
              <div className="h-6 w-20 bg-muted animate-pulse mt-auto"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {celebrities.map((celebrity, index) => (
        <Link href={`/celebrity/${celebrity.id}`} key={celebrity.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="absolute top-2 left-2 bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                #{index + 1}
              </div>
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 mt-4">
                <Image
                  src={celebrity.image_url || "/placeholder.svg"}
                  alt={celebrity.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">{celebrity.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{celebrity.profession}</p>
              <div className="flex items-center gap-1 mt-auto">
                <Badge
                  variant={
                    celebrity.sentiment === "positive"
                      ? "default"
                      : celebrity.sentiment === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                  className="flex items-center gap-1"
                >
                  {celebrity.trend === "up" ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : celebrity.trend === "down" ? (
                    <ArrowDown className="h-3 w-3" />
                  ) : (
                    <Minus className="h-3 w-3" />
                  )}
                  {celebrity.trendPercentage}%
                </Badge>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

