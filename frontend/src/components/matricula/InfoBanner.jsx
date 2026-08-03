const TONES = {
  blue: {
    bg: "bg-unmsm-blue/5",
    border: "border-unmsm-blue",
    icon: "text-unmsm-blue",
    title: "text-unmsm-navy",
  },
  green: {
    bg: "bg-unmsm-green/10",
    border: "border-unmsm-green",
    icon: "text-unmsm-green",
    title: "text-unmsm-navy",
  },
  guinda: {
    bg: "bg-unmsm-guinda/5",
    border: "border-unmsm-guinda",
    icon: "text-unmsm-guinda",
    title: "text-unmsm-guinda",
  },
};

const InfoBanner = ({ icon: Icon, title, children, tone = "blue" }) => {
  const t = TONES[tone] || TONES.blue;

  return (
    <div className={`${t.bg} border-l-4 ${t.border} p-6 rounded-r-lg`}>
      <div className="flex items-start">
        {Icon && (
          <Icon className={`${t.icon} text-2xl mt-1 mr-3 flex-shrink-0`} />
        )}
        <div>
          {title && (
            <h3 className={`text-lg font-semibold ${t.title} mb-2`}>{title}</h3>
          )}
          <div className="text-unmsm-muted">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
