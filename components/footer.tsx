import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 py-6 md:py-8 bg-background/80 backdrop-blur-md">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 <span className="font-medium text-foreground">观星台StarScrope</span>. 保留所有权利.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            使用条款
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            隐私政策
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            联系我们
          </Link>
        </div>
      </div>
    </footer>
  )
}

