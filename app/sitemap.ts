import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ['/', '/privacy', '/terms', '/support'].map((path) => ({
    url: path === '/' ? `${base}/` : `${base}${path}`,
  }));
}
