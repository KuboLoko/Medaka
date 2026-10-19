import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { MonthlyReport } from "@/components/mock/MonthlyReport";
import { MonitoringLoop } from "./MonitoringLoop";

const tracked = [
  "Buyer questions tracked",
  "AI engines monitored",
  "Changes in AI answers",
  "Sources cited",
  "Pages gaining or losing visibility",
  "Recommended actions",
];

export function Monitoring() {
  return (
    <Section id="monitoring" labelledBy="monitoring-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <Reveal>
          <SectionHeader
            id="monitoring-title"
            eyebrow="Monthly monitoring"
            title="Medaka re-asks the questions that matter each month."
            intro="AI answers change. A single audit is a snapshot. Monthly monitoring shows what moved, and why it may have moved."
          />
          <ul className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
            {tracked.map((t) => (
              <li
                key={t}
                className="border-t border-line py-3 text-base text-ink-900 last:border-b sm:[&:nth-last-child(2)]:border-b lg:[&:nth-last-child(2)]:border-b-0"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <MonthlyReport />
        </Reveal>
      </div>
      <Reveal className="mt-16">
        <MonitoringLoop />
      </Reveal>
    </Section>
  );
}
