import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { countries } from '../../data/institutions';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO 3166-1 alpha-2 to numeric mapping for countries in our dataset
const alpha2ToNumeric = {
  US: '840', GB: '826', FR: '250', DE: '276', NL: '528',
  CA: '124', AU: '036', BR: '076', IN: '356', CN: '156',
  KE: '404', NG: '566', JP: '392', KR: '410', IT: '380',
  ES: '724', SE: '752', AL: '008', SG: '702', EE: '233',
  MX: '484', ZA: '710', CL: '152', CO: '170', AR: '032',
};

function GlobalMap() {
  const { t } = useTranslation();
  const [tooltip, setTooltip] = useState(null);

  const countryByNumeric = useMemo(() => {
    const map = {};
    countries.forEach((c) => {
      const num = alpha2ToNumeric[c.code];
      if (num) map[num] = c;
    });
    return map;
  }, []);

  const maxCount = useMemo(
    () => Math.max(...countries.map((c) => c.count)),
    []
  );

  const colorScale = useMemo(() => {
    // Linear interpolation between light blue and dark blue
    const lerp = (a, b, t) => Math.round(a + (b - a) * t);
    const from = [147, 197, 253]; // #93c5fd
    const to = [30, 58, 95];     // #1e3a5f
    return (value) => {
      const t = Math.min(value / maxCount, 1);
      const r = lerp(from[0], to[0], t);
      const g = lerp(from[1], to[1], t);
      const b = lerp(from[2], to[2], t);
      return `rgb(${r},${g},${b})`;
    };
  }, [maxCount]);

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
                    const numericId = geo.id;
                    const match = countryByNumeric[numericId];
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={match ? colorScale(match.count) : '#e5e7eb'}
                        stroke="#fff"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (match) {
                            setTooltip({
                              name: match.name,
                              count: match.count,
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
              <p className="font-semibold text-[#1e3a5f]">{tooltip.name}</p>
              <p className="text-sm text-gray-600">
                {tooltip.count} documented case{tooltip.count !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Click a country to explore its institutions in the dashboard
        </p>
      </div>
    </section>
  );
}

export default GlobalMap;
