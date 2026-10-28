import type { Metadata } from 'next';
import { LegalDocument } from '@/components/LegalDocument';
import { legal, site } from '@/content/en';

export const metadata: Metadata = {
  title: `${legal.termsTitle} · ${site.name}`,
  description:
    'Acceptable use of Furkin, who a Household owner may invite, and that the app is not veterinary advice. Dutch law applies.',
};

export default function TermsPage() {
  return <LegalDocument file="terms" title={legal.termsTitle} />;
}
