import { Link } from 'react-router-dom';

const statusColors = {
  Active: 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20',
  Pilot: 'bg-amber-50 text-amber-700 border-amber-200',
  Planned: 'bg-blue-50 text-[#2563eb] border-blue-200',
};

const confidenceColors = {
  High: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Low: 'bg-red-50 text-red-600 border-red-200',
};

function Badge({ label, colorMap }) {
  const colors = colorMap[label] || 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors}`}>
      {label}
    </span>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-t border-gray-100 px-6 py-4">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">{title}</h3>
      {children}
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-gray-800">{value || '\u2014'}</dd>
    </div>
  );
}

function InstitutionProfile({ institution }) {
  if (!institution) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="mt-3 text-sm text-gray-500">Select an institution from the panel to view its profile</p>
        </div>
      </div>
    );
  }

  const inst = institution;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] px-6 py-5">
        <h2 className="font-serif text-xl font-bold text-white">{inst.name}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge label={inst.status} colorMap={statusColors} />
          <Badge label={`${inst.confidence} confidence`} colorMap={{ [`${inst.confidence} confidence`]: confidenceColors[inst.confidence] }} />
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4 px-6 py-4 sm:grid-cols-3 lg:grid-cols-5">
        <MetaItem label="Country" value={inst.countryName} />
        <MetaItem label="Region" value={inst.region} />
        <MetaItem label="Locality" value={inst.locality} />
        <MetaItem label="Tier" value={inst.tier} />
        <MetaItem label="Date Documented" value={inst.dateDocumented} />
      </div>

      {/* Evidence */}
      <Section title="Evidence of GenAI Usage">
        <p className="text-sm leading-relaxed text-gray-700">{inst.evidenceSummary}</p>
      </Section>

      {/* Tool & Vendor */}
      <Section title="Tool &amp; Vendor">
        <div className="grid grid-cols-2 gap-4">
          <MetaItem label="Tool" value={inst.tool} />
          <MetaItem label="Vendor" value={inst.vendor} />
        </div>
      </Section>

      {/* Safeguards */}
      <Section title="Safeguards">
        <p className="text-sm leading-relaxed text-gray-700">{inst.safeguards || 'No safeguard information available.'}</p>
      </Section>

      {/* Source & Provenance */}
      <Section title="Source &amp; Provenance">
        <p className="text-sm text-gray-700">{inst.source}</p>
        {inst.sourceUrl && inst.sourceUrl !== '#' && (
          <a
            href={inst.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm font-medium text-[#2563eb] hover:underline"
          >
            View source
          </a>
        )}
      </Section>

      {/* Notes */}
      {inst.notes && (
        <Section title="Notes">
          <p className="text-sm italic leading-relaxed text-gray-600">{inst.notes}</p>
        </Section>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 border-t border-gray-100 px-6 py-4">
        <Link
          to={`/contact?action=error&institution=${encodeURIComponent(inst.name)}`}
          className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Report an Error
        </Link>
        <Link
          to={`/contact?action=add&institution=${encodeURIComponent(inst.name)}`}
          className="rounded-md border border-[#2563eb] px-4 py-2 text-sm font-medium text-[#2563eb] transition hover:bg-blue-50"
        >
          Add Information
        </Link>
        <Link
          to={`/contact?action=update&institution=${encodeURIComponent(inst.name)}`}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Suggest an Update
        </Link>
      </div>
    </div>
  );
}

export default InstitutionProfile;
