export default function TermsPage() {
  return (
    <section className="page-section">
      <div className="container docs-content">
        <h1>Terms of Use (Preview)</h1>
        <p>
          These draft terms outline acceptable use for the Pesalink developer
          sandbox. Replace with legal-approved text before production launch.
        </p>
        <ul>
          <li>Sandbox data is non-production and must not include real customer PII.</li>
          <li>Rate limits are enforced to preserve platform stability.</li>
          <li>Credentials are personal to your organization and may not be shared publicly.</li>
        </ul>
      </div>
    </section>
  );
}
