import type { Metadata } from 'next';
import { Bricolage_Grotesque, Nunito } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { site } from '@/content/en';
import { anchorScrollScript } from '@/lib/scroll';
import { headerScrollScript, themeInitScript } from '@/lib/theme';
import '@/styles/tokens.css';
import '@/styles/components.css';
import '@/styles/site.css';
import '@/styles/fonts.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--nf-display',
});

const body = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--nf-body',
});

// TODO(question): site.description is 131 characters. WEBSITE.md asks for one sentence of 150 to 160. Using the supplied sentence.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://furkin.app'),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  icons: {
    icon: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/favicon-light.svg',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-profile="glacier"
      data-theme="light"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script id="furkin-theme" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script id="furkin-header-scroll" dangerouslySetInnerHTML={{ __html: headerScrollScript }} />
        <script id="furkin-anchor-scroll" dangerouslySetInnerHTML={{ __html: anchorScrollScript }} />
      </head>
      <body className="ws ws-simple" suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
