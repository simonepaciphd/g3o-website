import { useState } from 'react';

function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            className="w-full flex items-center justify-between py-5 px-1 text-left group"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            <span className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors pr-4">
              {item.question}
            </span>
            <span className="shrink-0 ml-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-500 group-hover:border-primary-400 group-hover:text-primary-600 transition-colors">
              {openIndex === i ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'
            }`}
          >
            <p className="text-gray-600 leading-relaxed px-1">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion;
