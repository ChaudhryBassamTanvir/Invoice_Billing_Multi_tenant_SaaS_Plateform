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
  metadataBase: new URL('http://51.21.180.128'),
  description: 'A Dashboard App where users can create an account , create customers and assign invoices to them. Invoices will be shown at the Dashboard page as a summary. You can also download the invoices',
  openGraph: {
    title: 'Dashboard App,',
    description: 'A Dashboard App where users can create an account, create customers and assign invoices to them. Invoices will be shown at the Dashboard page as a summary. You are allowed to download the invoices.',
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