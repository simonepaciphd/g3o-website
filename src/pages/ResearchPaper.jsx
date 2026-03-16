import { Link } from 'react-router-dom';
import paperPdf from '../../Docs/Paci 2026 -Introducing G3O.pdf';

const contributionPoints = [
  'Introduces G3O as a global, institution-level measurement initiative focused on government use of generative AI.',
  'Explains why comparative research needs a structured panel rather than scattered case studies and press coverage.',
  'Outlines the pilot design, evidence standards, and long-run ambition to build comparable cross-country coverage.',
];

function ResearchPaper() {
  return (
    <div>
      <div className="border-b border-gray-200 bg-primary-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Link
            to="/research"
            className="text-sm font-medium text-primary-600 transition hover:text-primary-800"
          >
            &larr; Back to Research
          </Link>
          <h1 className="mt-4 font-serif text-4xl font-bold text-primary-900">
            The G3O Initiative: Building a Global Panel of Government GenAI Use
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            Simone Paci, Lowry Pressly, Nathan Feldman
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
              Working Paper
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              Preliminary Draft
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 space-y-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,24rem)]">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Overview
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              This draft introduces the Global Government GenAI Observatory (G3O), a new effort to
              build systematic, comparable evidence on how public institutions are adopting,
              governing, and experimenting with generative AI. It sets out the motivation for the
              project, the logic of the pilot, and the foundations for a global panel dataset that
              can support both policy analysis and academic research.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              The paper is still a working draft and should be read as an evolving research
              document. We are sharing it publicly to clarify the initiative's scope and invite
              collaboration around methods, evidence standards, and future data collection.
            </p>
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Access
            </h2>
            <div className="mt-4 space-y-3">
              <a
                href={paperPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-primary-800 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                Open PDF
              </a>
              <a
                href={paperPdf}
                download="Paci-2026-Introducing-G3O.pdf"
                className="block rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Download PDF
              </a>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Status</dt>
                <dd className="font-medium text-gray-800">Current draft</dd>
              </div>
              <div>
                <dt className="text-gray-500">Date</dt>
                <dd className="font-medium text-gray-800">2026</dd>
              </div>
              <div>
                <dt className="text-gray-500">Format</dt>
                <dd className="font-medium text-gray-800">PDF</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Why this paper matters
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {contributionPoints.map((point) => (
              <div key={point} className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm leading-relaxed text-gray-700">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4 px-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              PDF Preview
            </h2>
            <a
              href={paperPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary-600 transition hover:text-primary-800"
            >
              Open in new tab
            </a>
          </div>
          <iframe
            title="The G3O Initiative PDF preview"
            src={paperPdf}
            className="h-[70vh] w-full rounded-xl border border-gray-200"
          />
        </section>
      </div>
    </div>
  );
}

export default ResearchPaper;
