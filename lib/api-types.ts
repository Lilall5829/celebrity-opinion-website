// 基础响应类型
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 分页响应类型
export interface PaginatedResponse<T> {
  total: number
  current_page: number
  page_size: number
  total_pages: number
  data: T[]
}

// 名人基本信息类型
export interface Celebrity {
  id: string
  name: string
  english_name?: string
  profession: string
  nationality: string
  image_url: string
  bio: string
  keywords: string[]
}

// 舆论趋势数据点
export interface OpinionTrendPoint {
  date: string
  positive: number
  negative: number
  neutral: number
}

// 新闻类型
export interface News {
  id: string
  title: string
  source: string
  date: string
  summary: string
  url: string
  sentiment: "positive" | "negative" | "neutral"
}

// 社交媒体帖子类型
export interface SocialMediaPost {
  id: string
  platform: string
  username: string
  display_name: string
  avatar_url: string
  content: string
  date: string
  likes: number
  comments: number
  shares: number
}

// 用户类型
export interface User {
  id: string
  name: string
  email: string
  avatar_url: string
  join_date: string
}

// 社区帖子类型
export interface CommunityPost {
  id: string
  title: string
  author: {
    id: string
    name: string
    username: string
    avatar_url: string
  }
  content: string
  date: string
  likes: number
  comments: number
  tags: string[]
}

// 用户收藏类型
export interface Favorite {
  id: string
  name: string
  profession: string
  image_url: string
}

// 浏览历史类型
export interface BrowsingHistory {
  id: string
  name: string
  time: string
}

// 社区活动类型
export interface CommunityActivity {
  id: string
  type: "comment" | "like"
  topic: string
  time: string
}

