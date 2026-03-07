import { useState } from 'react';
import { sampleInstitutions } from '../data/institutions';
import FilterPanel from '../components/dashboard/FilterPanel';
import InstitutionProfile from '../components/dashboard/InstitutionProfile';
import ComparisonPanel from '../components/dashboard/ComparisonPanel';

function Dashboard() {
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-[#1e3a5f]">Explore the Data</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Browse and compare government institutions adopting generative AI worldwide.
            Use the filters to narrow your search, then select an institution to view its
            full profile and evidence record.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Filter Panel */}
          <div className="w-full shrink-0 lg:w-1/3">
            <div className="lg:sticky lg:top-8">
              <FilterPanel onInstitutionSelect={setSelectedInstitution} />
            </div>
          </div>

          {/* Right: Profile + Comparison */}
          <div className="min-w-0 flex-1">
            <InstitutionProfile institution={selectedInstitution} />
            <ComparisonPanel
              institution={selectedInstitution}
              allInstitutions={sampleInstitutions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
