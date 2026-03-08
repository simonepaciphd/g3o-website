function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function TeamCard({ member }) {
  const { name, role, title, affiliation, department, bio, image, links } = member;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-center">
      {/* Avatar */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="mx-auto mb-4 h-28 w-28 rounded-full object-cover border-2 border-primary-100"
        />
      ) : (
        <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-primary-100 text-primary-800 text-2xl font-bold font-serif">
          {getInitials(name)}
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-sm font-medium text-primary-600">{role}</p>
      {title && <p className="text-sm text-gray-700">{title}</p>}
      <p className="text-sm text-gray-500">{affiliation}</p>
      {department && <p className="text-xs text-gray-400 mb-3">{department}</p>}
      {!department && <div className="mb-3" />}
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
              title="Personal website"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </a>
          )}
          {links.institutional && (
            <a
              href={links.institutional}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 transition-colors"
              aria-label={`${name}'s institutional page`}
              title="Institutional profile"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.838 23.838 0 0 0-1.012 5.434c3.58.85 7.264 1.316 11.006 1.316 3.742 0 7.426-.467 11.006-1.316a23.84 23.84 0 0 0-1.012-5.434m-15.482 0A47.578 47.578 0 0 1 12 8.443a47.578 47.578 0 0 1 7.74 1.704M12 2.25l8.25 4.5v1.5H3.75v-1.5L12 2.25Z" />
              </svg>
            </a>
          )}
          {links.scholar && (
            <a
              href={links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 transition-colors"
              aria-label={`${name}'s research profile`}
              title="Research profile"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </a>
          )}
          {links.email && (
            <a
              href={`mailto:${links.email}`}
              className="text-gray-400 hover:text-primary-600 transition-colors"
              aria-label={`Email ${name}`}
              title="Email"
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
