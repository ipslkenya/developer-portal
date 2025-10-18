import { CodeBlock } from "../../components/CodeBlock";

export default function SandboxPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="sandbox-panel">
          <div>
            <span className="badge">Sandbox Console</span>
            <h1>Prototype live with mock data</h1>
            <p>
              Use the client credentials below to fetch a demo OAuth token and
              test transfers against our mock bank network. Swap in your own
              credentials once onboarding completes.
            </p>
          </div>

          <div className="sandbox-form" role="form">
            <div className="field">
              <label htmlFor="clientId">Client ID</label>
              <input
                id="clientId"
                name="clientId"
                defaultValue="sandbox_portal_client"
                readOnly
              />
            </div>
            <div className="field">
              <label htmlFor="clientSecret">Client Secret</label>
              <input
                id="clientSecret"
                name="clientSecret"
                type="password"
                defaultValue="****-sandbox-secret"
                readOnly
              />
            </div>
            <div className="field">
              <label htmlFor="endpoint">Endpoint</label>
              <select id="endpoint" name="endpoint" defaultValue="payment">
                <option value="payment">POST /v1/payments</option>
                <option value="status">GET /v1/payments/{`{paymentId}`}</option>
                <option value="balance">GET /v1/accounts/{`{accountId}`}/balance</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="payload">Sample Payload</label>
              <textarea
                id="payload"
                name="payload"
                defaultValue={`{
  "sourceAccount": "34002349872",
  "destinationAccount": "017200234987",
  "amount": { "value": 12500, "currency": "KES" }
}`}
              />
            </div>
            <button className="button button--primary" type="button">
              Try it out (Mock)
            </button>
          </div>

          <div>
            <h2>OAuth2 token exchange</h2>
            <CodeBlock language="bash">{`curl --request POST \\
  https://identity.sandbox.pesalink.co.ke/oauth2/token \\
  --header "Content-Type: application/x-www-form-urlencoded" \\
  --data "grant_type=client_credentials" \\
  --data "client_id=sandbox_portal_client" \\
  --data "client_secret=<secret>"`}</CodeBlock>
          </div>

          <div>
            <h2>Instant payment example</h2>
            <CodeBlock language="bash">{`curl --request POST \\
  https://api.sandbox.pesalink.co.ke/v1/payments \\
  --header "Authorization: Bearer <access_token>" \\
  --header "Idempotency-Key: {uuid}" \\
  --header "Content-Type: application/json" \\
  --data '{
    "sourceAccount": "34002349872",
    "destinationAccount": "017200234987",
    "amount": { "value": 12500, "currency": "KES" },
    "narration": "POS Settlement"
  }'`}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
