const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex gap-4">
    {Icon && (
      <div className="w-11 h-11 rounded-full bg-unmsm-green/10 flex items-center justify-center flex-shrink-0">
        <Icon className="text-unmsm-green text-xl" />
      </div>
    )}
    <div className="min-w-0">
      <h4 className="font-semibold text-unmsm-navy mb-1">{title}</h4>
      <p className="text-unmsm-muted text-sm whitespace-pre-line leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default ValueCard;
