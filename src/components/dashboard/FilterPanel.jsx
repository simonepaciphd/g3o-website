import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { buildInstitutionHierarchy } from '../../utils/dashboardUtils';

const evidenceOptions = [
  { value: 'all', label: 'All evidence statuses' },
  { value: 'yes', label: 'Documented activity only' },
  { value: 'unclear', label: 'Unclear / ambiguous only' },
  { value: 'no', label: 'No documented activity only' },
  { value: 'not_reviewed', label: 'Structure only / not yet reviewed' },
];

const originOptions = [
  { value: 'all', label: 'All coverage sources' },
  { value: 'pilot_reviewed', label: 'Pilot-reviewed institutions' },
  { value: 'pilot_added', label: 'Pilot-added institutions' },
  { value: 'existing_source_linked', label: 'Linked to structure file' },
  { value: 'existing_source_only', label: 'Structure-only institutions' },
];

const evidenceBadgeClasses = {
  yes: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  unclear: 'border-amber-200 bg-amber-50 text-amber-700',
  no: 'border-slate-200 bg-slate-100 text-slate-600',
  not_reviewed: 'border-sky-200 bg-sky-50 text-sky-700',
};

function matchesOriginFilter(institution, originFilter) {
  if (originFilter === 'pilot_reviewed') {
    return institution.recordOrigin !== 'master';
  }

  if (originFilter === 'pilot_added') {
    return institution.recordOrigin === 'pilot';
  }

  if (originFilter === 'existing_source_linked') {
    return Boolean(institution.masterRecord);
  }

  if (originFilter === 'existing_source_only') {
    return institution.recordOrigin === 'master';
  }

  return true;
}

function countSummary(institutions) {
  return institutions.reduce(
    (summary, institution) => {
      summary.institutionCount += 1;
      summary.countrySet.add(institution.country);

      if (institution.hasGenaiActivity === 'yes') {
        summary.documentedCount += 1;
      }

      if (institution.recordOrigin === 'pilot') {
        summary.pilotAddedCount += 1;
      }

      return summary;
    },
    {
      institutionCount: 0,
      documentedCount: 0,
      pilotAddedCount: 0,
      countrySet: new Set(),
    },
  );
}

