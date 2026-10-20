import { Check } from "lucide-react";

/** Short version, used on the homepage. */
export const auditSummary = [
  "You enter your domain. Medaka reads only your public pages.",
  "You can correct what it gets wrong about your firm and its competitors before the run.",
  "It asks ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews your buyers’ questions, live.",
  "It shows which answers named your firm, which competitors were named instead and which websites were cited.",
];

/** The full process, used on the free audit page. */
export const auditSteps = [
  "You enter your domain.",
  "Medaka reads only public pages.",
  "It identifies what your firm sells and its likely competitors, from your own pages.",
  "You can correct anything it gets wrong before the run.",
  "It identifies your buyers’ real questions. If there are not enough real questions, additional likely questions are added and clearly marked.",
  "It asks ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews live, in the way a real buyer would.",
  "It shows which answers named your firm, which competitors were named instead and which websites were cited as sources.",
];

export function FreeAuditList({ variant = "summary" }: { variant?: "summary" | "steps" }) {
  if (variant === "steps") {
    return (
      <ol className="space-y-4">
        {auditSteps.map((d, i) => (
          <li key={d} className="flex items-start gap-4 text-lg leading-snug">
            <span className="mt-0.5 font-mono text-xs leading-6 text-copper-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            {d}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="space-y-3">
      {auditSummary.map((d) => (
        <li key={d} className="flex items-start gap-3 text-lg leading-snug">
          <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-water-700" />
          {d}
        </li>
      ))}
    </ul>
  );
}
