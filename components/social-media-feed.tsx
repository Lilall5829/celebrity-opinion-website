import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageSquare, Heart, Share2 } from "lucide-react"
import type { SocialMediaPost } from "@/lib/api-types"

interface SocialMediaFeedProps {
  posts: SocialMediaPost[]
}

export function SocialMediaFeed({ posts }: SocialMediaFeedProps) {
  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={post.avatar_url} alt={post.display_name} />
                <AvatarFallback>{post.display_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{post.display_name}</div>
                <div className="text-sm text-muted-foreground">
                  @{post.username} · {post.platform}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter className="text-muted-foreground text-sm border-t pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>{post.shares.toLocaleString()}</span>
                </div>
              </div>
              <div className="ml-auto">{post.date}</div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">暂无社交媒体动态</CardContent>
        </Card>
      )}
    </div>
  )
}

