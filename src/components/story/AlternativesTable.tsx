import { Container } from "@/components/ui/Layout";

/*
  EXAMPLE FIGURES. Copied from the medaka-v3 reference and NOT verified.
  Do not publish until each row has the supplier's own published price, the page it
  came from and the date it was read. Remove any row that cannot be sourced.
*/
const rows = [
  {
    tool: "Medaka",
    price: "From £149 a month",
    what: "AI visibility monitoring for one firm: buyer questions asked monthly across five engines, named and cited per answer, what to fix first.",
    source: "Example price",
    ours: true,
  },
  {
    tool: "AirOps",
    price: "From £800 a month",
    what: "AI visibility and content platform for marketing teams.",
    source: "Example price, to check",
  },
  {
    tool: "Lumar",
    price: "From £1,500 a month",
    what: "Technical SEO and site intelligence platform with AI visibility features.",
    source: "Example price, to check",
  },
  {
    tool: "An agency retainer",
    price: "From £2,000 a month",
    what: "A person doing the asking and the fixing for you.",
    source: "Example price, to check",
  },
];

export function AlternativesTable() {
  return (
    <section aria-labelledby="alt-title" className="pb-20 sm:pb-28">
      <Container>
        <div data-reveal className="max-w-2xl">
          <h2
            id="alt-title"
            className="font-display text-balance text-4xl leading-[1.05] sm:text-5xl"
          >
            What the alternatives cost
          </h2>
          <p className="text-pretty mt-4 text-ink-600">
            Example prices for now. Before launch each row gets the
            supplier’s own published price, the page it came from and the date
            it was read.
          </p>
        </div>

        <div
          data-reveal
          className="light mt-10 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-paper-soft shadow-[var(--shadow-card)]"
        >
          <table className="w-full min-w-[44rem] text-left text-sm">
            <caption className="sr-only">
              Example comparison of monitoring options. Illustrative prices, not verified.
            </caption>
            <thead className="text-xs text-ink-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Tool</th>
                <th scope="col" className="px-4 py-3 font-medium">Price</th>
                <th scope="col" className="px-4 py-3 font-medium">What it is</th>
                <th scope="col" className="px-4 py-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.tool} className={r.ours ? "bg-sand/70" : undefined}>
                  <th scope="row" className="px-4 py-3 font-medium text-ink-950">{r.tool}</th>
                  <td className="px-4 py-3 text-ink-800">{r.price}</td>
                  <td className="px-4 py-3 text-ink-700">{r.what}</td>
                  <td className="px-4 py-3 text-xs text-ink-600">{r.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
