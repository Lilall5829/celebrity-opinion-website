import { NewsCard } from "@/components/news-card";
import { OpinionTrendChart } from "@/components/opinion-trend-chart";
import { RelatedCelebrities } from "@/components/related-celebrities";
import { SocialMediaFeed } from "@/components/social-media-feed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCelebrityDetails,
  getCelebrityNews,
  getCelebrityOpinionTrends,
  getCelebritySocialMedia,
  getRelatedCelebrities,
} from "@/lib/api";
import type { Metadata } from "next";
import Image from "next/image";

// 这个函数在构建时运行，用于生成静态元数据
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const response = await getCelebrityDetails(params.id);
    const celebrity = response.data;

    return {
      title: `${celebrity.name} - 名人舆论风评查询`,
      description: `查看${celebrity.name}的舆论趋势、相关新闻及社会影响力`,
    };
  } catch (error) {
    return {
      title: "名人详情 - 名人舆论风评查询",
      description: "查看名人的舆论趋势、相关新闻及社会影响力",
    };
  }
}

export default async function CelebrityPage({
  params,
}: {
  params: { id: string };
}) {
  let celebrity;
  let trends;
  let news;
  let socialMedia;
  let related;

  try {
    // 并行获取所有数据
    const [
      celebrityResponse,
      trendsResponse,
      newsResponse,
      socialMediaResponse,
      relatedResponse,
    ] = await Promise.all([
      getCelebrityDetails(params.id),
      getCelebrityOpinionTrends(params.id),
      getCelebrityNews(params.id),
      getCelebritySocialMedia(params.id),
      getRelatedCelebrities(params.id),
    ]);

    celebrity = celebrityResponse.data;
    trends = trendsResponse.data;
    news = newsResponse.data.data;
    socialMedia = socialMediaResponse.data.data;
    related = relatedResponse.data;
  } catch (error) {
    // 如果在开发环境中，使用模拟数据
    if (process.env.NODE_ENV === "development") {
      celebrity = {
        id: params.id,
        name: "马斯克",
        english_name: "Elon Musk",
        profession: "企业家",
        nationality: "美国",
        image_url: "/placeholder.svg?height=80&width=80",
        bio: "特斯拉和SpaceX CEO",
        keywords: ["科技", "创新", "电动车"],
      };
      trends = [
        { date: "2024-01", value: 75, sentiment: "positive" },
        { date: "2024-02", value: 82, sentiment: "positive" },
        { date: "2024-03", value: 78, sentiment: "neutral" },
      ];
      news = [];
      socialMedia = [];
      related = [];
    } else {
      throw error;
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar with celebrity info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src={celebrity.image_url || "/placeholder.svg"}
                      alt={celebrity.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h1 className="text-2xl font-bold">{celebrity.name}</h1>
                  {celebrity.english_name && (
                    <p className="text-muted-foreground">
                      {celebrity.english_name}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    <Badge>{celebrity.profession}</Badge>
                    <Badge variant="outline">{celebrity.nationality}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="font-semibold mb-2">简介</h2>
                    <p className="text-sm">{celebrity.bio}</p>
                  </div>

                  <div>
                    <h2 className="font-semibold mb-2">关键词</h2>
                    <div className="flex flex-wrap gap-2">
                      {celebrity.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <RelatedCelebrities celebrities={related} />
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="trends">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trends">舆论趋势</TabsTrigger>
                <TabsTrigger value="news">相关新闻</TabsTrigger>
                <TabsTrigger value="social">社交媒体</TabsTrigger>
              </TabsList>
              <TabsContent value="trends" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>舆论趋势分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OpinionTrendChart data={trends} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="news" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">最新相关新闻</h2>
                  <NewsCard news={news} />
                </div>
              </TabsContent>
              <TabsContent value="social" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">社交媒体动态</h2>
                  <SocialMediaFeed posts={socialMedia} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
