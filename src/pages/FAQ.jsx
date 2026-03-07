import { faqItems } from '../data/faq';
import FAQAccordion from '../components/common/FAQAccordion';
import CTABlock from '../components/common/CTABlock';

function FAQ() {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-primary-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Common questions about G3O, our data, and how to get involved.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">
        <FAQAccordion items={faqItems} />

        <CTABlock
          title="Still have questions?"
          description="We'd love to hear from you. Reach out and we'll get back to you as soon as we can."
          buttonText="Contact us"
          buttonLink="/contact"
          variant="outline"
        />
      </div>
    </div>
  );
}

export default FAQ;
