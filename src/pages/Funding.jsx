import { funders, fundingNote } from '../data/funders';
import SectionHeading from '../components/common/SectionHeading';
import CTABlock from '../components/common/CTABlock';

function Funding() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">Funding &amp; Support</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            G3O is supported by leading academic institutions committed to independent research
            on government technology adoption.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Funders */}
        <section>
          <SectionHeading title="Our Supporters" />
          <div className="grid md:grid-cols-2 gap-8">
            {funders.map((funder) => (
              <div
                key={funder.id}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-5">
                  {/* Logo placeholder */}
                  <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-lg bg-primary-100 text-primary-700 font-bold font-serif text-xl">
                    {funder.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{funder.name}</h3>
                    <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700">
                      {funder.type}
                    </span>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                      {funder.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Independence Disclaimer */}
        <section>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h3 className="font-serif text-xl font-bold text-primary-900 mb-3">
              Independence &amp; Integrity
            </h3>
            <p className="text-gray-700 leading-relaxed">{fundingNote}</p>
          </div>
        </section>

        {/* Support CTA */}
        <CTABlock
          title="Support G3O"
          description="Interested in supporting independent research on government AI adoption? We welcome partnerships with foundations, academic institutions, and public organizations."
          buttonText="Contact us"
          buttonLink="/contact"
          variant="green"
        />
      </div>
    </div>
  );
}

export default Funding;
