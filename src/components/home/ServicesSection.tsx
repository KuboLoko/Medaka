import { Activity, Library, Lightbulb, MessagesSquare, PenLine, Search } from "lucide-react";

export const services = [
  {
    icon: Search,
    title: "AI visibility audit",
    text: "A review of how AI engines describe your firm and which sources they use.",
  },
  {
    icon: PenLine,
    title: "Content and website improvements",
    text: "Changes to pages and content so they answer the questions buyers ask.",
  },
  {
    icon: MessagesSquare,
    title: "Buyer-question research",
    text: "Work to identify the questions your ideal clients put to AI engines.",
  },
  {
    icon: Library,
    title: "Facts base development",
    text: "A set of approved facts about your firm to ground all content.",
  },
  {
    icon: Activity,
    title: "Ongoing monitoring and reporting",
    text: "Monthly tracking of answers, sources and changes.",
  },
  {
    icon: Lightbulb,
    title: "Practical recommendations",
    text: "Clear advice on pages, content and positioning.",
  },
];

/** A frosted-glass tile for an icon, in the client's preferred glass style. */
export function GlassIcon({ icon: Icon }: { icon: typeof Search }) {
  return (
    <span
      aria-hidden
      className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/70 backdrop-blur-sm"
    >
      <Icon className="h-5 w-5 text-copper-600" />
    </span>
  );
}

export function ServiceGrid() {
  return (
    <ul data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <li key={s.title} data-spotlight className="surface-glass p-6">
          <GlassIcon icon={s.icon} />
          <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
        </li>
      ))}
    </ul>
  );
}
