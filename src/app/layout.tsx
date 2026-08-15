import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import { ToastProvider } from '@/components/ui/toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'NetWatch NOC - Network Operations Center',
  description:
    'NetWatch NOC is a 24/7 network operations center monitoring platform for telecom infrastructure.',
  keywords: [
    'NOC', 'network operations', 'telecom monitoring', 'network topology',
    'incident management', 'bandwidth monitoring', 'network health',
  ],
  authors: [{ name: 'NetWatch NOC Team' }],
  creator: 'NetWatch NOC',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://noc.netwatch.example.com',
    siteName: 'NetWatch NOC',
    title: 'NetWatch NOC - Network Operations Center Dashboard',
    description: '24/7 network monitoring dashboard for telecom infrastructure.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NetWatch NOC Dashboard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NetWatch NOC - Network Operations Center',
    description: '24/7 network monitoring dashboard for telecom infrastructure.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://noc.netwatch.example.com' },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable} dark`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NetWatch NOC',
              url: 'https://noc.netwatch.example.com',
              description: '24/7 Network Operations Center for telecom infrastructure.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-800-NOC-WATCH',
                contactType: 'technical support',
                availableLanguage: ['English'],
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                  opens: '00:00', closes: '23:59',
                },
              },
            }),
          }}
        />
      </head>
      <body className="bg-base text-white min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
