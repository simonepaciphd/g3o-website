import SectionHeading from '../components/common/SectionHeading';

const contactOptions = [
  {
    title: 'Submit Data',
    description:
      'Have evidence of government GenAI use that is not yet in our database? A structured submission workflow is forthcoming; for now, please email us directly.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: 'Report an Error',
    description:
      'Found inaccurate information in the dataset? Let us know so we can investigate and correct the record.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Add Information',
    description:
      'Have additional context about an institution already in the database? Help us enrich existing records.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    title: 'Suggest a Collaboration',
    description:
      'Interested in partnering with G3O on data collection, tool development, or regional coverage expansion?',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Research Inquiries',
    description:
      'Looking for early data access, want to discuss methodology, or interested in using G3O data in your research?',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'Policy Partnership Inquiries',
    description:
      'Representing a government, international organization, or think tank? Explore how G3O can support your policy work.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
];

function Contact() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">
            Contact &amp; Contribute
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            G3O is a collaborative effort. Whether you want to share evidence, report an error, or
            explore a partnership, we want to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Contact Options Grid */}
        <section>
          <SectionHeading title="How Can We Help?" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactOptions.map((option) => (
              <div
                key={option.title}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="text-primary-600 mb-4">{option.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {option.description}
                </p>
                <div className="mt-5">
                  <a
                    href="mailto:g3o@stanford.edu"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    Get in touch
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* General Contact */}
        <section>
          <div className="bg-primary-800 rounded-xl px-8 py-10 text-center text-white">
            <h3 className="font-serif text-2xl font-bold mb-3">General Contact</h3>
            <p className="opacity-90 mb-4 max-w-xl mx-auto">
              For any inquiries not covered above, reach out to us directly.
            </p>
            <a
              href="mailto:g3o@stanford.edu"
              className="inline-block bg-white text-primary-800 rounded-lg px-6 py-3 text-sm font-semibold hover:bg-primary-50 transition-colors"
            >
              g3o@stanford.edu
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
