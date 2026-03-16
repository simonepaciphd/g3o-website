import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import pilotDashboardData from '../data/pilotDashboardData.json';
import { dashboardOverview } from '../data/siteMetrics';
import FilterPanel from '../components/dashboard/FilterPanel';
import InstitutionProfile from '../components/dashboard/InstitutionProfile';

const institutionIndex = new Map(
  pilotDashboardData.institutions.map((institution) => [institution.id, institution]),
);

const statCards = [
  {
    label: 'Countries represented',
    description: 'Across the merged pilot and existing-source release',
    value: dashboardOverview.totalCountries,
  },
  {
    label: 'Institutions in database',
    description: 'All institutions currently represented in the public release',
    value: dashboardOverview.totalInstitutions,
  },
  {
    label: 'Pilot-reviewed institutions',
    description: 'Institutions that currently have a reviewed pilot row',
    value: dashboardOverview.pilotReviewedInstitutions,
  },
  {
    label: 'Pilot-added institutions',
    description: 'Institutions not yet matched to the current existing-source baseline',
    value: dashboardOverview.pilotAddedInstitutions,
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
              This public dashboard offers a preliminary look at how G3O is documenting
              government use of generative AI. It combines reviewed pilot evidence with a current
              institutional baseline from other cross-country sources, and should be read as an
              early research release rather than a complete census.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Institutions are organized by country, tier of government, branch, and region or
              locality where available. The pilot is already surfacing many institutions and
              documented activities that are not yet captured in the current baseline sources.
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
                  {card.value}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-4 text-sm text-emerald-950">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Pilot contribution
              </div>
              <p className="mt-2 leading-relaxed">
                The pilot has reviewed {dashboardOverview.pilotReviewedInstitutions} institutions
                across {dashboardOverview.pilotCountries} countries and currently identifies
                {' '}
                {dashboardOverview.pilotAddedInstitutions} institutions in
                {' '}
                {dashboardOverview.pilotAddedCountries} countries that are not yet matched to the
                current existing-source baseline.
              </p>
              <p className="mt-2 leading-relaxed">
                That includes {dashboardOverview.pilotAddedDocumentedActivityInstitutions}
                {' '}
                institutions with documented activity across
                {' '}
                {dashboardOverview.pilotAddedDocumentedActivityCountries} countries.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Existing-source baseline
              </div>
              <p className="mt-2 leading-relaxed">
                Current baseline sources link {dashboardOverview.existingSourceLinkedInstitutions}
                {' '}
                institutions across {dashboardOverview.existingSourceCountries} countries, with
                {' '}
                {dashboardOverview.matchedPilotAndExistingSourceInstitutions} already matched to
                pilot-reviewed institutions.
              </p>
              <p className="mt-2 leading-relaxed">
                The public release currently includes
                {' '}
                {dashboardOverview.documentedActivityInstitutions} institutions with documented
                activity and {dashboardOverview.namedActivities} named activities overall.
              </p>
            </div>
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
            <InstitutionProfile
              institution={selectedInstitution}
              overview={dashboardOverview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
