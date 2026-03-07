const newsItems = [
  {
    date: 'March 2026',
    text: 'G3O pilot data collection launched across 25 countries.',
  },
  {
    date: 'February 2026',
    text: 'Introducing G3O: working paper published on SSRN.',
  },
  {
    date: 'January 2026',
    text: 'G3O website and interactive dashboard released in beta.',
  },
];

function NewsStrip() {
  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">
          Latest Updates
        </h3>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin">
          {newsItems.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white rounded-lg border border-gray-200 px-5 py-4 min-w-[280px] max-w-sm shadow-sm"
            >
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                {item.date}
              </span>
              <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsStrip;