function TreeHeading({ label, count, documentedCount, tone = 'default' }) {
  const toneClasses =
    tone === 'country'
      ? 'bg-[#1e3a5f] text-white'
      : tone === 'branch'
        ? 'bg-[#1e3a5f]/5 text-[#1e3a5f]'
        : 'bg-white text-gray-700';

  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm ${toneClasses}`}
    >
      <span className="font-medium">{label}</span>
      <span className="text-xs opacity-80">
        {count} total
        {typeof documentedCount === 'number' ? ` • ${documentedCount} documented` : ''}
      </span>
    </div>
  );
}

function InstitutionButton({ institution, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(institution)}
      className={`w-full rounded-xl border px-3 py-3 text-left transition ${
        isSelected
          ? 'border-[#2563eb] bg-blue-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/40'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-sm font-semibold text-[#1e3a5f]">{institution.name}</span>
          <span className="mt-1 block text-[11px] text-gray-400">
            Source: {institution.recordOriginLabel}
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            {institution.levelLabel} • {institution.branchLabel} • {institution.regionLabel}
          </span>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
            evidenceBadgeClasses[institution.hasGenaiActivity] || evidenceBadgeClasses.no
          }`}
        >
          {institution.evidenceLabel}
        </span>
      </div>
    </button>
  );
}

function FilterPanel({ institutions, selectedInstitutionId, onInstitutionSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [evidenceFilter, setEvidenceFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [expandedCountries, setExpandedCountries] = useState([]);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const countryOptions = useMemo(() => {
    const countryMap = new Map();

    for (const institution of institutions) {
      if (!countryMap.has(institution.country)) {
        countryMap.set(institution.country, {
          name: institution.country,
          institutionCount: 0,
          documentedCount: 0,
        });
      }

      const entry = countryMap.get(institution.country);
      entry.institutionCount += 1;

      if (institution.hasGenaiActivity === 'yes') {
        entry.documentedCount += 1;
      }
    }

    return [...countryMap.values()].sort((left, right) => left.name.localeCompare(right.name));
  }, [institutions]);

  const filteredInstitutions = useMemo(() => {
    const query = deferredSearchQuery.trim().toLowerCase();

    return institutions.filter((institution) => {
      if (selectedCountry && institution.country !== selectedCountry) {
        return false;
      }

      if (evidenceFilter !== 'all' && institution.hasGenaiActivity !== evidenceFilter) {
        return false;
      }

      if (!matchesOriginFilter(institution, originFilter)) {
        return false;
      }

      if (query && !institution.searchText.includes(query)) {
        return false;
      }

      return true;
    });
  }, [deferredSearchQuery, evidenceFilter, institutions, originFilter, selectedCountry]);

  const hierarchy = useMemo(() => buildInstitutionHierarchy(filteredInstitutions), [filteredInstitutions]);

  const visibleSummary = useMemo(() => countSummary(filteredInstitutions), [filteredInstitutions]);

  const autoExpandCountries = Boolean(selectedCountry || deferredSearchQuery.trim());

  useEffect(() => {
    if (!selectedInstitutionId) {
      return;
    }

    const stillVisible = filteredInstitutions.some(
      (institution) => institution.id === selectedInstitutionId,
    );

    if (!stillVisible) {
      onInstitutionSelect(null);
    }
  }, [filteredInstitutions, onInstitutionSelect, selectedInstitutionId]);

  useEffect(() => {
    if (!selectedInstitutionId) {
      return;
    }

    const selectedInstitution = institutions.find(
      (institution) => institution.id === selectedInstitutionId,
    );

    if (!selectedInstitution) {
      return;
    }

    setExpandedCountries((current) =>
      current.includes(selectedInstitution.country)
        ? current
        : [...current, selectedInstitution.country],
    );
  }, [institutions, selectedInstitutionId]);

  const handleClear = () => {
    setSearchQuery('');
    setSelectedCountry('');
    setEvidenceFilter('all');
    setOriginFilter('all');
  };

  const toggleCountry = (countryName) => {
    setExpandedCountries((current) =>
      current.includes(countryName)
        ? current.filter((country) => country !== countryName)
        : [...current, countryName],
    );
  };

  const selectClasses =
    'w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]';

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-gradient-to-br from-[#1e3a5f] to-[#2563eb] px-5 py-5 text-white">
        <h2 className="font-serif text-xl font-semibold">Institution Navigator</h2>
        <p className="mt-1 text-sm text-blue-50/90">
          Browse the current public release by country, government tier, agency or branch, and region or locality.
        </p>
      </div>

      <div className="space-y-4 p-5">
        <div className="grid gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Country, institution, activity, tool..."
              className={selectClasses}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              Focus Country
            </label>
            <select
              value={selectedCountry}
              onChange={(event) => setSelectedCountry(event.target.value)}
              className={selectClasses}
            >
              <option value="">All countries</option>
              {countryOptions.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name} ({country.institutionCount})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              Evidence Status
            </label>
            <select
              value={evidenceFilter}
              onChange={(event) => setEvidenceFilter(event.target.value)}
              className={selectClasses}
            >
              {evidenceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              Coverage source
            </label>
            <select
              value={originFilter}
              onChange={(event) => setOriginFilter(event.target.value)}
              className={selectClasses}
            >
              {originOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchQuery || selectedCountry || evidenceFilter !== 'all' || originFilter !== 'all') && (
          <button
            type="button"
            onClick={handleClear}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Clear filters
          </button>
        )}

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#f7f9fc] p-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Visible countries
            </div>
            <div className="mt-1 text-lg font-semibold text-[#1e3a5f]">
              {visibleSummary.countrySet.size}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Visible institutions
            </div>
            <div className="mt-1 text-lg font-semibold text-[#1e3a5f]">
              {visibleSummary.institutionCount}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Pilot-added visible
            </div>
            <div className="mt-1 text-lg font-semibold text-[#1e3a5f]">
              {visibleSummary.pilotAddedCount}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Documented activity
            </div>
            <div className="mt-1 text-lg font-semibold text-[#1e3a5f]">
              {visibleSummary.documentedCount}
            </div>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-gray-500">
          Region or locality labels are inferred when the pilot file does not include a dedicated
          region field.
        </p>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Nested structure
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          Country → tier of government → branch → region or locality → institution
        </p>
      </div>

      <div className="max-h-[calc(100vh-15rem)] overflow-y-auto px-5 py-5">
        {hierarchy.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-sm text-gray-500">
            No institutions match the current filters.
          </div>
        ) : (
          <div className="space-y-4">
            {hierarchy.map((countryNode) => {
              const isExpanded =
                autoExpandCountries || expandedCountries.includes(countryNode.key);

              return (
                <section key={countryNode.key} className="rounded-2xl border border-gray-200 bg-white p-3">
                  <button
                    type="button"
                    onClick={() => toggleCountry(countryNode.key)}
                    className="w-full text-left"
                  >
                    <TreeHeading
                      label={countryNode.label}
                      count={countryNode.count}
                      documentedCount={countryNode.documentedCount}
                      tone="country"
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-3">
                      {countryNode.levels.map((levelNode) => (
                        <div key={levelNode.key} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                          <TreeHeading
                            label={levelNode.label}
                            count={levelNode.count}
                            documentedCount={levelNode.documentedCount}
                          />

                          <div className="mt-3 space-y-3">
                            {levelNode.branches.map((branchNode) => (
                              <div key={branchNode.key} className="rounded-xl border border-gray-200 bg-white p-3">
                                <TreeHeading
                                  label={branchNode.label}
                                  count={branchNode.count}
                                  documentedCount={branchNode.documentedCount}
                                  tone="branch"
                                />

                                <div className="mt-3 space-y-3 border-l border-dashed border-gray-200 pl-4">
                                  {branchNode.regions.map((regionNode) => (
                                    <div key={regionNode.key} className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                          {regionNode.label}
                                        </h3>
                                        <span className="text-xs text-gray-400">
                                          {regionNode.count} institution
                                          {regionNode.count !== 1 ? 's' : ''}
                                        </span>
                                      </div>

                                      <div className="space-y-2">
                                        {regionNode.institutions.map((institution) => (
                                          <InstitutionButton
                                            key={institution.id}
                                            institution={institution}
                                            isSelected={institution.id === selectedInstitutionId}
                                            onSelect={onInstitutionSelect}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPanel;
