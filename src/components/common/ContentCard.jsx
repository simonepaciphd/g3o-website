import { Link } from 'react-router-dom';

const statusColors = {
  Published: 'bg-green-100 text-green-800',
  Forthcoming: 'bg-amber-100 text-amber-800',
  Preliminary: 'bg-blue-100 text-blue-800',
  'Call for Papers': 'bg-purple-100 text-purple-800',
};

function ContentCard({ title, subtitle, description, tag, link, status }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {tag && (
          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700">
            {tag}
          </span>
        )}
        {status && (
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mb-2">{subtitle}</p>}
      {description && <p className="text-gray-600 text-sm leading-relaxed flex-1">{description}</p>}
      {link && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          {link.startsWith('http') ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
              Read more &rarr;
            </a>
          ) : (
            <Link to={link} className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors">
              Read more &rarr;
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default ContentCard;
