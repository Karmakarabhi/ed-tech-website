"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { name: "Courses", link: "/courses" },
  { name: "About", link: "/#about" },
  { name: "Testimonials", link: "/#testimonials" },
];

const SiteNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch — theme is unknown on server
  useEffect(() => setMounted(true), []);

  const ThemeIcon = mounted && theme === "dark" ? Sun : Moon;
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setIsAdmin((data as { role?: string } | null)?.role === "admin");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
          const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();
          setIsAdmin((data as { role?: string } | null)?.role === "admin");
        } else if (event === "SIGNED_OUT") {
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    setUser(null);
    setIsAdmin(false);
    router.push("/");
    router.refresh();
  };

  const ThemeButton = (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      aria-label="Toggle theme"
    >
      <ThemeIcon className="h-4 w-4" />
    </button>
  );

  const AuthDesktop = user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="font-body max-w-[120px] truncate text-sm">
          {user.email?.split("@")[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="ghost" size="sm" className="font-body text-sm" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );

  return (
    <Navbar>
      {/* ── Desktop pill ── */}
      <NavBody>
        <Link
          href="/"
          className="font-heading relative z-20 text-lg tracking-tight text-foreground"
        >
          Gandhi University
        </Link>

        <NavItems items={navLinks} onItemClick={() => setMobileOpen(false)} />

        <div className="relative z-20 flex items-center gap-2">
          {ThemeButton}
          {AuthDesktop}
          <Button size="sm" className="font-body rounded-full text-sm font-semibold shadow-sm" asChild>
            <Link href="/courses">Start Learning</Link>
          </Button>
        </div>
      </NavBody>

      {/* ── Mobile ── */}
      <MobileNav>
        <MobileNavHeader>
          <Link
            href="/"
            className="font-heading text-lg tracking-tight text-foreground"
          >
            Gandhi University
          </Link>
          <div className="flex items-center gap-2">
            {ThemeButton}
            <MobileNavToggle
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={() => setMobileOpen(false)}
              className="font-body w-full text-base font-medium text-foreground"
            >
              {link.name}
            </Link>
          ))}

          <hr className="w-full border-border" />

          {user ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="font-body flex items-center gap-2 text-base font-medium text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => { setMobileOpen(false); handleSignOut(); }}
                className="font-body flex items-center gap-2 text-base font-medium text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="font-body text-base font-medium text-foreground"
            >
              Login
            </Link>
          )}

          <Button className="font-body w-full rounded-full" asChild>
            <Link href="/courses" onClick={() => setMobileOpen(false)}>
              Start Learning
            </Link>
          </Button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default SiteNavbar;
