'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-light-primary to-light-secondary dark:from-shadow-dark dark:to-shadow-light">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
