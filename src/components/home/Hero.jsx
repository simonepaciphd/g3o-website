import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#0f1f35] text-white overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)',
            animation: 'float-slow 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
            animation: 'float-slow 25s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full opacity-8"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            animation: 'float-slow 18s ease-in-out infinite 5s',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Horizontal line accents */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: text content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-xs font-medium tracking-widest uppercase text-blue-300 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cross-national measurement project
            </div>

            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6">
              <span className="block text-white/90">{t('hero.title').replace('GenAI Observatory', '')}</span>
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                GenAI Observatory
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/80 max-w-xl mb-4 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <p className="text-sm text-blue-200/50 max-w-lg mb-10 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30"
              >
                {t('hero.cta_explore')}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-7 py-3 rounded-lg bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all"
              >
                {t('hero.cta_learn')}
              </Link>
            </div>
          </div>

          {/* Right: large G3O emblem */}
          <div className="flex-shrink-0 relative select-none pointer-events-none">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full border border-white/[0.08]"
                style={{ animation: 'spin-very-slow 60s linear infinite' }}
              />
              {/* Middle ring */}
              <div
                className="absolute inset-4 rounded-full border border-dashed border-emerald-500/20"
                style={{ animation: 'spin-very-slow 45s linear infinite reverse' }}
              />
              {/* Inner ring */}
              <div className="absolute inset-10 rounded-full border border-blue-400/10" />

              {/* Orbital dots */}
              <div
                className="absolute inset-0"
                style={{ animation: 'spin-very-slow 30s linear infinite' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400/60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400/40" />
              </div>
              <div
                className="absolute inset-0"
                style={{ animation: 'spin-very-slow 40s linear infinite reverse' }}
              >
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400/50" />
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400/30" />
              </div>

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-br from-white/90 via-blue-200/80 to-emerald-300/60 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  G3O
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default Hero;
