"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Heart, Flag, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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

export default function CommunityClientPage() {
  const [activeTab, setActiveTab] = useState("all")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -z-10 w-full max-w-lg h-40 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-[100px] top-0 left-1/2 -translate-x-1/2"></div>
          <h1 className="text-3xl font-bold mb-6 font-space neon-text">社区讨论</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 glass-effect">
                <TabsTrigger value="all">全部话题</TabsTrigger>
                <TabsTrigger value="hot">热门讨论</TabsTrigger>
                <TabsTrigger value="new">最新话题</TabsTrigger>
                <TabsTrigger value="following">我的关注</TabsTrigger>
              </TabsList>

              <motion.div
                className="my-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="glass-effect border border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-lg font-space">发起新话题</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input
                        placeholder="话题标题"
                        className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
                      />
                      <Textarea
                        placeholder="分享您的观点..."
                        rows={4}
                        className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
                      />
                      <Input
                        placeholder="添加标签，用逗号分隔"
                        className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
                      />
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      className={cn(
                        "bg-primary hover:bg-primary/90 transition-all",
                        "text-primary-foreground/80 hover:text-primary-foreground/90",
                      )}
                    >
                      发布话题
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <TabsContent value="all" className="space-y-6">
                <motion.div variants={container} initial="hidden" animate="show">
                  {communityPosts.map((post) => (
                    <motion.div key={post.id} variants={item}>
                      <Card className="glass-effect hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                              <Button key={tag} variant="outline" size="sm" className="relative overflow-hidden group">
                                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
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
                          <Button variant="outline" size="sm" className="ml-auto relative overflow-hidden group">
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            查看详情
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="hot" className="space-y-6">
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">热门讨论内容加载中...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">最新话题内容加载中...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <Card className="glass-effect">
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">请先登录查看您关注的话题</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="glass-effect overflow-hidden">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <CardTitle className="flex items-center gap-2 font-space">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  热门话题
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.ul className="space-y-3" variants={container} initial="hidden" animate="show">
                  {trendingTopics.map((topic) => (
                    <motion.li key={topic.id} variants={item}>
                      <Button variant="ghost" className="w-full justify-between relative overflow-hidden group" asChild>
                        <Link href={`/community/topic/${topic.id}`}>
                          <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span>#{topic.name}</span>
                          <span className="text-muted-foreground text-sm">{topic.count}</span>
                        </Link>
                      </Button>
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  查看更多话题
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6 glass-effect overflow-hidden">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
                <CardTitle className="font-space">社区规则</CardTitle>
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
                <Button variant="link" className="w-full text-primary">
                  查看完整规则
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

