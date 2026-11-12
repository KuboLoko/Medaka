import { DomainCheck } from "@/components/forms/DomainCheck";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeader } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

/*
  Option 1: the static homepage layout from the NEWSITE brief. Plain stacked sections, no
  pinned panels and no scroll-driven animation. Not linked from the navigation and kept out
  of search results while the copy is reviewed.
*/
export const metadata = pageMetadata({
  title: "AI visibility and reputation for finance firms",
  description:
    "Medaka helps finance firms see and fix what AI engines say about them, and where their data goes.",
  path: "/option-1",
  noindex: true,
});

const pillars = [
  {
    target: "Heads of Marketing, Business Development & Growth",
    title: "AI Reputation Management & Search Visibility (with Content & SEO)",
    body: "We monitor how your firm, partners and competitors appear in search and generative answers. We identify inaccurate descriptions, outdated service information and missing commercial facts, then provide page-level implementation packets to defend your rankings and cover the questions prospective clients ask.",
    extra:
      "Delivered either as turnkey page remediation or as marked-up implementation packets for your existing in-house team or agency.",
  },
  {
    target: "CTOs, Heads of Compliance, Data Protection Officers",
    title: "Data Sovereignty & Private AI Systems",
    body: "Protect confidential client information and keep corporate data under your control. We audit website data flows, review third-party AI exposure, and set up private, self-hosted AI environments that keep client data out of public commercial models.",
  },
  {
    target: "CFOs, Finance Directors, FP&A Leads",
    title: "Practical AI Automation for Finance Teams",
    body: "High-impact, low-risk process automation for internal finance operations. We design working workflows for document data extraction, financial reconciliation and structured management reporting, alongside fractional AI advisory.",
  },
];

const steps = [
  ["Understand the Business", "Map your services, target clients, approved claims and named competitors."],
  ["Establish the Baseline", "Run the audit to profile mentions, citations and source answers across the five engines."],
  ["Prioritise the Work", "Build a worst-gap-first page implementation queue."],
  ["Make the Changes", "Draft content, structure schema, or configure private AI instances."],
  ["Review & Approve", "Route every update through a rendered before-and-after review sheet for compliance approval."],
  ["Measure Again", "Re-run the identical baseline prompts to verify what changed."],
] as const;

const sectors = [
  ["Mid-Tier Accountancy, Tax & Insolvency Practices", "Protecting client origination across mandatory audit and counter-cyclical insolvency queries."],
  ["IFAs, Wealth Managers & DFMs", "High-value client acquisition, where a single retained mandate covers an entire year of advisory."],
  ["Commercial Insurance Brokers", "Defending market share during policy comparison shopping and corporate consolidation."],
  ["Mortgage Brokers & Specialist Lenders", "Covering bridging, development and asset finance refinancing demand."],
  ["Established / Listed Fintech", "Enterprise technology businesses with profitable corporate parents."],
] as const;

