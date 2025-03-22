import { SearchBar } from "@/components/search-bar"
import { TrendingCelebrities } from "@/components/trending-celebrities"
import { CategorySidebar } from "@/components/category-sidebar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">名人舆论风评查询</h1>
          <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            快速了解公众人物的舆论趋势、相关新闻及社会影响力
          </p>
          <div className="mt-10 w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <CategorySidebar />
          </div>
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-bold mb-6">热门人物排行榜</h2>
            <TrendingCelebrities />
          </div>
        </div>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </main>
  )
}

