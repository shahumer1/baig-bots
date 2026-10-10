import FeatureGrid from "../../../components/FeatureGrid/FeatureGrid";
import Process from "../../../components/Process/Process";

const reasons = [
  { title: "One connected team", text: "Design, development, AI, and growth work together so the experience feels consistent from first idea to launch." },
  { title: "Made for your goals", text: "We start with the problem and shape the solution around your audience, priorities, and resources." },
  { title: "Clear collaboration", text: "Regular conversations and visible progress keep everyone aligned as the work takes shape." },
  { title: "End-to-end thinking", text: "We can help with discovery, creation, launch, and the improvements that follow." },
];

const steps = [
  { title: "Talk through the idea", text: "Share the challenge, the audience, and what a successful outcome would look like." },
  { title: "Shape a plan", text: "We define the right scope, priorities, and path to delivery together." },
  { title: "Build and refine", text: "Design and development move forward with feedback at useful milestones." },
  { title: "Launch and learn", text: "We test, release, and use what we learn to guide the next improvement." },
];

const waysToWork = [
  { title: "Defined project", text: "A focused scope with agreed deliverables and milestones for a clear goal." },
  { title: "Ongoing support", text: "Regular updates and improvements for a product or presence that keeps evolving." },
  { title: "Long-term partnership", text: "Flexible collaboration when your roadmap needs continued attention." },
];

function HomeOverview() {
  return (
    <>
      <FeatureGrid title="Why teams work with Baig Bots." features={reasons} eyebrow="WHY CHOOSE US" />
      <Process title="A clear path from question to launch." steps={steps} />
      <FeatureGrid title="Support shaped around the work." features={waysToWork} eyebrow="WAYS TO WORK" />
    </>
  );
}

export default HomeOverview;