export default function OptionOnePage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-line pb-16 pt-16 sm:pb-24 sm:pt-24">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow="AI Visibility, Reputation Management & Data Sovereignty for Finance Firms"
            title="We fix what AI says about your firm, and where your data goes."
            intro="Medaka helps UK and European wealth managers, accountancy practices and commercial finance firms protect how they are represented across ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews, without ungrounded claims or data leakage."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/free-audit" size="lg">
              Run Your Domain Audit
            </ButtonLink>
            <ButtonLink href="#process" variant="secondary" size="lg">
              How It Works
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-ink-600">
            Ungated diagnostic • Queries five engines with real buyer prompts
          </p>
        </Container>
      </div>

      {/* Reframe */}
      <Section tone="raise" labelledBy="reframe-title">
        <SectionHeader
          id="reframe-title"
          eyebrow="The measurement gap"
          title="Good SEO is necessary, but not sufficient for AI visibility."
          intro="One discipline, not two. When prospective clients ask AI answer engines who to instruct, the models recommend two or three firms. If your firm is left out, you can lose high-value mandates before you know they existed. When engines state outdated fee structures, stale interest rates or incorrect regulatory permissions, that can create regulatory exposure."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="light surface-light p-6 sm:p-8">
            <h3 className="font-display text-2xl font-normal">The dashboard trap</h3>
            <p className="mt-4 text-sm font-medium text-ink-950">What standard tools do</p>
            <p className="mt-1 text-ink-700">
              Hand your team a score, an alert, or an arbitrary to-do list, and stop at the dashboard.
            </p>
            <p className="mt-4 text-sm font-medium text-ink-950">The limitation</p>
            <p className="mt-1 text-ink-700">
              Monitoring tools cannot remediate pages, and agencies cannot re-measure their work on the same instrument.
            </p>
          </div>
          <div className="light surface-light p-6 sm:p-8">
            <h3 className="font-display text-2xl font-normal">The Medaka standard</h3>
            <p className="mt-4 text-sm font-medium text-ink-950">What Medaka does</p>
            <p className="mt-1 text-ink-700">
              We connect diagnostic discovery directly to page-by-page remediation packets, and re-measure on the identical instrument.
            </p>
            <p className="mt-4 text-sm font-medium text-ink-950">The principle</p>
            <p className="mt-1 text-ink-700">
              Your SEO team is the right team. They are simply missing one measurement, and it is not one you can buy off a dashboard.
            </p>
          </div>
        </div>
      </Section>

      {/* Three pillars */}
      <Section labelledBy="pillars-title">
        <SectionHeader
          id="pillars-title"
          title="Three connected needs. One specialised partner."
          intro="How we support marketing, risk and finance leadership."
        />
        <ol className="mt-12 grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.title} className="light surface-light p-6">
              <p className="font-mono text-[11px] text-ink-500">0{i + 1}</p>
              <h3 className="font-display mt-3 text-2xl font-normal">{p.title}</h3>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.06em] text-ink-600">
                For {p.target}
              </p>
              <p className="text-pretty mt-4 text-sm leading-relaxed text-ink-800">{p.body}</p>
              {"extra" in p && (
                <p className="text-pretty mt-4 text-sm leading-relaxed text-ink-700">{p.extra}</p>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* Process and governance */}
      <Section id="process" tone="raise" labelledBy="process-title">
        <SectionHeader
          id="process-title"
          eyebrow="Canonical process"
          title="Process-driven remediation with compliance sign-off."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(([title, text], i) => (
            <li key={title} className="light surface-light p-6">
              <p className="font-mono text-[11px] text-ink-500">0{i + 1}</p>
              <h3 className="font-display mt-3 text-xl font-normal">{title}</h3>
              <p className="text-pretty mt-2 text-sm leading-relaxed text-ink-700">{text}</p>
            </li>
          ))}
        </ol>
        <p className="light surface-light mt-8 max-w-3xl p-6 text-ink-900">
          Every claim is grounded in approved facts. No content or technical update goes live without your compliance team’s written approval.
        </p>
      </Section>

      {/* Sector specialisation */}
      <Section labelledBy="sectors-title">
        <SectionHeader
          id="sectors-title"
          title="Deep in finance. Built for regulated firms."
          intro="Who we partner with."
        />
        <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {sectors.map(([name, text]) => (
            <li key={name} className="border-t border-line pt-4">
              <h3 className="font-medium text-ink-950">{name}</h3>
              <p className="text-pretty mt-1 text-ink-700">{text}</p>
            </li>
          ))}
        </ul>
        <p className="light surface-light mt-10 max-w-3xl p-6 text-ink-900">
          To maintain institutional standing and regulatory rigour, we do not work with early-stage venture fintech, crypto or retail FX trading, buy-now-pay-later, subprime lenders, or consumer debt packagers.
        </p>
      </Section>

      {/* Evidence and founder */}
      <Section tone="raise" labelledBy="evidence-title">
        <SectionHeader
          id="evidence-title"
          eyebrow="The evidence standard"
          title="Grounded proof. No hidden figures."
          intro="An EU-wide corporate visibility programme, measured on the client’s own analytics dashboard. Period: May to July (year to be confirmed)."
        />
        <dl className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="light surface-light p-6">
            <dt className="text-sm text-ink-600">Category bottom-of-funnel mentions</dt>
            <dd className="font-display mt-2 text-4xl leading-none text-ink-950">
              17.7% <span className="text-ink-500">to</span> 34.5%
            </dd>
            <dd className="mt-2 text-xs text-ink-600">May to July. Roughly doubled.</dd>
          </div>
          <div className="light surface-light p-6">
            <dt className="text-sm text-ink-600">Citations</dt>
            <dd className="font-display mt-2 text-4xl leading-none text-ink-950">Fell</dd>
            <dd className="mt-2 text-xs text-ink-600">Temporarily, over the same May to July period.</dd>
          </div>
          <div className="light surface-light p-6">
            <dt className="text-sm text-ink-600">German brand mentions</dt>
            <dd className="font-display mt-2 text-4xl leading-none text-ink-950">
              0% <span className="text-ink-500">to</span> 98%
            </dd>
            <dd className="mt-2 text-xs text-ink-600">May to July.</dd>
          </div>
        </dl>
        <p className="text-pretty mt-6 max-w-3xl text-ink-700">
          We report both the rise in mentions and the dip in citations, because a partner who reports setbacks alongside wins is easier to trust.
        </p>
        <div className="mt-10 max-w-3xl space-y-3 text-ink-700">
          <p>
            Led directly by <strong className="font-medium text-ink-950">James Finlayson</strong>, drawing on 10 years of experience building multilingual content systems across English, French, German and Spanish.
          </p>
          <p className="text-sm text-ink-600">
            A product of SEOptimist, trading under Web Pebble Ltd (England and Wales Company No. 07926157; ICO Registration ZC233949).
          </p>
        </div>
      </Section>

      {/* Final audit call to action */}
      <Section tone="deep" labelledBy="audit-title">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="audit-title"
            className="font-display text-balance text-4xl leading-[1.05] sm:text-5xl"
          >
            See what ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews say about your firm.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-600">
            Enter your domain. Our audit engine runs your services against real buyer prompts and reports verbatim who was recommended instead, which sources were cited, and why.
          </p>
          <DomainCheck
            stacked
            placeholder="Enter your company domain"
            buttonLabel="Run free AI visibility audit"
            className="mx-auto mt-9 max-w-lg text-left"
          />
          <p className="mt-4 text-sm text-ink-600">
            No credit card required • No software installation
          </p>
        </div>
      </Section>
    </>
  );
}
