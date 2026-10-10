import PageLayout from "../../components/PageLayout/PageLayout";
import PageHeader from "../../components/PageHeader/PageHeader";
import FeatureGrid from "../../components/FeatureGrid/FeatureGrid";
import RelatedPages from "../../components/RelatedPages/RelatedPages";
import { pageContent, serviceGroups } from "../../content/siteContent";

export default function Services() {
  return (
    <PageLayout className="content-page">
      <PageHeader kicker="OUR SERVICES" title="Connected expertise for the next stage of your business." lead="Explore focused support across AI, websites, cloud infrastructure, design, and digital growth." />
      {serviceGroups.map((group, index) => <FeatureGrid key={group.title} title={group.title} eyebrow="SERVICE AREAS" lead={group.description} alternate={index % 2 === 0} variant="service"
        features={group.pages.map((id) => ({ title: pageContent[id].shortTitle || pageContent[id].title, text: pageContent[id].lead, kicker: pageContent[id].kicker, href: `?page=${id}` }))} />)}
      <RelatedPages ids={["about", "portfolio"]} />
    </PageLayout>
  );
}
