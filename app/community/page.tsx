import type { Metadata } from "next"
import CommunityClientPage from "./CommunityClientPage"

// 修改社区页面的标题
export const metadata: Metadata = {
  title: "社区 - 观星台StarScrope",
  description: "参与讨论名人舆论相关话题，分享您的观点",
}

export default function CommunityPage() {
  return <CommunityClientPage />
}

