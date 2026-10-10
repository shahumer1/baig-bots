import PageLayout from "../PageLayout/PageLayout";
import PageHeader from "../PageHeader/PageHeader";
import ContentSection from "../ContentSection/ContentSection";
import FeatureGrid from "../FeatureGrid/FeatureGrid";
import Process from "../Process/Process";
import RelatedPages from "../RelatedPages/RelatedPages";
import { pageContent } from "../../content/siteContent";
import "./ContentPage.css";

export default function ContentPage({ pageId }) {
  const page = pageContent[pageId];
  return (
    <PageLayout className="content-page">
      <PageHeader kicker={page.kicker} title={page.title} lead={page.lead} />
      <ContentSection title={page.introHeading} eyebrow="THE APPROACH" containerClassName="content-intro-inner">
        <p>{page.intro}</p>
      </ContentSection>
      <FeatureGrid title={page.featuresHeading} features={page.features} />
      {page.process && <Process title={page.processHeading} steps={page.process} />}
      <RelatedPages ids={page.related} />
    </PageLayout>
  );
}
