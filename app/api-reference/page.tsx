import { DocsLayout } from "../../components/DocsLayout";
import { CodeBlock } from "../../components/CodeBlock";

const navItems = [
  { href: "#reference-overview", label: "Overview" },
  { href: "#payments", label: "Payments" },
  { href: "#accounts", label: "Accounts" },
  { href: "#transactions", label: "Transactions" },
  { href: "#error-codes", label: "Error Codes" }
];

const paymentsTable = [
  {
    method: "POST",
    path: "/v1/payments",
    summary: "Initiate an instant transfer",
    scope: "payments.write"
  },
  {
    method: "GET",
    path: "/v1/payments/{paymentId}",
    summary: "Fetch payment status",
    scope: "payments.read"
  },
  {
    method: "POST",
    path: "/v1/payments/{paymentId}/reversal",
    summary: "Submit reversal request",
    scope: "payments.write"
  }
];

const accountsTable = [
  {
    method: "POST",
    path: "/v1/accounts/verify",
    summary: "Validate account name",
    scope: "accounts.read"
  },
  {
    method: "GET",
    path: "/v1/accounts/{accountId}/balance",
    summary: "Retrieve available balance",
    scope: "accounts.read"
  }
];

const transactionsTable = [
  {
    method: "GET",
    path: "/v1/transactions",
    summary: "List transactions with filters",
    scope: "transactions.read"
  },
  {
    method: "GET",
    path: "/v1/transactions/{transactionId}",
    summary: "Fetch a specific transaction",
    scope: "transactions.read"
  }
];

const errorRows = [
  { code: "40001", type: "ValidationError", message: "Missing required field." },
  { code: "40102", type: "AuthenticationError", message: "Expired access token." },
  { code: "40317", type: "AuthorizationError", message: "Insufficient OAuth scope." },
  { code: "40941", type: "DuplicateRequest", message: "Idempotency key re-used." },
  { code: "50303", type: "ServiceUnavailable", message: "Upstream network issue." }
];

export default function ApiReferencePage() {
  return (
    <section className="page-section">
      <DocsLayout title="API Reference" navItems={navItems}>
        <div id="reference-overview" className="docs-section">
          <h2>Overview</h2>
          <p>
            This reference surface complements the Swagger UI available under{" "}
            <strong>/api-reference</strong> by outlining required headers, OAuth
            scopes, and example payloads. All endpoints are namespaced under
            `/v1` and rely on idempotency keys for safe retries.
          </p>
          <p>
            Download the placeholder OpenAPI definition at{" "}
            <a className="docs-nav__link" href="/openapi.yaml">
              /openapi.yaml
            </a>{" "}
            and load it into tools like ReDoc, Swagger UI, or Postman for an
            interactive experience.
          </p>
        </div>

        <div id="payments" className="docs-section">
          <h2>Payments</h2>
          <p>
            Create and manage instant credit transfers. Provide a unique
            `Idempotency-Key` header for each initiation call to guarantee
            exactly-once processing.
          </p>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Path</th>
                <th>Description</th>
                <th>OAuth Scope</th>
              </tr>
            </thead>
            <tbody>
              {paymentsTable.map((row) => (
                <tr key={row.path + row.method}>
                  <td>{row.method}</td>
                  <td>{row.path}</td>
                  <td>{row.summary}</td>
                  <td>{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <CodeBlock language="json">{`{
  "sourceAccount": "34002349872",
  "destinationAccount": "017200234987",
  "amount": { "value": 25000, "currency": "KES" },
  "narration": "Invoice 1042",
  "metadata": {
    "customerRef": "POS-94833"
  }
}`}</CodeBlock>
        </div>

        <div id="accounts" className="docs-section">
          <h2>Accounts</h2>
          <p>
            Validate beneficiary details and pull balances using account-level
            scopes. Responses include safe-to-display names for customer UIs.
          </p>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Path</th>
                <th>Description</th>
                <th>OAuth Scope</th>
              </tr>
            </thead>
            <tbody>
              {accountsTable.map((row) => (
                <tr key={row.path + row.method}>
                  <td>{row.method}</td>
                  <td>{row.path}</td>
                  <td>{row.summary}</td>
                  <td>{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <CodeBlock language="json">{`{
  "accountNumber": "017200234987",
  "bankCode": "01",
  "response": {
    "matchConfidence": "HIGH",
    "accountName": "Pesalink Ventures Limited"
  }
}`}</CodeBlock>
        </div>

        <div id="transactions" className="docs-section">
          <h2>Transactions</h2>
          <p>
            Query historical activity with filters on date ranges, status, and
            amount. Pagination uses RFC 5988 link headers.
          </p>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Path</th>
                <th>Description</th>
                <th>OAuth Scope</th>
              </tr>
            </thead>
            <tbody>
              {transactionsTable.map((row) => (
                <tr key={row.path + row.method}>
                  <td>{row.method}</td>
                  <td>{row.path}</td>
                  <td>{row.summary}</td>
                  <td>{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <CodeBlock language="bash">{`curl "https://api.sandbox.pesalink.co.ke/v1/transactions?status=SETTLED&limit=25" \\
  --header "Authorization: Bearer <token>" \\
  --header "Accept: application/vnd.pesalink.v1+json"`}</CodeBlock>
        </div>

        <div id="error-codes" className="docs-section">
          <h2>Error Codes</h2>
          <p>
            Error responses share the structure below. Pair with request IDs
            when contacting support to accelerate triage.
          </p>
          <CodeBlock language="json">{`{
  "errors": [
    {
      "code": "40102",
      "message": "Expired access token.",
      "requestId": "req_98f8abde"
    }
  ]
}`}</CodeBlock>
          <table className="docs-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {errorRows.map((row) => (
                <tr key={row.code}>
                  <td>{row.code}</td>
                  <td>{row.type}</td>
                  <td>{row.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsLayout>
    </section>
  );
}
