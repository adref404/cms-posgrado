const ValueCard = ({ title, description }) => (
  <div className="bg-unmsm-bg rounded-lg p-4 border border-unmsm-line">
    <h4 className="font-semibold text-unmsm-navy mb-1">{title}</h4>
    <p className="text-unmsm-muted text-sm whitespace-pre-line leading-relaxed">
      {description}
    </p>
  </div>
);

export default ValueCard;
