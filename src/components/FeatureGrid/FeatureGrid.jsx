import ContentSection from "../ContentSection/ContentSection";
import InfoCard from "../InfoCard/InfoCard";

export default function FeatureGrid({ title, features, eyebrow = "WHAT THIS INCLUDES", lead, alternate = true, variant = "feature" }) {
  return (
    <ContentSection title={title} eyebrow={eyebrow} lead={lead} alternate={alternate} graph>
      <div className="content-feature-grid">
        {features.map((feature, index) => (
          <InfoCard key={feature.href || feature.title} className={`content-${variant}-card`}
            {...feature} number={variant === "feature" ? String(index + 1).padStart(2, "0") : undefined} arrow={variant === "service"} />
        ))}
      </div>
    </ContentSection>
  );
}
