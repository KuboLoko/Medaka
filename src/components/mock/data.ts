/**
 * All sample content for illustrative interfaces lives here.
 * Nothing in this file is real. Firms are generic placeholders, never real names.
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

export const engines = [
  { name: "ChatGPT", status: "Mentioned", level: 3 },
  { name: "Claude", status: "Mentioned", level: 2 },
  { name: "Gemini", status: "Not mentioned", level: 0 },
  { name: "Perplexity", status: "Mentioned", level: 1 },
  { name: "Google AI Overviews", status: "Not mentioned", level: 0 },
];

export const monthly = {
  values: [2, 2, 3, 3, 4, 5],
  labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
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

export const facts = [
  { fact: "What the firm does and who it serves", state: "Confirmed" },
  { fact: "Services offered and services not offered", state: "Confirmed" },
  { fact: "Regulatory status wording", state: "Needs review" },
  { fact: "Locations and contact routes", state: "Confirmed" },
  { fact: "Approved wording for fees and terms", state: "Needs review" },
];
