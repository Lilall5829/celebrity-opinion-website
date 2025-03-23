"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Globe } from "lucide-react"
import { motion } from "framer-motion"

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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <div className="space-y-6">
      <Card className="glass-effect overflow-hidden">
        <CardHeader className="pb-2 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <CardTitle className="text-lg flex items-center gap-2 font-space">
            <Briefcase className="h-5 w-5 text-primary" />
            按职业浏览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul className="space-y-1" variants={container} initial="hidden" animate="show">
            {professionCategories.map((category) => (
              <motion.li key={category.id} variants={item}>
                <Link
                  href={`/category/profession/${category.id}`}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>

      <Card className="glass-effect overflow-hidden">
        <CardHeader className="pb-2 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
          <CardTitle className="text-lg flex items-center gap-2 font-space">
            <Globe className="h-5 w-5 text-secondary" />
            按国籍浏览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul className="space-y-1" variants={container} initial="hidden" animate="show">
            {nationalityCategories.map((category) => (
              <motion.li key={category.id} variants={item}>
                <Link
                  href={`/category/nationality/${category.id}`}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-secondary/10 hover:text-secondary transition-colors"
                >
                  {category.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </div>
  )
}

