function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="font-serif text-3xl font-bold text-primary-900">{title}</h2>
      <div className="mt-3 h-1 w-16 bg-accent-500 rounded" />
      {subtitle && <p className="mt-4 text-gray-600 max-w-3xl">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
