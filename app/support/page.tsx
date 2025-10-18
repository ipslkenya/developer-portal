import Link from "next/link";

const resources = [
  {
    title: "Documentation Hub",
    description: "Read getting-started guides, API walkthroughs, and changelog notes.",
    href: "/docs",
    action: "Go to docs"
  },
  {
    title: "Integration FAQ",
    description: "Find answers on rate limits, KYC requirements, and certification steps.",
    href: "#faq",
    action: "View FAQs"
  },
  {
    title: "Developer Relations",
    description: "Book a technical review with the Pesalink integrations team.",
    href: "#developer-relations",
    action: "Request support"
  }
];

export default function SupportPage() {
  return (
    <section className="page-section">
      <div className="container">
        <span className="badge">Support & Community</span>
        <h1>How can we help you build faster?</h1>
        <p className="feature-card__description">
          Access documentation, contact the developer success team, and stay in
          sync with upcoming platform enhancements.
        </p>

        <div className="support-grid">
          {resources.map((card) => (
            <div key={card.title} className="support-card">
              <h2 className="support-card__title">{card.title}</h2>
              <p className="feature-card__description">{card.description}</p>
              <Link className="button button--primary" href={card.href}>
                {card.action}
              </Link>
            </div>
          ))}
        </div>

        <div id="faq" className="page-section">
          <h2>Frequently asked questions</h2>
          <ul>
            <li>
              <strong>What are the API rate limits?</strong> Sandbox requests
              allow 100 RPM per client; production limits are tailored during
              onboarding.
            </li>
            <li>
              <strong>How long does onboarding take?</strong> Typical go-live is
              10–15 business days after compliance review and certification.
            </li>
            <li>
              <strong>Does Pesalink support test cards?</strong> Sandbox uses
              mock bank accounts documented in `/docs#environments`.
            </li>
          </ul>
        </div>

        <div id="developer-relations" className="page-section">
          <h2>Request developer access</h2>
          <p className="feature-card__description">
            Submit a form to receive sandbox credentials and kickoff guidance
            from the integrations squad.
          </p>
          <form className="sandbox-form">
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" placeholder="e.g. Nairobi Fintech Ltd" />
            </div>
            <div className="field">
              <label htmlFor="email">Work Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="developer@company.co.ke"
              />
            </div>
            <div className="field">
              <label htmlFor="use-case">Intended Use Case</label>
              <textarea
                id="use-case"
                name="useCase"
                placeholder="Describe your payout or collection flow..."
              />
            </div>
            <button className="button button--primary" type="button">
              Request API Keys (Mock)
            </button>
            <p className="feature-card__description">
              Ready for production? Contact{" "}
              <Link href="mailto:developers@pesalink.co.ke">
                developers@pesalink.co.ke
              </Link>{" "}
              to begin compliance review.
            </p>
          </form>
        </div>

        <div id="security" className="page-section">
          <h2>Security & operational readiness</h2>
          <ul>
            <li>Rotate sandbox OAuth secrets every 90 days; production secrets use HSM-backed rotation.</li>
            <li>Whitelist `52.137.0.0/16` and `102.37.128.0/18` to receive webhook callbacks.</li>
            <li>Capture `X-Pesalink-Request-Id` headers in your logs to accelerate escalation paths.</li>
          </ul>
          <p>
            Future updates will introduce a Slack workspace and community forum.
            Watch the changelog on the landing page for release timelines.
          </p>
        </div>
      </div>
    </section>
  );
}
