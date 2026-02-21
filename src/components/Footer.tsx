import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  Platform: ["All Courses", "Pricing", "Certificates", "Community"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact", "Privacy Policy", "Terms"],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://instagram.com/gandhiuniversity" },
  { name: "X (Twitter)", icon: Twitter, url: "https://x.com/gandhiuni" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/gandhiuniversity" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@gandhiuniversity" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-heading text-lg text-foreground">Gandhi University</p>
            <p className="font-body mt-3 text-sm leading-relaxed text-muted-foreground">
              Psychology-driven self-mastery for the modern Indian man.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-accent text-xs font-semibold uppercase tracking-[0.15em] text-foreground">
                {heading}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gandhi University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
