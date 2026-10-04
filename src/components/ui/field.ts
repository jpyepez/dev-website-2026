// src/components/ui/field.ts
// Shared classes for form fields: mono label, flat 2px-radius box, error line below.
// Values and rationale in docs/contact-design.md.

export const fieldLabelClass = "block mb-2 font-mono text-label text-base-content/70";

/** Boxes and chips share this frame; the teal border marks focus and the selected chip. */
export const fieldFrameClass =
  "rounded-[2px] border border-base-300 bg-base-200 hover:border-base-content/30 transition-colors";

export const fieldClass = `${fieldFrameClass} block w-full h-12 px-3.5 text-base md:text-sm text-base-content placeholder:text-base-content/60 focus-visible:border-primary aria-[invalid=true]:border-error`;

/** Reserves one line so an error appearing doesn't push the form down. */
export const fieldErrorClass = "min-h-5 mt-1.5 text-sm text-error";
