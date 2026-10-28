import type { Metadata } from 'next';
import { LegalDocument } from '@/components/LegalDocument';
import { legal, site } from '@/content/en';

export const metadata: Metadata = {
  title: `${legal.termsTitle} · ${site.name}`,
  description:
    'The agreement between you and Pixel Witch for using Furkin, covering Households, plans, acceptable use and liability. Dutch law applies.',
};

export default function TermsPage() {
  return <LegalDocument file="terms" title={legal.termsTitle} draft={false} />;
}
