import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 名人舆论风评查询网站. 保留所有权利.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
            使用条款
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
            隐私政策
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground underline underline-offset-4">
            联系我们
          </Link>
        </div>
      </div>
    </footer>
  )
}

