import Link from "next/link";

const footerLinks = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/support", label: "Contact Us" }
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <p>© {new Date().getFullYear()} Pesalink. All rights reserved.</p>
        <nav className="footer__links" aria-label="Footer links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
