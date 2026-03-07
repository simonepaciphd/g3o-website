import {
  bestPractices,
  highlightedCases,
  legislativeTemplate,
  disclosureTemplate,
} from '../data/policy';
import SectionHeading from '../components/common/SectionHeading';

const categoryColors = {
  Transparency: 'bg-blue-100 text-blue-800',
  Governance: 'bg-purple-100 text-purple-800',
  Safeguards: 'bg-amber-100 text-amber-800',
  Accountability: 'bg-green-100 text-green-800',
  Procurement: 'bg-rose-100 text-rose-800',
};

function Policy() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">Policy</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Evidence-based guidance, highlighted cases, and model legislation for responsible
            government use of generative AI.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Best Practices */}
        <section>
          <SectionHeading
            title="Best Practices"
            subtitle="Key principles for responsible government deployment of generative AI, drawn from comparative evidence."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((bp) => (
              <div
                key={bp.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${
                    categoryColors[bp.category] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {bp.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2">{bp.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{bp.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlighted Cases */}
        <section>
          <SectionHeading
            title="Highlighted Cases"
            subtitle="Notable examples of government GenAI deployment with lessons for policymakers."
          />
          <div className="space-y-6">
            {highlightedCases.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700">
                    {c.country}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{c.summary}</p>
                <div className="bg-accent-500/5 border-l-4 border-accent-500 rounded-r-lg px-4 py-3">
                  <p className="text-sm font-semibold text-accent-600 mb-1">Lessons Learned</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.lessons}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* G3O Policy Proposals */}
        <section>
          <SectionHeading
            title="G3O Policy Proposals"
            subtitle="Model frameworks designed to advance transparency and accountability in government GenAI use."
          />

          {/* Legislative Template */}
          <div className="mb-12">
            <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
              {legislativeTemplate.title}
            </h3>
            <div className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-300 bg-gray-100">
                <p className="font-serif text-gray-700 italic leading-relaxed">
                  {legislativeTemplate.preamble}
                </p>
              </div>
              {legislativeTemplate.sections.map((section, i) => (
                <div
                  key={i}
                  className={`p-6 md:p-8 ${
                    i < legislativeTemplate.sections.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <h4 className="font-serif font-bold text-primary-900 mb-3">{section.heading}</h4>
                  <p className="font-serif text-gray-700 leading-relaxed text-sm">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclosure Template */}
          <div>
            <h3 className="font-serif text-xl font-bold text-primary-900 mb-2">
              {disclosureTemplate.title}
            </h3>
            <p className="text-gray-600 mb-6 max-w-3xl">{disclosureTemplate.description}</p>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-primary-800 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Field</th>
                    <th className="text-left px-5 py-3 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {disclosureTemplate.fields.map((field, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-5 py-3 font-medium text-gray-900 border-t border-gray-200">
                        {field.label}
                      </td>
                      <td className="px-5 py-3 text-gray-600 border-t border-gray-200">
                        {field.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Policy;
