import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import type { News } from "@/lib/api-types"
import { cn } from "@/lib/utils"
import { CustomTooltip } from "@/components/custom-tooltip"

interface NewsCardProps {
  news: News[]
}

export function NewsCard({ news }: NewsCardProps) {
  // 根据舆论倾向获取背景色类名
  const getSentimentBgClass = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500 text-white"
      case "negative":
        return "bg-red-500 text-white"
      case "neutral":
      default:
        return "bg-gray-500 text-white"
    }
  }

  // 根据舆论倾向获取提示文本
  const getSentimentTooltip = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "数字代表舆论热度变化幅度，绿色表示正面舆论占主导"
      case "negative":
        return "数字代表舆论热度变化幅度，红色表示负面舆论占主导"
      case "neutral":
      default:
        return "数字代表舆论热度变化幅度，灰色表示中性舆论占主导"
    }
  }

  return (
    <div className="space-y-4">
      {news.length > 0 ? (
        news.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>{item.source}</span>
                <span>{item.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{item.summary}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <CustomTooltip text={getSentimentTooltip(item.sentiment)}>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium cursor-help",
                    getSentimentBgClass(item.sentiment),
                  )}
                >
                  {item.sentiment === "positive" ? "正面" : item.sentiment === "negative" ? "负面" : "中性"}
                </div>
              </CustomTooltip>
              <Link
                href={item.url}
                className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                阅读全文 <ExternalLink className="h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">暂无相关新闻</CardContent>
        </Card>
      )}
    </div>
  )
}

