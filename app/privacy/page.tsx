import type { Metadata } from 'next';
import { LegalDocument } from '@/components/LegalDocument';
import { legal, site } from '@/content/en';

export const metadata: Metadata = {
  title: `${legal.privacyTitle} · ${site.name}`,
  description:
    'Furkin is made by Pixel Witch, a sole proprietorship in The Hague, the Netherlands. Pixel Witch is responsible for the personal data described here.',
};

export default function PrivacyPage() {
  return <LegalDocument file="privacy" title={legal.privacyTitle} />;
}
