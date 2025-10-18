import { ReactNode } from "react";

export type DocsNavItem = {
  href: string;
  label: string;
};

type DocsLayoutProps = {
  title: string;
  navItems: DocsNavItem[];
  children: ReactNode;
};

export function DocsLayout({ title, navItems, children }: DocsLayoutProps) {
  return (
    <div className="container docs-layout">
      <aside className="docs-nav" aria-label={`${title} navigation`}>
        <span className="docs-nav__title">{title}</span>
        <ul className="docs-nav__list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a className="docs-nav__link" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <article className="docs-content">{children}</article>
    </div>
  );
}
