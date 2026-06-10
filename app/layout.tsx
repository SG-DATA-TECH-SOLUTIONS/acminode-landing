import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'ACMINODE',
  description: 'ACMINODE - The High-Availability Operating System for Aircraft Capacity Placement',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
