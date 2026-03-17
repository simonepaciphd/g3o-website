import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';

function CodeBlock({ children }) {
  return (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 overflow-x-auto text-sm leading-relaxed font-mono">
      {children}
    </pre>
  );
}

function DataAccess() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">
            Data Access &amp; Transparency
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            How we plan to provide access to G3O data, the collection methodology behind the
            project, and the transparency features that are being built out over time.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Access the Data */}
        <section>
          <SectionHeading
            title="Access the Data"
            subtitle="Pilot data access is currently limited and reviewed manually; broader public release workflows are still being finalized."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                heading: 'Bulk Download Request',
                text: 'Request access to the current pilot dataset. Requests are reviewed manually, and access is currently limited while validation and release workflows are still being expanded.',
                cta: 'Request access',
                to: '/contact?action=bulk-download#request-form',
              },
              {
                heading: 'API (forthcoming)',
                text: 'Public programmatic access via a structured REST API is forthcoming.',
                cta: 'Forthcoming',
              },
              {
                heading: 'Versioned Releases (forthcoming)',
                text: 'Public dataset releases and changelogs are forthcoming as the release workflow is finalized.',
                cta: 'Forthcoming',
              },
            ].map((item) => (
              <div key={item.heading} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.heading}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.text}</p>
                {item.to ? (
                  <Link
                    to={item.to}
                    className="inline-flex items-center text-xs font-semibold text-primary-600 uppercase tracking-wider hover:text-primary-800"
                  >
                    {item.cta}
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                    {item.cta}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            <p className="font-semibold">Current pilot access limitation</p>
            <p className="mt-2 leading-relaxed">
              Any bulk data shared at this stage should be understood as pilot only. Coverage and
              validation are still in progress, so the data should not yet be interpreted as
              systematic or fully validated.
            </p>
          </div>
        </section>

        {/* API Access */}
        <section>
          <SectionHeading
            title="API Access (forthcoming)"
            subtitle="We plan to offer programmatic access via a public REST API."
          />
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Planned Endpoints (forthcoming)
              </h3>
              <CodeBlock>{`GET /api/v1/institutions
GET /api/v1/institutions/{id}
GET /api/v1/countries
GET /api/v1/search?q=chatbot&country=US`}</CodeBlock>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Illustrative Response Shape (forthcoming)
              </h3>
              <CodeBlock>{`{
  "data": [
    {
      "id": "us-gsa-001",
      "institution": "General Services Administration",
      "country": "US",
      "type": "Federal Agency",
      "genai_use": {
        "status": "Active Deployment",
        "tool": "Custom ChatBot",
        "vendor": "Microsoft Azure",
        "purpose": "Internal knowledge management",
        "public_facing": false,
        "safeguards": ["Human review", "Data classification"]
      },
      "sources": [
        {
          "url": "https://example.gov/announcement",
          "date": "2025-06-15",
          "type": "Official announcement"
        }
      ],
      "confidence": 0.92,
      "last_updated": "2026-01-10"
    }
  ],
  "meta": {
    "total": 1,
    "version": "0.2.0"
  }
}`}</CodeBlock>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm font-medium">
                Public API documentation and access are forthcoming. Contact us to register
                interest.
              </p>
            </div>
          </div>
        </section>

        {/* Methods */}
        <section>
          <SectionHeading
            title="Methods"
            subtitle="How we collect, validate, and classify government GenAI data."
          />
          <div className="space-y-6">
            {[
              {
                heading: 'Data Collection Pipeline',
                items: [
                  'Structured, AI-augmented web searches using institution-specific multilingual queries',
                  'LLM-assisted extraction of structured fields from unstructured web content',
                  'Complementary multilingual staff surveys to capture non-public internal use',
                ],
              },
              {
                heading: 'Evidence Standards',
                items: [
                  'Each record requires at least one verifiable source document',
                  'Confidence scores reflect source quality, corroboration, and recency',
                  'Distinction maintained between stated intent and verified deployment',
                ],
              },
              {
                heading: 'Classification Logic',
                items: [
                  'Standardized taxonomy for use type, deployment status, and governance measures',
                  'Hierarchical institution coding aligned with international standards',
                  'Machine-assisted classification with human validation for ambiguous cases',
                ],
              },
            ].map((section) => (
              <div key={section.heading} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{section.heading}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Provenance & Reproducibility */}
        <section>
          <SectionHeading
            title="Provenance & Reproducibility (forthcoming)"
            subtitle="The dashboard already surfaces source context, and fuller public export and lineage tooling are forthcoming."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                heading: 'Record-Level Sources',
                text: 'Institution profiles already surface source context, and broader public provenance exports are forthcoming.',
              },
              {
                heading: 'Versioned Datasets (forthcoming)',
                text: 'Immutable public snapshots with semantic versioning and changelogs are forthcoming.',
              },
              {
                heading: 'Data Lineage (forthcoming)',
                text: 'Expanded pipeline metadata, including extraction and validation context, is forthcoming.',
              },
            ].map((item) => (
              <div key={item.heading} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.heading}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency Commitments */}
        <section>
          <SectionHeading title="Transparency Commitments (forthcoming implementation)" />
          <div className="bg-primary-50 rounded-xl p-8 border border-primary-100">
            <ul className="space-y-4">
              {[
                ['Open Data (forthcoming)', 'Public dataset releases are being prepared to support reuse and independent verification.'],
                ['Methodology Disclosure (expanding; forthcoming)', 'Public-facing methods documentation is being expanded as the release workflow matures.'],
                ['Limitation Acknowledgment', 'Transparent reporting of known gaps, biases, and coverage limitations.'],
              ].map(([title, text]) => (
                <li key={title} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">{title}:</span>{' '}
                    <span className="text-gray-600">{text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ethics */}
        <section>
          <SectionHeading
            title="Ethics"
            subtitle="Responsible data collection and use is foundational to G3O."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                heading: 'Responsible Collection',
                text: 'We collect only publicly available information about government institutions and their technology use. We do not scrape private or classified information.',
              },
              {
                heading: 'Privacy Considerations',
                text: 'Government personnel data is handled carefully. We document institutional roles, not personal information about individual civil servants, unless they hold public-facing leadership positions.',
              },
              {
                heading: 'Uncertainty & Limitations',
                text: 'We explicitly document uncertainty in our data. Confidence scores, evidence quality flags, and limitation disclosures are built into every record.',
              },
              {
                heading: 'Documentation Norms',
                text: 'Our commitment to documentation extends to our own processes. Methods, models, and decisions are logged and published alongside the data.',
              },
            ].map((item) => (
              <div key={item.heading} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.heading}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DataAccess;
