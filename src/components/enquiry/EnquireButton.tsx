"use client";

import { useEnquiry } from "./EnquiryProvider";

type Props = {
  packageId?: string;
  source: string;
  /** Open the short quote form rather than the offer popup. */
  quote?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Any "Enquire / Book / Plan" CTA — opens the shared enquiry modal. */
export default function EnquireButton({ packageId, source, quote, className = "sr-btn sr-btn--maroon", children }: Props) {
  const { open } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => open({ packageId, source, quote })}>
      {children}
    </button>
  );
}
