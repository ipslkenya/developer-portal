import Link from "next/link";
import { DocsLayout } from "../../components/DocsLayout";
import { CodeBlock } from "../../components/CodeBlock";

const navItems = [
  { href: "#quickstart", label: "Quickstart" },
  { href: "#overview", label: "Overview" },
  { href: "#api-conventions", label: "API Conventions" },
  { href: "#authentication", label: "Authentication" },
  { href: "#webhooks", label: "Webhooks" },
  { href: "#environments", label: "Environments" },
  { href: "#feedback", label: "Feedback" }
];

const quickstartSteps = [
  {
    title: "Request sandbox access",
    detail: "Submit the developer form with company details and intended flow."
  },
  {
    title: "Register OAuth client",
    detail: "Create a client ID/secret and download credentials from the portal."
  },
  {
    title: "Fetch access token",
    detail: "Call the identity endpoint with client credentials to receive a bearer token."
  },
  {
    title: "Send first payment",
    detail: "Use mock accounts to initiate a `POST /v1/payments` request with idempotency keys."
  },
  {
    title: "Verify settlement",
    detail: "Listen to webhook callbacks or poll `GET /v1/payments/{paymentId}` for status."
  }
];

export default function DocsPage() {
  return (
    <section className="page-section">
      <DocsLayout title="Developer Docs" navItems={navItems}>
        <div id="quickstart" className="docs-section">
          <h2>Quickstart</h2>
          <div className="quickstart-grid">
            {quickstartSteps.map((step, index) => (
              <div key={step.title} className="quickstart-card">
                <span className="quickstart-step">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="overview" className="docs-section">
          <h2>Overview</h2>
          <p>
            The Pesalink API unlocks real-time payments, account validation, and
            transaction visibility for financial products across Kenya. Use this
            portal to onboard your application, retrieve credentials, and launch
            new money-movement workflows with minimal friction.
          </p>
          <p>
            API responses follow a consistent envelope with `{`data`}`,
            `{`meta`}`, and `{`errors`}` blocks to simplify integration across
            channels. All payloads use JSON over HTTPS and share structured
            error messages for deterministic handling.
          </p>
        </div>

        <div id="api-conventions" className="docs-section">
          <h2>API conventions</h2>
          <div className="callout callout--info">
            <ul>
              <li>
                <strong>Versioning:</strong> Declare `Accept:
                application/vnd.pesalink.v1+json` on every request to ensure you
                access the latest stable contract.
              </li>
              <li>
                <strong>Idempotency:</strong> Supply an `Idempotency-Key`
                header when creating payments to guarantee exactly-once
                processing.
              </li>
              <li>
                <strong>Correlation:</strong> Capture
                `X-Pesalink-Request-Id` from responses for observability and
                escalation.
              </li>
            </ul>
          </div>
        </div>

        <div id="authentication" className="docs-section">
          <h2>Authentication</h2>
          <p>
            Authentication relies on OAuth2 client credentials. Each integration
            receives a client ID/secret pair with environment-scoped permissions
            and token lifetimes of 15 minutes. Rotate secrets via the developer
            portal or escalate urgent resets using the hotline below.
          </p>
          <div className="callout callout--alert">
            <p>
              <strong>Need help fast?</strong> Email{" "}
              <Link href="mailto:developers@pesalink.co.ke">
                developers@pesalink.co.ke
              </Link>{" "}
              or call{" "}
              <a href="tel:+254712345678" className="callout-link">
                +254 712 345 678
              </a>{" "}
              (24/7 emergency reset desk).
            </p>
          </div>
          <CodeBlock language="bash">{`curl --request POST \\
  https://identity.sandbox.pesalink.co.ke/oauth2/token \\
  --header "Content-Type: application/x-www-form-urlencoded" \\
  --data "grant_type=client_credentials" \\
  --data "client_id=<your_client_id>" \\
  --data "client_secret=<your_client_secret>"`}</CodeBlock>
          <p>
            Include the returned bearer token in the `Authorization` header for
            every request. Scope tokens per workload to isolate risk and revoke
            credentials swiftly when necessary.
          </p>
        </div>

        <div id="webhooks" className="docs-section">
          <h2>Webhooks</h2>
          <p>
            Subscribe to settlement updates, reversals, and fraud alerts by
            registering webhook URLs in the portal. Pesalink retries failed
            deliveries up to 9 times with exponential backoff. Signatures are
            provided in the `X-Pesalink-Signature` header using HMAC SHA-256.
          </p>
          <CodeBlock language="json">{`{
  "eventType": "payment.settled",
  "eventVersion": "2025-01-01",
  "data": {
    "paymentId": "pay_21bca982",
    "status": "SETTLED",
    "amount": { "value": 25000, "currency": "KES" },
    "completedAt": "2025-03-12T19:12:44Z"
  }
}`}</CodeBlock>
        </div>

        <div id="environments" className="docs-section">
          <h2>Environments</h2>
          <div className="environments-table">
            <div className="environment-row">
              <div className="environment-header">Sandbox</div>
              <div className="environment-content">
                <p className="environment-url">https://api.sandbox.pesalink.co.ke</p>
                <p>
                  Use seeded mock accounts. Data resets nightly for consistent QA and
                  deterministic test results.
                </p>
              </div>
            </div>
            <div className="environment-row">
              <div className="environment-header">Production</div>
              <div className="environment-content">
                <p className="environment-url">https://api.pesalink.co.ke</p>
                <p>
                  Requires compliance validation, IP whitelisting, and signed SLA prior to go-live.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="feedback" className="docs-section feedback-section">
          <h2>Feedback</h2>
          <p>
            Found an issue or missing detail? Help us improve the Pesalink docs for everyone.
          </p>
          <Link
            className="button button--primary"
            href="mailto:developers@pesalink.co.ke?subject=Pesalink%20Docs%20Feedback"
          >
            Report an issue
          </Link>
        </div>
      </DocsLayout>
    </section>
  );
}
