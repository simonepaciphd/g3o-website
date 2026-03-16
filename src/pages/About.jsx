import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';

function About() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">About G3O</h1>
          <p className="mt-4 text-primary-200 text-lg max-w-3xl">
            The Global Government GenAI Observatory
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Mission */}
        <section>
          <SectionHeading title="Our Mission" />
          <p className="text-gray-700 leading-relaxed max-w-4xl">
            G3O's mission is to create a public, auditable dataset measuring generative AI activity
            across government institutions globally. We aim to provide the first systematic,
            cross-national, cross-institutional measurement of how governments adopt, govern, and
            deploy generative AI — enabling evidence-based research and informed policymaking.
          </p>
        </section>

        {/* Why This Observatory */}
        <section>
          <SectionHeading
            title="Why This Observatory"
            subtitle="Existing evidence on government AI adoption is fragmented, geographically biased, and insufficient for comparative inference."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {
                heading: 'Fragmented Evidence',
                text: 'Current knowledge about government AI use is scattered across news articles, press releases, and one-off reports with no consistent methodology or structure.',
              },
              {
                heading: 'Geographic Bias',
                text: 'Existing studies overwhelmingly focus on a handful of wealthy democracies, leaving most of the world undocumented and under-analyzed.',
              },
              {
                heading: 'Insufficient for Inference',
                text: 'Without standardized measurement, researchers cannot make valid comparisons across countries, institution types, or time periods.',
              },
            ].map((item) => (
              <div key={item.heading} className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold text-primary-900 mb-2">{item.heading}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Document */}
        <section>
          <SectionHeading title="What We Document" />
          <div className="flex flex-wrap gap-3">
            {[
              'Public statements',
              'Policies',
              'Pilot programs',
              'Active deployments',
              'Tools & platforms',
              'Vendors',
              'Safeguards',
              'Governance frameworks',
            ].map((item) => (
              <span
                key={item}
                className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed max-w-4xl">
            We track every form of government engagement with generative AI — from initial policy
            announcements and procurement decisions to full-scale deployments and governance
            structures. Each record includes structured metadata, source documentation, and
            confidence assessments.
          </p>
        </section>

        {/* Scope */}
        <section>
          <SectionHeading title="Scope" />
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <p className="text-4xl font-bold font-serif text-primary-800 mb-2">~700,000</p>
            <p className="text-gray-600 mb-4">public institutions in scope</p>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              G3O's ambition spans national and subnational levels of government — including
              parliaments, courts, ministries, agencies, regulatory bodies, and local authorities.
              Our phased data collection strategy begins with national-level institutions across
              all countries and progressively expands to subnational coverage.
            </p>
          </div>
        </section>

        {/* Transparency */}
        <section>
          <SectionHeading title="Transparency" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                heading: 'Open Data',
                text: 'All data will be publicly available under open licenses, enabling independent verification and reuse.',
              },
              {
                heading: 'Versioned Releases',
                text: 'Datasets are released in versioned snapshots with full changelogs, ensuring reproducibility over time.',
              },
              {
                heading: 'Record-Level Provenance',
                text: 'Every data point links back to its original source, extraction method, and confidence score.',
              },
            ].map((item) => (
              <div key={item.heading} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.heading}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Research and Policy */}
        <section>
          <SectionHeading
            title="Research & Policy"
            subtitle="G3O supports both academic research and evidence-based policy development."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/research"
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-primary-800 group-hover:text-primary-600 transition-colors mb-2">
                Research &rarr;
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore G3O working papers, methods documentation, and opportunities to collaborate
                on research using our data.
              </p>
            </Link>
            <Link
              to="/policy"
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-semibold text-primary-800 group-hover:text-primary-600 transition-colors mb-2">
                Policy &rarr;
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Best practices, highlighted cases, and model legislation for government GenAI
                transparency and governance.
              </p>
            </Link>
          </div>
        </section>

        <section>
          <SectionHeading
            title="More Information"
            subtitle="These pages remain part of the site and provide detail on access, support, and ways to get involved."
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                to: '/funding',
                title: 'Funding & Support',
                text: 'Learn how the initiative is supported and how we protect research independence.',
              },
              {
                to: '/data-access',
                title: 'Data Access',
                text: 'Read about data access plans, methods, provenance, and transparency commitments.',
              },
              {
                to: '/faq',
                title: 'FAQ',
                text: 'Find quick answers to common questions about G3O, the pilot, and collaboration.',
              },
              {
                to: '/contact',
                title: 'Contact',
                text: 'Reach out to report an issue, contribute evidence, or explore a partnership.',
              },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-primary-800 mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
