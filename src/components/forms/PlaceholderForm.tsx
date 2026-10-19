"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type FieldDef = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
  required?: boolean;
};

const input =
  "mt-1.5 w-full rounded-md border border-ink-900/25 bg-white px-3.5 py-2.5 text-base text-ink-950";

/**
 * UI-only form used by /contact and /members. It never sends or stores anything.
 * Fields are read only to check they are filled, then discarded.
 */
export function PlaceholderForm({
  fields,
  submitLabel,
  notice,
}: {
  fields: FieldDef[];
  submitLabel: string;
  notice: string;
}) {
  const id = useId();
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(e.currentTarget.checkValidity());
    if (!e.currentTarget.checkValidity()) e.currentTarget.reportValidity();
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-5">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={`${id}-${f.name}`} className="text-sm font-medium text-ink-950">
            {f.label}
          </label>
          {f.textarea ? (
            <textarea
              id={`${id}-${f.name}`}
              name={f.name}
              rows={5}
              required={f.required}
              className={input}
            />
          ) : (
            <input
              id={`${id}-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              autoComplete={f.autoComplete}
              required={f.required}
              className={input}
            />
          )}
        </div>
      ))}
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        {submitLabel}
      </Button>
      <div aria-live="polite">
        {done && (
          <p role="status" className="rounded-md border border-line bg-sand px-4 py-3 text-sm text-ink-800">
            {notice}
          </p>
        )}
      </div>
    </form>
  );
}
