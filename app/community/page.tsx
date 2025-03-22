import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Heart, Flag, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "社区 - 名人舆论风评查询网站",
  description: "参与讨论名人舆论相关话题，分享您的观点",
}

// Mock data for community posts
const communityPosts = [
  {
    id: "1",
    title: "马斯克收购Twitter后的变化讨论",
    author: {
      name: "科技观察者",
      username: "techobserver",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    content:
      "自从马斯克收购Twitter并将其改名为X后，平台上发生了哪些重大变化？这些变化对用户体验和内容生态有何影响？欢迎大家分享观点。",
    date: "2天前",
    likes: 128,
    comments: 45,
    tags: ["马斯克", "Twitter", "社交媒体"],
  },
  {
    id: "2",
    title: "泰勒·斯威夫特的社会影响力分析",
    author: {
      name: "音乐评论家",
      username: "musiccritic",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    content:
      "泰勒·斯威夫特不仅是一位成功的音乐人，她在社会议题上的发声也产生了巨大影响。从版权争议到政治表态，她如何运用自己的影响力？",
    date: "3天前",
    likes: 215,
    comments: 67,
    tags: ["泰勒·斯威夫特", "音乐", "社会影响力"],
  },
  {
    id: "3",
    title: "体育明星的商业价值与社会责任",
    author: {
      name: "体育商业",
      username: "sportsbiz",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    content:
      "从姚明到C罗，体育明星的商业价值与日俱增。他们如何平衡商业利益与社会责任？品牌代言与个人形象之间又有怎样的关系？",
    date: "4天前",
    likes: 98,
    comments: 32,
    tags: ["体育明星", "商业价值", "社会责任"],
  },
]

// Mock data for trending topics
const trendingTopics = [
  { id: "1", name: "马斯克与AI安全", count: 1250 },
  { id: "2", name: "泰勒·斯威夫特巡演", count: 980 },
  { id: "3", name: "姚明篮球改革", count: 750 },
  { id: "4", name: "刘德华新电影", count: 620 },
  { id: "5", name: "马云公益事业", count: 580 },
]

export default function CommunityPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">社区讨论</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部话题</TabsTrigger>
                <TabsTrigger value="hot">热门讨论</TabsTrigger>
                <TabsTrigger value="new">最新话题</TabsTrigger>
                <TabsTrigger value="following">我的关注</TabsTrigger>
              </TabsList>

              <div className="my-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">发起新话题</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="话题标题" />
                      <Textarea placeholder="分享您的观点..." rows={4} />
                      <Input placeholder="添加标签，用逗号分隔" />
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>发布话题</Button>
                  </CardFooter>
                </Card>
              </div>

              <TabsContent value="all" className="space-y-6">
                {communityPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {post.author.name} @{post.author.username} · {post.date}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Flag className="h-4 w-4" />
                          <span className="sr-only">举报</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{post.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Button key={tag} variant="outline" size="sm">
                            #{tag}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        查看详情
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="hot" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">热门讨论内容加载中...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">最新话题内容加载中...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">请先登录查看您关注的话题</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  热门话题
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <li key={topic.id}>
                      <Button variant="ghost" className="w-full justify-between" asChild>
                        <Link href={`/community/topic/${topic.id}`}>
                          <span>#{topic.name}</span>
                          <span className="text-muted-foreground text-sm">{topic.count}</span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  查看更多话题
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>社区规则</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>1. 尊重他人，禁止人身攻击</li>
                  <li>2. 禁止发布虚假信息和谣言</li>
                  <li>3. 禁止发布侵犯隐私的内容</li>
                  <li>4. 禁止发布广告和垃圾信息</li>
                  <li>5. 遵守相关法律法规</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full">
                  查看完整规则
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

