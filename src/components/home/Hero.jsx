import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-[#1a2e4a] via-[#1e3a5f] to-[#162d50] text-white overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          {t('hero.title')}
        </h1>
        <p className="text-emerald-400 text-2xl md:text-3xl font-bold tracking-widest mb-6">
          ({t('hero.acronym')})
        </p>
        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-4">
          {t('hero.subtitle')}
        </p>
        <p className="text-base text-blue-200/80 max-w-2xl mx-auto mb-10">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors shadow-lg shadow-emerald-500/25"
          >
            {t('hero.cta_explore')}
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-semibold text-base transition-colors"
          >
            {t('hero.cta_learn')}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-semibold text-base transition-colors"
          >
            {t('hero.cta_contribute')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
