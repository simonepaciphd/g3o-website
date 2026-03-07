import { useState, useMemo } from 'react';
import { countries, institutionTypes, regions, sampleInstitutions } from '../../data/institutions';

function FilterPanel({ onInstitutionSelect }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const availableRegions = selectedCountry ? (regions[selectedCountry] || []) : [];

  const filteredInstitutions = useMemo(() => {
    return sampleInstitutions.filter((inst) => {
      if (selectedCountry && inst.country !== selectedCountry) return false;
      if (selectedType && inst.tier !== selectedType) return false;
      if (selectedRegion && inst.region !== selectedRegion) return false;
      if (searchQuery && !inst.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedCountry, selectedType, selectedRegion, searchQuery]);

  const handleClear = () => {
    setSelectedCountry('');
    setSelectedType('');
    setSelectedRegion('');
    setSearchQuery('');
    onInstitutionSelect(null);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedRegion('');
    setSearchQuery('');
  };

  const selectClasses =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400';

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="font-serif text-lg font-semibold text-[#1e3a5f]">Filter Institutions</h2>
        <p className="mt-0.5 text-xs text-gray-500">Narrow your search step by step</p>
      </div>

      <div className="space-y-4 p-5">
        {/* Step 1: Country */}
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
            1. Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className={selectClasses}
          >
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.count})
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Institution Type */}
        {selectedCountry && (
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              2. Institution Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={selectClasses}
            >
              <option value="">All types</option>
              {institutionTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3: Region */}
        {selectedCountry && selectedType && (
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              3. Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              disabled={availableRegions.length === 0}
              className={selectClasses}
            >
              <option value="">
                {availableRegions.length === 0 ? 'No regions available' : 'All regions'}
              </option>
              {availableRegions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 4: Search */}
        {selectedCountry && selectedType && (
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
              4. Search Institution
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search..."
              className={selectClasses}
            />
          </div>
        )}

        {/* Clear Filters */}
        {(selectedCountry || selectedType || selectedRegion || searchQuery) && (
          <button
            onClick={handleClear}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results */}
      {filteredInstitutions.length > 0 && (
        <div className="border-t border-gray-100">
          <div className="px-5 py-3">
            <p className="text-xs font-medium text-gray-500">
              {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {filteredInstitutions.map((inst) => (
              <li key={inst.id}>
                <button
                  onClick={() => onInstitutionSelect(inst)}
                  className="w-full border-t border-gray-50 px-5 py-3 text-left transition hover:bg-blue-50"
                >
                  <span className="block text-sm font-medium text-[#1e3a5f]">{inst.name}</span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {inst.countryName} &middot; {inst.tier}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCountry && filteredInstitutions.length === 0 && (
        <div className="border-t border-gray-100 px-5 py-6 text-center">
          <p className="text-sm text-gray-400">No institutions match your filters.</p>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
