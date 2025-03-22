import type {
  ApiResponse,
  PaginatedResponse,
  Celebrity,
  OpinionTrendPoint,
  News,
  SocialMediaPost,
  User,
  CommunityPost,
  Favorite,
  BrowsingHistory,
  CommunityActivity,
} from "./api-types"

// 设置API基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.celebrity-opinion.example.com/api/v1"

// 通用请求函数
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
    },
  }

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "API请求失败")
  }

  return response.json()
}

// 获取认证令牌
function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

// 根据图片中的API规范实现以下接口

// 1. 获取名人信息 - /api/v1/celebrity/{name}
export async function getCelebrityInfo(name: string): Promise<
  ApiResponse<{
    celebrity: Celebrity
    trends: OpinionTrendPoint[]
    news: News[]
  }>
> {
  return fetchApi<
    ApiResponse<{
      celebrity: Celebrity
      trends: OpinionTrendPoint[]
      news: News[]
    }>
  >(`/celebrity/${encodeURIComponent(name)}`)
}

// 2. 获取热门名人排行榜 - /api/v1/celebrity/trending
export async function getTrendingCelebrities(): Promise<ApiResponse<Celebrity[]>> {
  return fetchApi<ApiResponse<Celebrity[]>>(`/celebrity/trending`)
}

// 3. 获取名人最新新闻 - /api/v1/news/{name}
export async function getCelebrityLatestNews(name: string): Promise<ApiResponse<News[]>> {
  return fetchApi<ApiResponse<News[]>>(`/news/${encodeURIComponent(name)}`)
}

// 4. 搜索名人 - /api/v1/search?query={keyword}
export async function searchCelebrities(
  keyword: string,
  page = 1,
  pageSize = 10,
): Promise<ApiResponse<PaginatedResponse<Celebrity>>> {
  return fetchApi<ApiResponse<PaginatedResponse<Celebrity>>>(
    `/search?query=${encodeURIComponent(keyword)}&page=${page}&page_size=${pageSize}`,
  )
}

