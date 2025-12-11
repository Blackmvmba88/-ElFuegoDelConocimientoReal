'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-shadow-light/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-flame-primary to-flame-secondary rounded-lg flex items-center justify-center flame-glow">
            <span className="text-2xl">🔥</span>
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            El Fuego del Conocimiento
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="/chambers"
            className="text-gray-700 dark:text-gray-300 hover:text-flame-primary dark:hover:text-flame-secondary transition-colors"
          >
            Cámaras
          </Link>
          <Link
            href="/library"
            className="text-gray-700 dark:text-gray-300 hover:text-flame-primary dark:hover:text-flame-secondary transition-colors"
          >
            Biblioteca
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 text-sm bg-gradient-to-r from-flame-primary to-flame-secondary text-white rounded-md hover:opacity-90 transition-opacity"
            title="Acceso invitado - Nivel 1"
          >
            🚪 Invitado
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
