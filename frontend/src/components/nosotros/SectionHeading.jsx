const SectionHeading = ({ children }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
    <h2 className="text-2xl font-bold text-unmsm-blue">{children}</h2>
    <span className="h-[3px] w-16 md:w-auto md:flex-1 bg-unmsm-green/40 rounded-full" />
  </div>
);

export default SectionHeading;
