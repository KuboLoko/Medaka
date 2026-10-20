/**
 * All sample content for illustrative interfaces lives here.
 * Nothing in this file is real. Firms are generic placeholders, never real names, and every
 * number is internally consistent so that two dashboards never contradict each other:
 * 24 buyer questions x 5 engines = 120 tracked answers, of which 30 name the firm (25%).
 */

export const sampleQuestion = "Which firms specialise in [your service area]?";

export const sampleAnswer = {
  intro:
    "Several firms offer this. The ones below are described most often in the sources reviewed.",
  shortlist: [
    { name: "Firm A", note: "Described as a specialist provider.", ref: 1 },
    {
      name: "Your firm",
      note: "Mentioned, with a partly outdated description.",
      ref: 2,
      you: true,
    },
    { name: "Firm C", note: "Cited in a comparison article.", ref: 3 },
  ],
  sources: [
    { label: "Firm A, services page", kind: "page" as const },
    {
      label: "Your site, about page",
      kind: "site" as const,
      highlight: true,
    },
    { label: "Industry comparison article", kind: "article" as const },
  ],
};

/** Answers naming the firm, by engine, out of 24 tracked questions each. */
export const engineStats = [
  { name: "ChatGPT", mark: "CG", named: 14, total: 24 },
  { name: "Claude", mark: "CL", named: 9, total: 24 },
  { name: "Gemini", mark: "GM", named: 0, total: 24 },
  { name: "Perplexity", mark: "PX", named: 7, total: 24 },
  { name: "Google AI Overviews", mark: "AO", named: 0, total: 24 },
];

/** Share of tracked answers that name the firm, by month. The last value is 30 of 120. */
export const trend = {
  values: [8, 10, 13, 15, 19, 25],
  labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
  unit: "%",
};

export const kpis = {
  answersNamed: { value: "30", suffix: "of 120", note: "+7 vs last month" },
  share: { value: "25%", note: "+6 pts vs last month" },
  engines: { value: "3", suffix: "of 5", note: "+1 engine" },
  questions: { value: "24", note: "tracked each month" },
  changed: { value: "7", note: "answers changed" },
  sources: { value: "38", note: "4 new this month" },
};

export const changes = [
  { kind: "gained", text: "Mentioned in a new answer to a tracked question." },
  { kind: "lost", text: "Dropped from one shortlist; a competitor was cited." },
  { kind: "source", text: "A new article is now cited for two questions." },
  { kind: "gained", text: "Description updated to match the services page." },
];

export const pages = [
  {
    path: "/services/example-service",
    status: "Losing" as const,
    questions: [
      "Who should we speak to about [service]?",
      "What does [service] involve for a firm like ours?",
    ],
    keywords: ["[service] provider", "[service] UK"],
    fix: "Answer the two questions directly near the top of the page and add the supporting facts from the facts base.",
  },
  {
    path: "/about",
    status: "Stable" as const,
    questions: ["Who is behind [firm name]?"],
    keywords: ["[firm name] team", "[firm name] regulated"],
    fix: "Update the description of the firm so it matches the current facts base.",
  },
  {
    path: "/insights/example-guide",
    status: "Gaining" as const,
    questions: ["What are the strongest options for [need]?"],
    keywords: ["[need] options", "[need] guide"],
    fix: "Keep as is. Add a short comparison table to cover a related question.",
  },
];

export const sourceStats = [
  { label: "Your site, about page", kind: "site" as const, n: 14, you: true },
  { label: "Industry comparison article", kind: "article" as const, n: 11 },
  { label: "Firm A, services page", kind: "page" as const, n: 9 },
  { label: "Sector directory listing", kind: "directory" as const, n: 4 },
];

export const facts = [
  { fact: "What the firm does and who it serves", state: "Confirmed" },
  { fact: "Services offered and services not offered", state: "Confirmed" },
  { fact: "Regulatory status wording", state: "Needs review" },
  { fact: "Locations and contact routes", state: "Confirmed" },
  { fact: "Approved wording for fees and terms", state: "Needs review" },
];
