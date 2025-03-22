import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Clock, Heart, History, MessageSquare, Settings, User } from "lucide-react"

export const metadata: Metadata = {
  title: "用户中心 - 名人舆论风评查询网站",
  description: "管理您的个人信息、收藏和浏览历史",
}

// Mock user data
const userData = {
  name: "用户123456",
  email: "user123456@example.com",
  avatarUrl: "/placeholder.svg?height=100&width=100",
  joinDate: "2023-10-15",
}

// Mock favorites data
const favoriteCelebrities = [
  {
    id: "1",
    name: "马斯克",
    profession: "企业家",
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "泰勒·斯威夫特",
    profession: "歌手",
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
]

// Mock history data
const browsingHistory = [
  {
    id: "1",
    name: "马斯克",
    time: "今天 14:30",
  },
  {
    id: "3",
    name: "姚明",
    time: "今天 11:15",
  },
  {
    id: "5",
    name: "成龙",
    time: "昨天 18:45",
  },
]

// Mock community activity
const communityActivity = [
  {
    id: "1",
    type: "comment",
    topic: "马斯克收购Twitter后的变化讨论",
    time: "3天前",
  },
  {
    id: "2",
    type: "like",
    topic: "泰勒·斯威夫特的社会影响力分析",
    time: "4天前",
  },
]

export default function UserPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">用户中心</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">个人信息</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">我的收藏</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">浏览历史</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">社区互动</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>个人资料</CardTitle>
                  <CardDescription>查看和更新您的个人信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-center sm:text-left">
                      <h3 className="text-xl font-semibold">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                      <p className="text-sm text-muted-foreground">注册时间: {userData.joinDate}</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        更换头像
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">用户名</Label>
                      <Input id="name" defaultValue={userData.name} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">邮箱</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    <Button>保存更改</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    账号设置
                  </CardTitle>
                  <CardDescription>管理您的账号安全和隐私设置</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">当前密码</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">新密码</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">确认新密码</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>更新密码</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  我的收藏
                </CardTitle>
                <CardDescription>您收藏的名人和话题</CardDescription>
              </CardHeader>
              <CardContent>
                {favoriteCelebrities.length > 0 ? (
                  <div className="space-y-4">
                    {favoriteCelebrities.map((celebrity) => (
                      <div
                        key={celebrity.id}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={celebrity.imageUrl} alt={celebrity.name} />
                            <AvatarFallback>{celebrity.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{celebrity.name}</div>
                            <div className="text-sm text-muted-foreground">{celebrity.profession}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">您还没有收藏任何名人或话题</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  浏览历史
                </CardTitle>
                <CardDescription>您最近查看的名人和话题</CardDescription>
              </CardHeader>
              <CardContent>
                {browsingHistory.length > 0 ? (
                  <div className="space-y-2">
                    {browsingHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-md hover:bg-muted">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{item.name}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{item.time}</span>
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">暂无浏览历史记录</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  社区互动
                </CardTitle>
                <CardDescription>您在社区的互动记录</CardDescription>
              </CardHeader>
              <CardContent>
                {communityActivity.length > 0 ? (
                  <div className="space-y-2">
                    {communityActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted"
                      >
                        <div className="flex items-center gap-2">
                          {activity.type === "comment" ? (
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Heart className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <div className="text-sm">
                              {activity.type === "comment" ? "评论了" : "点赞了"}
                              <span className="font-medium"> {activity.topic}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">暂无社区互动记录</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

