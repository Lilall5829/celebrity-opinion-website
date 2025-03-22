"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { UserCircle } from "lucide-react"

export function NavBar() {
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "主页" },
    { href: "/community", label: "社区" },
    { href: "/about", label: "关于我们" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            名人舆论
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === route.href && "font-medium text-primary",
                      )}
                    >
                      {route.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="icon" asChild>
            <Link href="/user">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">用户中心</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

