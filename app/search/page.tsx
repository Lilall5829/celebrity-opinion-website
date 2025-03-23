import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { searchCelebrities } from "@/lib/api"

// 修改搜索结果页面的标题
export const metadata: Metadata = {
  title: "搜索结果 - 观星台StarScrope",
  description: "查找您感兴趣的名人、政要等公众人物",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; page?: string }
}) {
  const query = searchParams.q || ""
  const page = Number.parseInt(searchParams.page || "1", 10)

  if (!query) {
    return (
      <main className="flex min-h-screen flex-col">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">搜索结果</h1>
          <div className="text-center py-12">
            <p className="text-muted-foreground">请输入搜索关键词</p>
          </div>
        </div>
      </main>
    )
  }

  const response = await searchCelebrities(query, page)
  const { data: celebrities, total, current_page, total_pages } = response.data

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">搜索结果</h1>
        <p className="text-muted-foreground mb-6">
          关键词 "{query}" 共找到 {total} 个结果
        </p>

        {celebrities.length > 0 ? (
          <div className="space-y-4">
            {celebrities.map((celebrity) => (
              <Link href={`/celebrity/${celebrity.id}`} key={celebrity.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={celebrity.image_url} alt={celebrity.name} />
                      <AvatarFallback>{celebrity.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold">{celebrity.name}</h2>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge>{celebrity.profession}</Badge>
                        <Badge variant="outline">{celebrity.nationality}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{celebrity.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">未找到相关人物，请尝试其他关键词</p>
          </div>
        )}

        {total_pages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/search?q=${encodeURIComponent(query)}&page=${pageNum}`}
                className={`px-4 py-2 rounded-md ${
                  pageNum === current_page ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {pageNum}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

