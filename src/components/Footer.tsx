const footerLinks = {
  Platform: ["All Courses", "Pricing", "Certificates", "Community"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact", "Privacy Policy", "Terms"],
};

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
