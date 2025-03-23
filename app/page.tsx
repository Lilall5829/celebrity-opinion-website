"use client"

import { SearchBar } from "@/components/search-bar"
import { TrendingCelebrities } from "@/components/trending-celebrities"
import { CategorySidebar } from "@/components/category-sidebar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 主要内容区域 */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* 侧边栏 - 在中等及以上屏幕上固定在左侧 */}
        <motion.div
          className="w-full md:w-64 lg:w-72 order-2 md:order-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="md:sticky md:top-20">
            <CategorySidebar />
          </div>
        </motion.div>

        {/* 主内容区域 */}
        <div className="flex-1 order-1 md:order-2">
          {/* 搜索区域 */}
          <motion.div
            className="flex flex-col items-center justify-center py-16 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -z-10 w-full max-w-lg h-40 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-[100px] top-1/2 -translate-y-1/2"></div>

            {/* 修改主页标题 */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-space">
              <span className="neon-text">观星台StarScrope</span>
            </h1>

            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              快速了解公众人物的舆论趋势、相关新闻及社会影响力
            </p>

            <motion.div
              className="mt-10 w-full max-w-2xl neon-border"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <SearchBar />
            </motion.div>
          </motion.div>

          {/* 热门人物区域 */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 font-space flex items-center">
              <span className="mr-2 inline-block w-1 h-6 bg-primary"></span>
              热门人物排行榜
            </h2>
            <TrendingCelebrities />
          </motion.div>
        </div>
      </div>

      {/* 页脚 */}
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </main>
  )
}

