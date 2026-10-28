import type { Metadata } from 'next';
import { LegalDocument } from '@/components/LegalDocument';
import { legal, site } from '@/content/en';

export const metadata: Metadata = {
  title: `${legal.privacyTitle} · ${site.name}`,
  description:
    'What personal data Furkin collects, why, who else handles it, and the rights you have under the GDPR.',
};

export default function PrivacyPage() {
  return <LegalDocument file="privacy" title={legal.privacyTitle} draft={false} />;
}
