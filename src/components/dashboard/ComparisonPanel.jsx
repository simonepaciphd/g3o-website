import { useState } from 'react';

const comparisonFields = [
  { key: 'countryName', label: 'Country' },
  { key: 'tier', label: 'Tier' },
  { key: 'status', label: 'Status' },
  { key: 'tool', label: 'Tool' },
  { key: 'vendor', label: 'Vendor' },
  { key: 'safeguards', label: 'Safeguards' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'dateDocumented', label: 'Date Documented' },
];

function ComparisonPanel({ institution, allInstitutions }) {
  const [peerId, setPeerId] = useState('');

  if (!institution) return null;

  const peerOptions = allInstitutions.filter((i) => i.id !== institution.id);
  const peer = peerOptions.find((i) => i.id === peerId) || null;

  const handleClear = () => setPeerId('');

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="font-serif text-lg font-semibold text-[#1e3a5f]">Peer Comparison</h2>
        <p className="mt-0.5 text-xs text-gray-500">
          Compare {institution.name} with another institution
        </p>
      </div>

      <div className="px-6 py-4">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-gray-500">
          Select a peer institution
        </label>
        <div className="flex gap-3">
          <select
            value={peerId}
            onChange={(e) => setPeerId(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
          >
            <option value="">Choose an institution...</option>
            {peerOptions.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
          {peer && (
            <button
              onClick={handleClear}
              className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {peer && (
        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1e3a5f]/5">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  Field
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#1e3a5f]">
                  {institution.name}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#2563eb]">
                  {peer.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field, idx) => (
                <tr key={field.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="whitespace-nowrap px-6 py-2.5 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {field.label}
                  </td>
                  <td className="px-6 py-2.5 text-gray-800">
                    {institution[field.key] || '\u2014'}
                  </td>
                  <td className="px-6 py-2.5 text-gray-800">
                    {peer[field.key] || '\u2014'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComparisonPanel;
