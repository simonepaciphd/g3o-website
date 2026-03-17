import { internalResearch, externalResearch, symposium } from '../data/research';
import SectionHeading from '../components/common/SectionHeading';
import ContentCard from '../components/common/ContentCard';
import CTABlock from '../components/common/CTABlock';

function Research() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">Research</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Explore current G3O publications, forthcoming external research features, and
            collaboration opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* G3O Research */}
        <section>
          <SectionHeading
            title="G3O Research"
            subtitle="Working papers and data reports produced by the G3O team."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internalResearch.map((paper) => (
              <ContentCard
                key={paper.id}
                title={paper.title}
                subtitle={paper.authors}
                description={paper.abstract}
                tag={paper.type}
                status={paper.status}
                link={paper.link}
              />
            ))}
          </div>
        </section>

        {/* External Research */}
        <section>
          <SectionHeading
            title="External Research"
            subtitle="External research showcase and collaboration opportunities using G3O data (forthcoming)."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalResearch.map((paper) => (
              <ContentCard
                key={paper.id}
                title={paper.title}
                subtitle={paper.authors}
                description={paper.abstract}
                tag={paper.type}
                status={paper.status}
                link={paper.link}
              />
            ))}
          </div>
          <div className="mt-8 bg-primary-50 rounded-lg p-6 border border-primary-100">
            <h3 className="font-semibold text-primary-900 mb-2">Call for Papers (forthcoming)</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We plan to open a call for papers for research using G3O data. Early collaboration
              conversations are welcome. Contact us at{' '}
              <a href="mailto:g3o@stanford.edu" className="text-primary-600 hover:underline">
                g3o@stanford.edu
              </a>{' '}
              to register interest in future opportunities.
            </p>
          </div>
        </section>

        {/* Collaborate / Symposium */}
        <section>
          <SectionHeading
            title="Collaborate"
            subtitle="Join a growing community of researchers studying government AI adoption."
          />
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h3 className="font-serif text-2xl font-bold text-primary-900 mb-3">
              {symposium.title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">{symposium.description}</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-gray-800 font-medium">{symposium.date}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-gray-800 font-medium">{symposium.location}</p>
              </div>
            </div>
            {symposium.callForPapers && (
              <p className="text-sm text-accent-600 font-semibold">
                Call for papers details are forthcoming. Contact{' '}
                <a href={`mailto:${symposium.contact}`} className="underline">
                  {symposium.contact}
                </a>{' '}
                to register interest.
              </p>
            )}
          </div>
        </section>

        <CTABlock
          title="Work With Us"
          description="Whether you're a graduate student, established researcher, or policy analyst, we want to hear from you."
          buttonText="Get in touch"
          buttonLink="/contact"
          variant="blue"
        />
      </div>
    </div>
  );
}

export default Research;
