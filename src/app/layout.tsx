"use client";

import Link from "next/link";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "", label: "Explore More", opensSheet: true },
  ];

  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link
              href="/"
              className="text-lg font-bold tracking-tight font-mono"
            >
              NextJS + Shadcn
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.opensSheet) {
                      e.preventDefault();
                      setSheetOpen(true);
                    }
                  }}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === link.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-md">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left">
                  {/* Sheet Header with Title for accessibility */}
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <Separator className="my-4 mb-0" />
                  </SheetHeader>

                  {/* Navigation Links */}
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                          pathname === link.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main>{children}</main>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{`What's new!`}</SheetTitle>
              <Separator className="my-4 mb-0" />
            </SheetHeader>
            <div className="mt-4">
              {/* Your sheet content here */}
              <p>Welcome to the Explore More section!</p>
              <Button onClick={() => setSheetOpen(false)}>Close</Button>
              <Link
                        key={'/news'}
                        href={'/news'}
                        // className={cn(
                        //   "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        //   pathname === link.href
                        //     ? "bg-accent text-accent-foreground"
                        //     : "text-muted-foreground"
                        // )}
                      >
                        News Page
                      </Link>
            </div>
          </SheetContent>
        </Sheet>
      </body>
    </html>
  );
}
