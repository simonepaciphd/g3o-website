import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import pilotDashboardData from '../data/pilotDashboardData.json';
import FilterPanel from '../components/dashboard/FilterPanel';
import InstitutionProfile from '../components/dashboard/InstitutionProfile';

const institutionIndex = new Map(
  pilotDashboardData.institutions.map((institution) => [institution.id, institution]),
);

const statCards = [
  {
    label: 'Countries',
    description: 'Countries currently represented in the pilot backend',
    value: (meta) => meta.countryCount,
  },
  {
    label: 'Institutions',
    description: 'Unique institutions grouped from the full CSV',
    value: (meta) => meta.institutionCount,
  },
  {
    label: 'Named activities',
    description: 'Activity rows extracted from the pilot backend',
    value: (meta) => meta.activityCount,
  },
  {
    label: 'Structure fills',
    description: 'Institutions added from the current master file without pilot review rows yet',
    value: (meta) => meta.evidenceCounts.not_reviewed,
  },
];

function Dashboard() {
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);

  const selectedInstitution = useMemo(() => {
    if (!selectedInstitutionId) {
      return null;
    }

    return institutionIndex.get(selectedInstitutionId) || null;
  }, [selectedInstitutionId]);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="font-serif text-3xl font-bold text-[#1e3a5f]">Pilot Institution Dashboard</h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              This public dashboard offers an early look at G3O's pilot data collection on
              government use of generative AI. Coverage is preliminary and still expanding, so the
              dashboard should be read as a research pilot rather than a complete census of public
              institutions worldwide.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Institutions are organized by country, tier of government, branch, and region or
              locality where available. Some structural coverage is included to show where pilot
              evidence collection is still in progress.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-gray-400">
              Generated {new Date(pilotDashboardData.generatedAt).toLocaleString()}
            </p>
            <div className="mt-4">
              <Link
                to="/data-access"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-[#1e3a5f] transition hover:bg-blue-100"
              >
                Read about data access and methodology
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-gray-200 bg-[#f7f9fc] p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {card.label}
                </div>
                <div className="mt-2 text-3xl font-semibold text-[#1e3a5f]">
                  {card.value(pilotDashboardData.meta)}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm text-blue-900">
            <span className="font-semibold">Coverage in this pilot release:</span>
            {' '}
            {pilotDashboardData.meta.evidenceCounts.yes} institutions with documented activity,
            {' '}
            {pilotDashboardData.meta.evidenceCounts.unclear} ambiguous records, and
            {' '}
            {pilotDashboardData.meta.evidenceCounts.no} institutions with no documented activity.
            {' '}
            The merge also fills
            {' '}
            {pilotDashboardData.meta.evidenceCounts.not_reviewed}
            {' '}
            structure-only institutions from the current master file.
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
          <div className="min-w-0 xl:sticky xl:top-8 xl:self-start">
            <FilterPanel
              institutions={pilotDashboardData.institutions}
              selectedInstitutionId={selectedInstitutionId}
              onInstitutionSelect={(institution) => setSelectedInstitutionId(institution?.id || null)}
            />
          </div>

          <div className="min-w-0">
            <InstitutionProfile institution={selectedInstitution} meta={pilotDashboardData.meta} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
