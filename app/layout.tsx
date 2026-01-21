import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import darkTheme from './lib/dark-theme';
 import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    template: '%s | Nimbus Dashboard',
    default: 'Nimbus Dashboard',
  },
  // metadataBase: new URL(''),
  description: 'A Dashboard App where users can create an account , create customers and assign invoices to them. Invoices will be shown at the Dashboard page as a summary. This project is based on the Next Learn Course, the official Next.js 14 .',
  openGraph: {
    title: 'Dashboard App,',
    description: 'A Dashboard App where users can create an account, create customers and assign invoices to them. Invoices will be shown at the Dashboard page as a summary. This project is based on the Next Learn Course, the official Next.js 14 .',
    siteName: 'Nimbus Dashboard',
    locale: 'en_US'
  }
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased ${darkTheme.bg}`}>{children}



            <Toaster richColors position="top-right" />
      </body>

    </html>
  );
}