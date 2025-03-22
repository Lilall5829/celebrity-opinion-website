import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Celebrity } from "@/lib/api-types"

interface RelatedCelebritiesProps {
  celebrities: Celebrity[]
}

export function RelatedCelebrities({ celebrities }: RelatedCelebritiesProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">相关人物</CardTitle>
      </CardHeader>
      <CardContent>
        {celebrities.length > 0 ? (
          <div className="space-y-3">
            {celebrities.map((celebrity) => (
              <Link
                href={`/celebrity/${celebrity.id}`}
                key={celebrity.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={celebrity.image_url || "/placeholder.svg"}
                    alt={celebrity.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{celebrity.name}</div>
                  <div className="text-xs text-muted-foreground">{celebrity.profession}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-2">暂无相关人物</div>
        )}
      </CardContent>
    </Card>
  )
}

