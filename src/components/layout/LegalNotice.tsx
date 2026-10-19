import { legal } from "@/lib/site";

/** Company wording used in the footer and on the legal pages. */
export function LegalNotice({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p>
        {legal.product} {legal.company}
      </p>
      <p className="mt-2">{legal.office}</p>
    </div>
  );
}
