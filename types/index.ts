// Tipos para el sistema de grados masónicos
export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33;

export interface Chamber {
  id: string;
  grade: Grade;
  name: string;
  element: 'Silencio' | 'Luz' | 'Fuego' | 'Aire' | 'Éter';
  description: string;
  unlocked: boolean;
  requiredVibration?: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  language?: string;
  downloadUrl?: string;
  formats?: {
    [key: string]: string;
  };
  subjects?: string[];
  coverUrl?: string;
}

export interface GutenbergBook {
  id: number;
  title: string;
  authors: Array<{
    name: string;
    birth_year?: number;
    death_year?: number;
  }>;
  languages: string[];
  formats: {
    [key: string]: string;
  };
  subjects?: string[];
  bookshelves?: string[];
  download_count: number;
}

export interface GutenbergResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutenbergBook[];
}

// Export event schema types
export * from './event-schema';
