import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/api-reference", label: "API Reference" },
  { href: "/sandbox", label: "Sandbox" },
  { href: "/support", label: "Support" }
];

export function SiteHeader() {
  return (
    <header className="top-nav">
      <div className="container top-nav__content">
        <Link href="/" className="brand">
          <Image
            src="/pesalink-logo-dark.png"
            alt="Pesalink logo"
            width={156}
            height={44}
            priority
          />
          <span className="brand__title">Developer Portal</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link className="button button--primary" href="/sandbox">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
