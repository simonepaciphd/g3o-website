import { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { countryCoverage, getCountryCoverage } from '../../data/siteMetrics';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function GlobalMap() {
  const [tooltip, setTooltip] = useState(null);

  const maxCount = useMemo(
    () => Math.max(...countryCoverage.map((entry) => entry.totalInstitutions), 1),
    []
  );

  const colorScale = useMemo(() => {
    const lerp = (a, b, t) => Math.round(a + (b - a) * t);
    const from = [147, 197, 253]; // #93c5fd
    const to = [30, 58, 95]; // #1e3a5f
    return (value) => {
      const t = Math.min(value / maxCount, 1);
      const r = lerp(from[0], to[0], t);
      const g = lerp(from[1], to[1], t);
      const b = lerp(from[2], to[2], t);
      return `rgb(${r},${g},${b})`;
    };
  }, [maxCount]);

  const lookupCountryCoverage = (geography) => {
    const candidateNames = [
      geography.properties?.name,
      geography.properties?.NAME,
      geography.properties?.ADMIN,
      geography.properties?.NAME_LONG,
    ].filter(Boolean);

    for (const candidateName of candidateNames) {
      const match = getCountryCoverage(candidateName);

      if (match) {
        return match;
      }
    }

    return null;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1e3a5f] text-center mb-10">
          Global Coverage
        </h2>

        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-4">
          <ComposableMap
            projectionConfig={{ scale: 147 }}
            className="w-full h-auto"
            style={{ maxHeight: 500 }}
          >
            <ZoomableGroup center={[0, 20]} zoom={1}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const match = lookupCountryCoverage(geo);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={match ? colorScale(match.totalInstitutions) : '#e5e7eb'}
                        stroke="#fff"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (match) {
                            setTooltip({
                              country: match.country,
                              institutions: match.totalInstitutions,
                              activities: match.namedActivities,
                            });
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          default: { outline: 'none' },
                          hover: {
                            fill: match ? '#10b981' : '#d1d5db',
                            outline: 'none',
                            cursor: match ? 'pointer' : 'default',
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {tooltip && (
            <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 pointer-events-none">
              <p className="font-semibold text-[#1e3a5f]">{tooltip.country}</p>
              <p className="text-sm text-gray-600">
                {tooltip.institutions.toLocaleString()} institutions in database
              </p>
              <p className="text-sm text-gray-600">
                {tooltip.activities.toLocaleString()} pilot-documented
                {' '}
                {tooltip.activities === 1 ? 'activity' : 'activities'}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Hover over highlighted countries to see merged database coverage
        </p>
      </div>
    </section>
  );
}

export default GlobalMap;
