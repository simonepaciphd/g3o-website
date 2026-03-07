import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { globalStats } from '../../data/institutions';

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
  { key: 'institutions', icon: '\uD83C\uDFDB\uFE0F' },
  { key: 'countries', icon: '\uD83C\uDF0D' },
  { key: 'cases', icon: '\uD83D\uDCC4' },
  { key: 'outputs', icon: '\uD83D\uDCDA' },
];

function StatCard({ statKey, icon }) {
  const { t } = useTranslation();
  const target = globalStats[statKey];
  const { value, ref } = useCountUp(target);

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow px-6 py-8 text-center"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-2">
        {value.toLocaleString()}
      </div>
      <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
        {t(`stats.${statKey}`)}
      </div>
    </div>
  );
}

function StatCounters() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item) => (
            <StatCard key={item.key} statKey={item.key} icon={item.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatCounters;
