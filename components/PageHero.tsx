import { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  cta?: ReactNode;
};

export function PageHero({ eyebrow, title, description, cta }: PageHeroProps) {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div>
          {eyebrow ? <span className="badge badge--hero">{eyebrow}</span> : null}
          <h1 className="hero__title">{title}</h1>
          {description ? (
            <p className="hero__subtitle">{description}</p>
          ) : null}
        </div>
        {cta}
      </div>
    </section>
  );
}
