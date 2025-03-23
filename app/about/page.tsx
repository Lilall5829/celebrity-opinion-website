"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, TrendingUp, Users, BarChart4, Newspaper, Globe, Shield } from "lucide-react"

export default function AboutPage() {
  // 使用普通的CSS过渡效果代替Framer Motion
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 在组件挂载后设置加载状态
    setIsLoaded(true)
  }, [])

  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "名人搜索",
      description: "快速搜索明星、政要等公众人物，获取其基本信息和最新动态。",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "舆论趋势",
      description: "通过数据可视化展示名人舆论变化趋势，直观了解公众评价走向。",
    },
    {
      icon: <Newspaper className="h-8 w-8 text-primary" />,
      title: "新闻摘要",
      description: "汇总相关新闻报道，提供简明摘要，快速了解最新动态。",
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-primary" />,
      title: "热度排行",
      description: "实时更新的名人热度排行榜，掌握当下最受关注的公众人物。",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "分类浏览",
      description: "按职业、国籍等多维度分类，轻松发现感兴趣的公众人物。",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "社区讨论",
      description: "参与关于名人的热门话题讨论，分享观点，与其他用户互动交流。",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-12">
        {/* 页面标题 */}
        <div
          className={`relative text-center mb-16 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute -z-10 w-full max-w-lg h-40 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-[100px] top-0 left-1/2 -translate-x-1/2"></div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-space mb-4">
            <span className="neon-text">关于观星台</span>
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl text-muted-foreground">了解观星台StarScrope的使命与功能</p>
        </div>

        {/* 网站介绍 */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-2xl font-space">网站简介</CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-4">
              <p>
                观星台StarScrope是一个基于互联网的名人舆论查询网站，用户可以搜索明星、政要等公众人物，查看其舆论趋势、相关新闻摘要以及公众关注度排行。
              </p>
              <p>
                网站提供分类浏览、排行榜、社区讨论等功能，帮助用户快速获取相关信息，并参与互动讨论。通过数据分析和可视化展示，我们致力于为用户提供直观、全面的名人舆论信息。
              </p>
              <p>
                无论您是媒体从业者、研究人员，还是对公众人物感兴趣的普通用户，我们的平台都能帮助您更好地了解名人的公众形象和舆论动态。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 我们的使命 */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="glass-effect overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-space">我们的使命</CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold font-space">信息透明</h3>
                  <p>
                    我们致力于提供透明、客观的名人舆论信息，帮助用户了解公众人物的真实形象，减少信息不对称带来的误解。
                  </p>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold font-space">数据驱动</h3>
                  <p>通过大数据分析和人工智能技术，我们对海量信息进行处理和分析，提供基于数据的客观评价和趋势预测。</p>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold font-space">社区互动</h3>
                  <p>我们鼓励用户在尊重他人的前提下，积极参与讨论，分享观点，共同构建一个理性、多元的舆论交流平台。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 核心功能 */}
        <div
          className={`mb-16 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold font-space mb-8 flex items-center">
            <span className="mr-2 inline-block w-1 h-8 bg-primary"></span>
            核心功能
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <Card className="glass-effect h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 font-space">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* 数据来源与隐私 */}
        <div
          className={`mb-16 transition-all duration-700 delay-[1000ms] ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="glass-effect overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-space text-2xl">
                <Shield className="h-6 w-6 text-secondary" />
                数据来源与隐私保护
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                我们的数据来源于公开的新闻媒体、社交平台和互联网信息，通过技术手段进行收集、分析和整合。我们尊重原创内容，所有引用均标明来源。
              </p>
              <p>
                我们高度重视用户隐私保护，严格遵守相关法律法规，采取多重措施保护用户数据安全。我们不会未经许可收集用户个人敏感信息，也不会将用户数据用于商业目的。
              </p>
              <p>如果您对我们的数据来源或隐私政策有任何疑问，请随时联系我们。</p>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <div
          className={`text-center transition-all duration-700 delay-[1100ms] ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl font-bold font-space mb-6">联系我们</h2>
          <p className="mb-6 text-muted-foreground">如果您有任何问题、建议或合作意向，欢迎随时与我们联系</p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">联系我们</Link>
            </Button>
            <Button variant="outline" className="relative overflow-hidden group" asChild>
              <Link href="/community">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                加入社区
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