// 5. 用户注册 - /api/v1/user/register
export async function registerUser(
  email: string,
  password: string,
  name: string,
): Promise<ApiResponse<{ token: string; user: User }>> {
  return fetchApi<ApiResponse<{ token: string; user: User }>>(`/user/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  })
}

// 6. 用户登录 - /api/v1/user/login
export async function loginUser(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
  return fetchApi<ApiResponse<{ token: string; user: User }>>(`/user/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

// 7. 获取用户信息 - /api/v1/user/profile
export async function getUserProfile(): Promise<ApiResponse<User>> {
  return fetchApi<ApiResponse<User>>(`/user/profile`)
}

// 8. 用户登出 - /api/v1/user/logout
export async function logoutUser(): Promise<ApiResponse<{ success: boolean }>> {
  return fetchApi<ApiResponse<{ success: boolean }>>(`/user/logout`, {
    method: "POST",
  })
}

// 以下是额外的API，用于支持现有代码中的功能

// 获取名人详情
export async function getCelebrityDetails(id: string): Promise<ApiResponse<Celebrity>> {
  return fetchApi<ApiResponse<Celebrity>>(`/celebrity/${id}`)
}

// 获取名人舆论趋势
export async function getCelebrityOpinionTrends(
  id: string,
  period: "week" | "month" | "year" = "month",
): Promise<ApiResponse<OpinionTrendPoint[]>> {
  return fetchApi<ApiResponse<OpinionTrendPoint[]>>(`/celebrity/${id}/trends?period=${period}`)
}

// 获取名人相关新闻
export async function getCelebrityNews(
  id: string,
  page = 1,
  pageSize = 10,
): Promise<ApiResponse<PaginatedResponse<News>>> {
  return fetchApi<ApiResponse<PaginatedResponse<News>>>(`/celebrity/${id}/news?page=${page}&page_size=${pageSize}`)
}

// 获取名人社交媒体动态
export async function getCelebritySocialMedia(
  id: string,
  page = 1,
  pageSize = 10,
): Promise<ApiResponse<PaginatedResponse<SocialMediaPost>>> {
  return fetchApi<ApiResponse<PaginatedResponse<SocialMediaPost>>>(
    `/celebrity/${id}/social-media?page=${page}&page_size=${pageSize}`,
  )
}

// 获取相关名人
export async function getRelatedCelebrities(id: string): Promise<ApiResponse<Celebrity[]>> {
  return fetchApi<ApiResponse<Celebrity[]>>(`/celebrity/${id}/related`)
}

// 获取搜索建议
export async function getSearchSuggestions(query: string): Promise<ApiResponse<Celebrity[]>> {
  return fetchApi<ApiResponse<Celebrity[]>>(`/search/suggestions?q=${encodeURIComponent(query)}`)
}

// 更新用户个人信息
export async function updateUserProfile(
  data: Partial<{ name: string; email: string; avatar_url: string }>,
): Promise<ApiResponse<User>> {
  return fetchApi<ApiResponse<User>>(`/user/profile`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// 更新用户密码
export async function updateUserPassword(
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse<{ success: boolean }>> {
  return fetchApi<ApiResponse<{ success: boolean }>>(`/user/password`, {
    method: "PUT",
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  })
}

// 获取用户收藏
export async function getUserFavorites(page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Favorite>>> {
  return fetchApi<ApiResponse<PaginatedResponse<Favorite>>>(`/user/favorites?page=${page}&page_size=${pageSize}`)
}

// 添加收藏
export async function addFavorite(celebrityId: string): Promise<ApiResponse<{ success: boolean }>> {
  return fetchApi<ApiResponse<{ success: boolean }>>(`/user/favorites`, {
    method: "POST",
    body: JSON.stringify({ celebrity_id: celebrityId }),
  })
}

// 删除收藏
export async function removeFavorite(celebrityId: string): Promise<ApiResponse<{ success: boolean }>> {
  return fetchApi<ApiResponse<{ success: boolean }>>(`/user/favorites/${celebrityId}`, {
    method: "DELETE",
  })
}

// 获取浏览历史
export async function getBrowsingHistory(
  page = 1,
  pageSize = 10,
): Promise<ApiResponse<PaginatedResponse<BrowsingHistory>>> {
  return fetchApi<ApiResponse<PaginatedResponse<BrowsingHistory>>>(`/user/history?page=${page}&page_size=${pageSize}`)
}

// 获取社区活动
export async function getCommunityActivity(
  page = 1,
  pageSize = 10,
): Promise<ApiResponse<PaginatedResponse<CommunityActivity>>> {
  return fetchApi<ApiResponse<PaginatedResponse<CommunityActivity>>>(
    `/user/activity?page=${page}&page_size=${pageSize}`,
  )
}

// 获取社区帖子
export async function getCommunityPosts(
  type: "all" | "hot" | "new" | "following" = "all",
  page = 1,
  pageSize = 10,
): Promise<ApiResponse<PaginatedResponse<CommunityPost>>> {
  return fetchApi<ApiResponse<PaginatedResponse<CommunityPost>>>(
    `/community/posts?type=${type}&page=${page}&page_size=${pageSize}`,
  )
}

// 获取热门话题
export async function getTrendingTopics(
  limit = 5,
): Promise<ApiResponse<{ id: string; name: string; count: number }[]>> {
  return fetchApi<ApiResponse<{ id: string; name: string; count: number }[]>>(
    `/community/trending-topics?limit=${limit}`,
  )
}

// 创建社区帖子
export async function createCommunityPost(data: { title: string; content: string; tags: string[] }): Promise<
  ApiResponse<CommunityPost>
> {
  return fetchApi<ApiResponse<CommunityPost>>(`/community/posts`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// 点赞社区帖子
export async function likeCommunityPost(postId: string): Promise<ApiResponse<{ success: boolean }>> {
  return fetchApi<ApiResponse<{ success: boolean }>>(`/community/posts/${postId}/like`, {
    method: "POST",
  })
}

// 获取分类数据
export async function getProfessionCategories(): Promise<ApiResponse<{ id: string; name: string }[]>> {
  return fetchApi<ApiResponse<{ id: string; name: string }[]>>(`/categories/professions`)
}

export async function getNationalityCategories(): Promise<ApiResponse<{ id: string; name: string }[]>> {
  return fetchApi<ApiResponse<{ id: string; name: string }[]>>(`/categories/nationalities`)
}

// 按分类获取名人
export async function getCelebritiesByCategory(
  type: "profession" | "nationality",
  categoryId: string,
  page = 1,
  pageSize = 10,
): Promise<ApiResponse<PaginatedResponse<Celebrity>>> {
  return fetchApi<ApiResponse<PaginatedResponse<Celebrity>>>(
    `/categories/${type}/${categoryId}/celebrities?page=${page}&page_size=${pageSize}`,
  )
}

