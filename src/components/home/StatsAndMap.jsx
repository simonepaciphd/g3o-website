import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { countryCoverage, getCountryCoverage, homeStats } from '../../data/siteMetrics';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

const statItems = [
  { key: 'institutions', label: 'Institutions' },
  { key: 'countries', label: 'Countries' },
  { key: 'cases', label: 'Cases' },
];

function StatPill({ statKey }) {
  const { t } = useTranslation();
  const target = homeStats[statKey];
  const { value, ref } = useCountUp(target);

  return (
    <div ref={ref} className="flex items-baseline gap-2">
      <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
        {value.toLocaleString()}
      </span>
      <span className="text-xs text-blue-300/70 font-medium uppercase tracking-wider">
        {t(`stats.${statKey}`)}
      </span>
    </div>
  );
}

function StatsAndMap() {
  const [tooltip, setTooltip] = useState(null);

  const maxCount = useMemo(
    () => Math.max(...countryCoverage.map((entry) => entry.totalInstitutions), 1),
    []
  );

  const colorScale = useMemo(() => {
    const lerp = (a, b, t) => Math.round(a + (b - a) * t);
    const from = [59, 130, 246]; // blue-500ish
    const to = [16, 185, 129];  // emerald-500
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
    <section className="bg-[#0f1f35] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white/90">
              Global Coverage
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-200/75">
              Coverage combines pilot-reviewed institutions with currently linked existing-source
              baselines. Activity counts reflect named GenAI uses documented in the pilot.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {statItems.map((item) => (
              <StatPill key={item.key} statKey={item.key} />
            ))}
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a1628]">
          <ComposableMap
            projectionConfig={{ scale: 147 }}
            className="w-full h-auto"
            style={{ maxHeight: 380 }}
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
                        fill={match ? colorScale(match.totalInstitutions) : '#1a2744'}
                        stroke="#0f1f35"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (match) {
                            setTooltip(match);
                          }
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          default: { outline: 'none' },
                          hover: {
                            fill: match ? '#10b981' : '#243553',
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
            <div className="absolute top-3 right-3 bg-[#1e3a5f]/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl px-4 py-2.5 pointer-events-none">
              <p className="font-semibold text-white text-sm">{tooltip.country}</p>
              <p className="text-xs text-blue-200/70">
                {tooltip.totalInstitutions.toLocaleString()} institutions in database
              </p>
              <p className="text-xs text-blue-200/70">
                {tooltip.namedActivities.toLocaleString()} pilot-documented
                {' '}
                {tooltip.namedActivities === 1 ? 'activity' : 'activities'}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-blue-300/40 mt-3">
          Hover over highlighted countries to see merged database coverage
        </p>
      </div>
    </section>
  );
}

export default StatsAndMap;
