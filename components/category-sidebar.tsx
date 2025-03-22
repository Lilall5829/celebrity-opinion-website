import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Globe } from "lucide-react"

// Mock data for categories
const professionCategories = [
  { id: "actors", name: "演员" },
  { id: "singers", name: "歌手" },
  { id: "athletes", name: "运动员" },
  { id: "politicians", name: "政治人物" },
  { id: "entrepreneurs", name: "企业家" },
  { id: "scientists", name: "科学家" },
]

const nationalityCategories = [
  { id: "china", name: "中国" },
  { id: "usa", name: "美国" },
  { id: "uk", name: "英国" },
  { id: "japan", name: "日本" },
  { id: "korea", name: "韩国" },
  { id: "other", name: "其他国家/地区" },
]

export function CategorySidebar() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            按职业浏览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {professionCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/profession/${category.id}`}
                  className="block px-2 py-1.5 text-sm rounded-md hover:bg-muted"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            按国籍浏览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {nationalityCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/nationality/${category.id}`}
                  className="block px-2 py-1.5 text-sm rounded-md hover:bg-muted"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

