import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const quickLinks = [
  { to: '/about', label: 'nav.about' },
  { to: '/research', label: 'nav.research' },
  { to: '/dashboard', label: 'nav.dashboard' },
  { to: '/policy', label: 'nav.policy' },
  { to: '/funding', label: 'nav.funding' },
  { to: '/data-access', label: 'nav.data' },
  { to: '/faq', label: 'nav.faq' },
  { to: '/contact', label: 'nav.contact' },
];

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <h3 className="text-xl font-serif font-bold text-white tracking-tight mb-3">G3O</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliations */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Affiliations
            </h4>
            <p className="text-sm leading-relaxed text-gray-400">
              {t('footer.affiliations')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary-800 text-center">
          <p className="text-xs text-gray-500">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
