function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function TeamCard({ member }) {
  const { name, role, affiliation, bio, links } = member;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-center">
      {/* Avatar */}
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-800 text-2xl font-bold font-serif">
        {getInitials(name)}
      </div>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-sm font-medium text-primary-600">{role}</p>
      <p className="text-sm text-gray-500 mb-3">{affiliation}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>

      {/* Links */}
      {links && (
        <div className="mt-4 flex items-center justify-center gap-3">
          {links.website && (
            <a
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 transition-colors"
              aria-label={`${name}'s website`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </a>
          )}
          {links.email && (
            <a
              href={`mailto:${links.email}`}
              className="text-gray-400 hover:text-primary-600 transition-colors"
              aria-label={`Email ${name}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamCard;
