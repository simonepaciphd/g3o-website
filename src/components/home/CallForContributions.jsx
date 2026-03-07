import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const actions = [
  {
    key: 'submit',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 3.75 3.75 0 013.547 5.594A4.5 4.5 0 0118 19.5H6.75z" />
      </svg>
    ),
  },
  {
    key: 'report_missing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
      </svg>
    ),
  },
  {
    key: 'report_error',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    key: 'collaborate',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

function CallForContributions() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-br from-[#1e3a5f] to-[#162d50] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
          {t('contribute.title')}
        </h2>
        <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-10">
          {t('contribute.subtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Link
              key={action.key}
              to="/contact"
              className="group flex flex-col items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-6 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                {action.icon}
              </div>
              <span className="font-semibold text-sm">
                {t(`contribute.${action.key}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CallForContributions;
