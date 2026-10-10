import PageLayout from "../../components/PageLayout/PageLayout";
import PageHeader from "../../components/PageHeader/PageHeader";
import RelatedPages from "../../components/RelatedPages/RelatedPages";

export default function NotFound() {
  return <PageLayout className="content-page">
    <PageHeader kicker="PAGE NOT FOUND" title="Let's get you back on track." lead="That page is not available. Explore our services or return to the homepage." />
    <RelatedPages ids={["services", "about"]} />
  </PageLayout>;
}
