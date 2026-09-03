import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import AppProviders from '@/context/AppProviders';

export const metadata: Metadata = {
  title: 'Whatbytes E-Commerce Platform',
  description: 'Frontend Developer Assignment - Whatbytes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f5f8fc] text-gray-800 antialiased">
        <AppProviders>
        <Header />
          <div className="flex-1">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}