import ArrowUpRight from "./ArrowUpRight";
import CircuitDots from "./CircuitDots";
import GraphBackground from "./GraphBackground";
import SectionEyebrow from "./SectionEyebrow";
import SiteContainer from "./SiteContainer";
import { pageContent, serviceGroups } from "../content/siteContent";
import "./ContentPage.css";

function PageHeader({ kicker, title, lead }) {
  return (
    <section className="content-hero">
      <GraphBackground />
      <CircuitDots />
      <SiteContainer className="content-hero-inner">
        <div className="content-hero-copy">
          <SectionEyebrow>{kicker}</SectionEyebrow>
          <h1>{title}</h1>
          <p>{lead}</p>
          <a className="content-primary-link" href="?page=contact">
            Start a conversation <ArrowUpRight />
          </a>
        </div>
        <div className="content-hero-visual" aria-hidden="true">
          <span className="content-orbit content-orbit-one" />
          <span className="content-orbit content-orbit-two" />
          <span className="content-orbit-core">B<span>B</span></span>
          <span className="content-orbit-dot content-orbit-dot-one" />
          <span className="content-orbit-dot content-orbit-dot-two" />
        </div>
      </SiteContainer>
    </section>
  );
}

export function FeatureGrid({ title, features, eyebrow = "WHAT THIS INCLUDES" }) {
  return (
    <section className="content-block content-block-alternate">
      <GraphBackground />
      <SiteContainer className="content-block-inner">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2>{title}</h2>
        <div className="content-feature-grid">
          {features.map(({ title: featureTitle, text }, index) => (
            <article className="content-feature-card" key={featureTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{featureTitle}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}

export function Process({ title, steps, eyebrow = "HOW WE WORK" }) {
  return (
    <section className="content-block">
      <SiteContainer className="content-block-inner">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2>{title}</h2>
        <div className="content-process-grid">
          {steps.map(({ title: stepTitle, text }, index) => (
            <div className="content-process-step" key={stepTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stepTitle}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}

function RelatedPages({ ids }) {
  if (!ids?.length) return null;

  return (
    <section className="content-related">
      <SiteContainer className="content-related-inner">
        <div>
          <SectionEyebrow>KEEP EXPLORING</SectionEyebrow>
          <h2>Find the right next step.</h2>
        </div>
        <div className="content-related-links">
          {ids.map((id) => (
            <a href={"?page=" + id} key={id}>
              {pageContent[id]?.shortTitle || pageContent[id]?.kicker || (id === "services" ? "All services" : "Portfolio")}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}

export function ServiceDirectory() {
  return (
    <main id="top" className="content-page">
      <PageHeader
        kicker="OUR SERVICES"
        title="Connected expertise for the next stage of your business."
        lead="Explore focused support across AI, websites, cloud infrastructure, design, and digital growth."
      />
      {serviceGroups.map((group, groupIndex) => (
        <section className={"content-block" + (groupIndex % 2 === 0 ? " content-block-alternate" : "")} key={group.title}>
          <GraphBackground />
          <SiteContainer className="content-block-inner">
            <SectionEyebrow>SERVICE AREAS</SectionEyebrow>
            <h2>{group.title}</h2>
            <p className="content-group-lead">{group.description}</p>
            <div className="content-feature-grid">
              {group.pages.map((id) => {
                const page = pageContent[id];
                return (
                  <a className="content-service-card" href={"?page=" + id} key={id}>
                    <span>{page.kicker}</span>
                    <h3>{page.shortTitle || page.title}</h3>
                    <p>{page.lead}</p>
                    <ArrowUpRight />
                  </a>
                );
              })}
            </div>
          </SiteContainer>
        </section>
      ))}
      <RelatedPages ids={["about", "portfolio"]} />
    </main>
  );
}

export function ContentPage({ pageId }) {
  const page = pageContent[pageId];

  if (!page) {
    return (
      <main id="top" className="content-page">
        <PageHeader
          kicker="PAGE NOT FOUND"
          title="Let's get you back on track."
          lead="That page is not available. Explore our services or return to the homepage."
        />
        <RelatedPages ids={["services", "about"]} />
      </main>
    );
  }

  return (
    <main id="top" className="content-page">
      <PageHeader kicker={page.kicker} title={page.title} lead={page.lead} />
      <section className="content-block">
        <SiteContainer className="content-intro-inner">
          <SectionEyebrow>THE APPROACH</SectionEyebrow>
          <h2>{page.introHeading}</h2>
          <p>{page.intro}</p>
        </SiteContainer>
      </section>
      <FeatureGrid title={page.featuresHeading} features={page.features} />
      {page.process && <Process title={page.processHeading} steps={page.process} />}
      <RelatedPages ids={page.related} />
    </main>
  );
}
