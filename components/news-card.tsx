import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import type { News } from "@/lib/api-types"

interface NewsCardProps {
  news: News[]
}

export function NewsCard({ news }: NewsCardProps) {
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
              <Badge
                variant={
                  item.sentiment === "positive"
                    ? "default"
                    : item.sentiment === "negative"
                      ? "destructive"
                      : "secondary"
                }
              >
                {item.sentiment === "positive" ? "正面" : item.sentiment === "negative" ? "负面" : "中性"}
              </Badge>
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

