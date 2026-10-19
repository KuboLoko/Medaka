import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

export const services = [
  {
    title: "AI visibility audit",
    text: "A review of how AI engines describe your firm and which sources they use.",
  },
  {
    title: "Content and website improvements",
    text: "Changes to pages and content so they answer the questions buyers ask.",
  },
  {
    title: "Buyer-question research",
    text: "Work to identify the questions your ideal clients put to AI engines.",
  },
  {
    title: "Facts base development",
    text: "A set of approved facts about your firm to ground all content.",
  },
  {
    title: "Ongoing monitoring and reporting",
    text: "Monthly tracking of answers, sources and changes.",
  },
  {
    title: "Practical recommendations",
    text: "Clear advice on pages, content and positioning.",
  },
];

export function ServiceGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <li key={s.title} data-spotlight className="surface-glass p-6">
          <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" labelledBy="services-title">
      <Reveal>
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="SEOptimist is the expert partner behind Medaka."
          intro="Medaka shows what the engines say. SEOptimist helps you act on it, with people who work on search and content every day."
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <ServiceGrid />
        <div className="mt-8">
          <ButtonLink href="/services" variant="secondary">
            About our services
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
