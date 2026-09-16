import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';

export const metadata: Metadata = {
  title: 'VeriScholar AI — AI-Powered Research & Academic Integrity Review',
  description: "Don't just detect similarity. Verify the work. Evidence-based review platform for faculty, universities, and academic research committees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-surface-light text-charcoal-900 antialiased selection:bg-brand-500 selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
