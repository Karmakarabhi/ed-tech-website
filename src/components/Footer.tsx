import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  PLATFORM: [
    { label: "All Programs", href: "/courses" },
    { label: "Pricing", href: "#" },
    { label: "Certificates", href: "#" },
    { label: "Community", href: "#" },
    { label: "Workshops", href: "#" },
  ],
  COMPANY: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  SUPPORT: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { name: "Instagram",   icon: Instagram, url: "https://instagram.com/gandhiuniversity",  accent: false },
  { name: "X (Twitter)", icon: Twitter,   url: "https://x.com/gandhiuni",                 accent: false },
  { name: "Facebook",    icon: Facebook,  url: "https://facebook.com/gandhiuniversity",   accent: false },
  { name: "YouTube",     icon: Youtube,   url: "https://youtube.com/@gandhiuniversity",   accent: true  },
];

const statPills = [
  { value: "1.4M+", label: "YouTube"   },
  { value: "700K+", label: "Instagram" },
  { value: "50K+",  label: "Students"  },
];

const Footer = () => {
  return (
    /*
     * Light:  warm cream  bg-[#faf7f4]  — contrasts page content, feels grounded
     * Dark:   deep charcoal  dark:bg-[#0d0c0b]
     * All colours use explicit light + dark: variants for full theme support.
     */
    <footer className="relative overflow-hidden bg-[#faf7f4] text-foreground dark:bg-[#0d0c0b] dark:text-white">

      {/* Ghost watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-0 select-none font-serif
                   text-[min(14vw,160px)] font-black italic leading-none tracking-tight
                   text-foreground/[0.04] dark:text-white/[0.035]"
      >
        Gandhi
      </span>

      {/* ── Quote band ── */}
      <div className="relative border-b border-border px-6 py-10 dark:border-white/10 lg:px-12">
        <div className="container mx-auto flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <blockquote className="max-w-xl">
            <p className="font-heading text-xl italic leading-snug text-foreground/90 dark:text-white/90 sm:text-2xl">
              &ldquo;Real strength isn&apos;t about suppression —{" "}
              <span className="text-primary">it&apos;s about understanding.</span>&rdquo;
            </p>
          </blockquote>
          <div className="shrink-0 text-right">
            <p className="font-accent text-sm font-bold text-foreground dark:text-white">Saurabh Gandhi</p>
            <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-muted-foreground dark:text-white/40">
              Psychology Expert · CBT Practitioner
            </p>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative container mx-auto px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand column */}
          <div>
            <p className="font-heading text-lg tracking-tight text-foreground dark:text-white">
              Gandhi University
            </p>
            <p className="font-body mt-3 text-sm leading-relaxed text-muted-foreground dark:text-white/50">
              Psychology-driven self-mastery
              <br />
              for the modern Indian man.
              <br />
              Evidence-based. No shortcuts.
            </p>

            {/* Stat pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {statPills.map((s) => (
                <span
                  key={s.label}
                  className="font-accent rounded-full border border-border bg-secondary px-3 py-1
                             text-xs font-semibold text-foreground/70
                             dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70"
                >
                  {s.value}{" "}
                  <span className="font-normal text-muted-foreground dark:text-white/35">{s.label}</span>
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full p-2 transition-colors ${
                      social.accent
                        ? "bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-600/20 dark:text-red-400 dark:hover:bg-red-600/30"
                        : "bg-secondary text-muted-foreground hover:bg-border hover:text-foreground dark:bg-white/[0.06] dark:text-white/45 dark:hover:bg-white/12 dark:hover:text-white"
                    }`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-accent text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground dark:text-white/35">
                {heading}
              </p>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-white/50 dark:hover:text-white/90"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4
                        border-t border-border pt-8 dark:border-white/10 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-muted-foreground dark:text-white/25">
            © {new Date().getFullYear()} Gandhi University. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body text-xs text-muted-foreground transition-colors hover:text-foreground dark:text-white/25 dark:hover:text-white/60"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
