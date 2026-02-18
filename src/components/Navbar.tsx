import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#testimonials" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="font-heading text-xl tracking-tight text-foreground">
          Gandhi University
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Button variant="ghost" size="sm" className="font-body text-sm">
            Login
          </Button>
          <Button size="sm" className="font-body text-sm">
            Start Learning
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="rounded-lg p-2 text-foreground" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="font-heading text-lg">Menu</SheetTitle>
              <div className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-body text-lg font-medium text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-border" />
                <Button variant="ghost" className="justify-start font-body">
                  Login
                </Button>
                <Button className="font-body">Start Learning</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
