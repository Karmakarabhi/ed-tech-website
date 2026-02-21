"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, User, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderBarProps {
  userName: string;
}

const getPageTitle = (pathname: string): string => {
  if (pathname === "/admin") return "Dashboard";
  if (pathname.startsWith("/admin/courses/new")) return "New Course";
  if (pathname.startsWith("/admin/courses")) return "Programs";
  if (pathname.startsWith("/admin/testimonials")) return "Testimonials";
  if (pathname.startsWith("/admin/settings")) return "Settings";
  return "Admin";
};

const getBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Dashboard", href: "/admin" }];
  
  if (segments.length > 1) {
    if (segments[1] === "courses") {
      breadcrumbs.push({ label: "Programs", href: "/admin/courses" });
      if (segments[2] === "new") {
        breadcrumbs.push({ label: "New Course", href: "/admin/courses/new" });
      } else if (segments[2]) {
        breadcrumbs.push({ label: "Edit Course", href: `/admin/courses/${segments[2]}` });
      }
    } else if (segments[1] === "testimonials") {
      breadcrumbs.push({ label: "Testimonials", href: "/admin/testimonials" });
    } else if (segments[1] === "settings") {
      breadcrumbs.push({ label: "Settings", href: "/admin/settings" });
    }
  }
  
  return breadcrumbs;
};

export default function HeaderBar({ userName }: HeaderBarProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Left: Breadcrumbs & Page Title */}
      <div className="flex items-center space-x-4">
        <nav className="flex items-center text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-2 h-3 w-3" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link 
                  href={crumb.href}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Quick Actions & User */}
      <div className="flex items-center space-x-3">
        {/* Quick search - hidden on mobile */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Quick search..."
            className="w-64 pl-9 h-9"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-3">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="text-muted-foreground">
                View Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <form action="/api/auth/signout" method="post" className="w-full">
                <button type="submit" className="w-full text-left">
                  Sign Out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}