import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { CodeBlock } from "../components/CodeBlock";

const quickLinks = [
  {
    title: "API Documentation",
    description: "Dive into payments, accounts, and transaction endpoints.",
    href: "/docs"
  },
  {
    title: "Sandbox Console",
    description: "Prototype with mock accounts and OAuth2 flows.",
    href: "/sandbox"
  },
  {
    title: "Developer Signup",
    description: "Request credentials and join the integration program.",
    href: "/support#developer-relations"
  }
];

const ecosystemHighlights = [
  {
    metric: "30+",
    label: "Connected Banks"
  },
  {
    metric: "2.5M+",
    label: "Daily Instant Transactions"
  },
  {
    metric: "<300ms",
    label: "Average Settlement Latency"
  }
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Pesalink for Developers"
        title="Build on Pesalink APIs — Powering Real-time Payments Across Kenya."
        description="Launch instant bank-to-bank payments in your apps with secure OAuth2 flows, rich account insights, and comprehensive webhook events."
        cta={
          <div className="nav-cta">
            <Link className="button button--primary" href="/docs">
              Get Started with Pesalink APIs
            </Link>
          </div>
        }
      />

      <section className="page-section">
        <div className="container">
          <h2>Everything you need to integrate quickly</h2>
          <p className="feature-card__description">
            Explore the full ecosystem, from sandbox credentials to real-time
            notifications, in one unified experience.
          </p>
          <div className="feature-grid">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href} className="feature-card">
                <span className="badge">Start here</span>
                <h3 className="feature-card__title">{link.title}</h3>
                <p className="feature-card__description">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--alt">
        <div className="container">
          <h2>Pesalink ecosystem at a glance</h2>
          <p className="feature-card__description">
            Trusted by leading financial institutions, powering instant payments
            for businesses, fintechs, and banks nationwide.
          </p>
          <div className="stats-bar">
            {ecosystemHighlights.map((item) => (
              <div key={item.label} className="stat-pill">
                <p className="stat-pill__value">{item.metric}</p>
                <p className="stat-pill__label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container feature-grid">
          <div className="feature-card">
            <span className="badge">Payments</span>
            <h3 className="feature-card__title">Instant Credit Transfers</h3>
            <p className="feature-card__description">
              Initiate bank-to-bank payments with consistent 2xx/4xx payloads
              and status webhooks for settlement confirmation.
            </p>
            <CodeBlock language="http">{`POST https://api.sandbox.pesalink.co.ke/v1/payments
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "sourceAccount": "34002349872",
  "destinationAccount": "017200234987",
  "amount": { "value": 25000, "currency": "KES" },
  "narration": "Invoice 1042",
  "callbackUrl": "https://merchant.example.com/hooks/pesalink"
}`}</CodeBlock>
          </div>
          <div className="feature-card">
            <span className="badge">Developer Experience</span>
            <h3 className="feature-card__title">Modern tooling out of the box</h3>
            <ul>
              <li>Swagger-based API explorer with curl snippets.</li>
              <li>OAuth2 client credentials flow guide.</li>
              <li>Playground console with mock data sets.</li>
              <li>Sample integrations for Node.js, Java, and Python.</li>
            </ul>
          </div>
          <div className="feature-card">
            <span className="badge">Compliance</span>
            <h3 className="feature-card__title">Security-first architecture</h3>
            <p className="feature-card__description">
              PCI DSS aligned encryption, audit logs, and granular token
              scopes ensure your applications stay compliant.
            </p>
            <Link className="button button--primary" href="/support#security">
              View security guidance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
