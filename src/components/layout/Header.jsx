import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navItems = [
  { to: '/', label: 'nav.home' },
  { to: '/dashboard', label: 'nav.dashboard' },
  { to: '/about', label: 'nav.about' },
  { to: '/team', label: 'nav.team' },
  { to: '/funding', label: 'nav.funding' },
  { to: '/research', label: 'nav.research' },
  { to: '/policy', label: 'nav.policy' },
  { to: '/data-access', label: 'nav.data' },
  { to: '/faq', label: 'nav.faq' },
  { to: '/contact', label: 'nav.contact' },
];

function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-primary-600 border-b-2 border-primary-600'
        : 'text-gray-600 hover:text-primary-700'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold font-serif text-primary-800 tracking-tight">
              G3O
            </span>
            <span className="hidden sm:inline text-xs text-gray-500 border-l border-gray-300 pl-2">
              Global Government GenAI Observatory
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClasses}>
                {t(item.label)}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary-700 hover:bg-gray-100"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-700'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {t(item.label)}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
