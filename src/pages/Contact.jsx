import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';

const contactOptions = [
  {
    slug: 'bulk-download',
    title: 'Request Bulk Data Access',
    description:
      'Request access to the current pilot dataset. Requests are reviewed manually, and access is limited while the release workflow is still being finalized.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V3.75m0 12.75l-4.5-4.5m4.5 4.5l4.5-4.5M4.5 20.25h15" />
      </svg>
    ),
  },
  {
    slug: 'submit',
    title: 'Submit Data',
    description:
      'Have evidence of government GenAI use that is not yet in our database? Share it with us through the request form below.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    slug: 'error',
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
    slug: 'add',
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
    slug: 'update',
    title: 'Suggest an Update',
    description:
      'Want to suggest a change to an existing record, classification, or source trail? Send us the details.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    ),
  },
  {
    slug: 'collaboration',
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
    slug: 'research',
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
    slug: 'policy-partnership',
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

const defaultInquiryType = 'research';

function findContactOption(slug) {
  return contactOptions.find((option) => option.slug === slug) || null;
}

function resolveInquiryType(action) {
  return findContactOption(action)?.slug || defaultInquiryType;
}

function buildMailtoHref({
  inquiryType,
  institutionName,
  fullName,
  email,
  affiliation,
  usage,
  details,
  acknowledgedPilotLimits,
}) {
  const option = findContactOption(inquiryType);
  const subject = option
    ? `[G3O] ${option.title}`
    : '[G3O] Contact Request';

  const lines = [
    `Inquiry type: ${option?.title || inquiryType}`,
    institutionName ? `Institution: ${institutionName}` : '',
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Affiliation / organization: ${affiliation}`,
    '',
    'Planned use / request summary:',
    usage,
    '',
    'Additional details:',
    details || 'None provided.',
  ];

  if (inquiryType === 'bulk-download') {
    lines.push(
      '',
      `Acknowledged pilot-only limitations: ${acknowledgedPilotLimits ? 'Yes' : 'No'}`,
      'I understand the current G3O data under discussion are pilot-only, access is limited for now, and the data should not yet be understood as systematic or fully validated.',
    );
  }

  return `mailto:g3o@stanford.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

function Contact() {
  const location = useLocation();
  const [inquiryType, setInquiryType] = useState(defaultInquiryType);
  const [institutionName, setInstitutionName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [usage, setUsage] = useState('');
  const [details, setDetails] = useState('');
  const [acknowledgedPilotLimits, setAcknowledgedPilotLimits] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setInquiryType(resolveInquiryType(params.get('action')));
    setInstitutionName(params.get('institution') || '');
  }, [location.search]);

  useEffect(() => {
    if (location.hash === '#request-form') {
      document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash, location.search]);

  const isBulkDownloadRequest = inquiryType === 'bulk-download';
  const selectedOption = findContactOption(inquiryType);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isBulkDownloadRequest && !acknowledgedPilotLimits) {
      setFormError('Please acknowledge the current pilot-only data limitations before continuing.');
      return;
    }

    setFormError('');

    window.location.href = buildMailtoHref({
      inquiryType,
      institutionName,
      fullName,
      email,
      affiliation,
      usage,
      details,
      acknowledgedPilotLimits,
    });
  };

  const inputClasses =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

  return (
    <div>
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">
            Contact &amp; Contribute
          </h1>
          <p className="mt-3 text-gray-600 max-w-3xl">
            G3O is a collaborative effort. Whether you want to share evidence, report an error,
            request pilot data access, or explore a partnership, we want to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        <section>
          <SectionHeading title="How Can We Help?" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactOptions.map((option) => (
              <div
                key={option.slug}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="text-primary-600 mb-4">{option.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {option.description}
                </p>
                <div className="mt-5">
                  <Link
                    to={`/contact?action=${option.slug}#request-form`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    Start request
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="request-form">
          <SectionHeading
            title="Request Form"
            subtitle="Submitting this form opens a prefilled email draft. The site does not yet have an automated submission backend."
          />

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 bg-gradient-to-br from-[#1e3a5f] to-[#2563eb] px-6 py-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                Selected request
              </div>
              <h2 className="mt-2 font-serif text-2xl font-semibold">
                {selectedOption?.title || 'Contact request'}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-50/90">
                Use this form to send us the key details we need to review your request manually.
                If you do not use a desktop mail client, you can also copy the same information to
                {' '}
                <a href="mailto:g3o@stanford.edu" className="underline">
                  g3o@stanford.edu
                </a>.
              </p>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
                <p className="font-semibold">Current access note</p>
                <p className="mt-2 leading-relaxed">
                  Bulk data access is currently limited and reviewed case by case. The current
                  dataset is pilot only and should not yet be understood as systematic or fully
                  validated.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                      Inquiry type
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(event) => setInquiryType(event.target.value)}
                      className={inputClasses}
                    >
                      {contactOptions.map((option) => (
                        <option key={option.slug} value={option.slug}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                      Institution or record
                    </label>
                    <input
                      type="text"
                      value={institutionName}
                      onChange={(event) => setInstitutionName(event.target.value)}
                      className={inputClasses}
                      placeholder="Optional, but helpful for record-specific requests"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      className={inputClasses}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={inputClasses}
                      placeholder="name@example.org"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                    Affiliation / organization
                  </label>
                  <input
                    type="text"
                    value={affiliation}
                    onChange={(event) => setAffiliation(event.target.value)}
                    className={inputClasses}
                    placeholder="University, agency, nonprofit, company, or independent researcher"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                    {isBulkDownloadRequest ? 'Planned use of the data' : 'Request summary'}
                  </label>
                  <textarea
                    value={usage}
                    onChange={(event) => setUsage(event.target.value)}
                    className={`${inputClasses} min-h-32`}
                    placeholder={
                      isBulkDownloadRequest
                        ? 'Tell us how you plan to use the pilot data, what questions you are studying, and what kind of access you need.'
                        : 'Tell us what you want to share, correct, or request.'
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
                    Additional context
                  </label>
                  <textarea
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                    className={`${inputClasses} min-h-28`}
                    placeholder="Optional extra context, relevant sources, deadlines, or links"
                  />
                </div>

                {isBulkDownloadRequest && (
                  <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={acknowledgedPilotLimits}
                      onChange={(event) => setAcknowledgedPilotLimits(event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span>
                      I understand the current G3O data available through this request are pilot
                      only, access is limited for now, and the data should not yet be understood as
                      systematic or fully validated.
                    </span>
                  </label>
                )}

                {formError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formError}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-xl bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-800"
                  >
                    Open email draft
                  </button>
                  <a
                    href="mailto:g3o@stanford.edu"
                    className="inline-flex items-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Email directly instead
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>

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
