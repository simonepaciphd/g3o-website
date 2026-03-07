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
            How to access G3O data, our collection methodology, and our commitments to openness
            and reproducibility.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Access the Data */}
        <section>
          <SectionHeading
            title="Access the Data"
            subtitle="G3O data is designed to be open, versioned, and easy to use."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                heading: 'Download',
                text: 'Download versioned snapshots of the full dataset in CSV, JSON, or Parquet formats.',
                cta: 'Coming soon',
              },
              {
                heading: 'API',
                text: 'Programmatic access via a RESTful API with structured queries by country, institution, and deployment type.',
                cta: 'See below',
              },
              {
                heading: 'Versioned Releases',
                text: 'Each data release is versioned with a full changelog, ensuring reproducibility and longitudinal analysis.',
                cta: 'View releases',
              },
            ].map((item) => (
              <div key={item.heading} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.heading}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.text}</p>
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  {item.cta}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* API Access */}
        <section>
          <SectionHeading
            title="API Access"
            subtitle="Query the G3O dataset programmatically using our RESTful API."
          />
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Example Endpoints
              </h3>
              <CodeBlock>{`GET /api/v1/institutions
GET /api/v1/institutions/{id}
GET /api/v1/countries
GET /api/v1/search?q=chatbot&country=US`}</CodeBlock>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Example Response
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
                API documentation coming soon. Contact us for early access.
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
            title="Provenance & Reproducibility"
            subtitle="Every data point is traceable back to its source."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                heading: 'Record-Level Sources',
                text: 'Each observation links to the original URL, document, or survey response from which it was derived.',
              },
              {
                heading: 'Versioned Datasets',
                text: 'Immutable snapshots with semantic versioning. All changes documented in changelogs with diffs.',
              },
              {
                heading: 'Data Lineage',
                text: 'Full pipeline metadata: extraction model version, query parameters, validation timestamp, and reviewer notes.',
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
          <SectionHeading title="Transparency Commitments" />
          <div className="bg-primary-50 rounded-xl p-8 border border-primary-100">
            <ul className="space-y-4">
              {[
                ['Open Data', 'All datasets released under open licenses enabling reuse and redistribution.'],
                ['Methodology Disclosure', 'Full documentation of collection methods, models used, and validation procedures.'],
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
