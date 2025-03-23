"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavBar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    { href: "/", label: "主页" },
    { href: "/community", label: "社区" },
    { href: "/about", label: "关于我们" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl font-space mr-8">
            <span className="neon-text">观星台StarScrope</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        pathname === route.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/60 hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {route.label}
                      {pathname === route.href && (
                        <motion.span
                          className="absolute bottom-0 left-0 h-[2px] w-full bg-primary"
                          layoutId="navbar-indicator"
                        />
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            className="relative overflow-hidden group focus:outline-none focus:ring-0"
            asChild
          >
            <Link href="/user">
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">用户中心</span>
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden focus:outline-none focus:ring-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/80 backdrop-blur-md"
          >
            <nav className="container py-4">
              <ul className="space-y-4">
                {routes.map((route) => (
                  <li key={route.href}>
                    <Link
                      href={route.href}
                      className={cn(
                        "block px-4 py-2 rounded-md transition-colors",
                        pathname === route.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/60 hover:text-foreground hover:bg-muted"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
