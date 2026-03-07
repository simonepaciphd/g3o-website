import { Link } from 'react-router-dom';

const variants = {
  blue: 'bg-primary-800 text-white',
  green: 'bg-accent-500 text-white',
  outline: 'bg-white border-2 border-primary-800 text-primary-800',
};

const buttonVariants = {
  blue: 'bg-white text-primary-800 hover:bg-primary-50',
  green: 'bg-white text-accent-600 hover:bg-green-50',
  outline: 'bg-primary-800 text-white hover:bg-primary-900',
};

function CTABlock({ title, description, buttonText, buttonLink, variant = 'blue' }) {
  return (
    <div className={`rounded-xl px-8 py-10 text-center ${variants[variant]}`}>
      <h3 className="font-serif text-2xl font-bold mb-3">{title}</h3>
      {description && <p className="max-w-2xl mx-auto mb-6 opacity-90">{description}</p>}
      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className={`inline-block rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${buttonVariants[variant]}`}
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

export default CTABlock;
