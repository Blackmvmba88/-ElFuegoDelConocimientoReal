'use client';

import { useState, useEffect } from 'react';
import BookCard from '@/components/BookCard';
import { gutenbergClient } from '@/lib/gutenberg-client';
import { Book } from '@/types';

export const dynamic = 'force-dynamic';

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    loadHermeticBooks();
  }, []);

  const loadHermeticBooks = async () => {
    try {
      setLoading(true);
      const hermeticBooks = await gutenbergClient.getHermeticBooks();
      setBooks(hermeticBooks);
    } catch (error) {
      console.error('Error loading hermetic books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadHermeticBooks();
      return;
    }

    try {
      setSearchLoading(true);
      const response = await gutenbergClient.searchBooks(searchQuery);
      const convertedBooks = response.results.map(b => gutenbergClient.convertToBook(b));
      setBooks(convertedBooks);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDownload = (book: Book) => {
    if (book.downloadUrl) {
      window.open(book.downloadUrl, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-flame-primary to-flame-secondary bg-clip-text text-transparent">
          Biblioteca Viva
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Accede a miles de libros de conocimiento hermético, filosófico y esotérico desde el Proyecto Gutenberg.
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-12">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, autor o tema..."
              className="flex-1 px-6 py-4 rounded-lg bg-white dark:bg-shadow-light border-2 border-gray-300 dark:border-gray-700 focus:border-flame-primary dark:focus:border-flame-secondary outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={searchLoading}
              className="px-8 py-4 bg-gradient-to-r from-flame-primary to-flame-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {searchLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>
      </div>

      {/* Temas sugeridos */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {['philosophy', 'occult', 'mysticism', 'alchemy', 'religion', 'magic'].map((topic) => (
            <button
              key={topic}
              onClick={async () => {
                try {
                  setSearchLoading(true);
                  const response = await gutenbergClient.getBooksByTopic(topic);
                  setBooks(response.results.map(b => gutenbergClient.convertToBook(b)));
                } catch (error) {
                  console.error('Error fetching books by topic:', error);
                } finally {
                  setSearchLoading(false);
                }
              }}
              className="px-4 py-2 rounded-lg bg-white dark:bg-shadow-light border border-gray-300 dark:border-gray-700 hover:border-flame-primary dark:hover:border-flame-secondary text-gray-700 dark:text-gray-300 text-sm transition-colors"
            >
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de libros */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block w-16 h-16 border-4 border-flame-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando biblioteca...</p>
        </div>
      ) : books.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDownload={() => handleDownload(book)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron libros. Intenta con otra búsqueda.
          </p>
        </div>
      )}

      {/* Información sobre Gutenberg */}
      <div className="mt-16 p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Sobre el Proyecto Gutenberg
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          El Proyecto Gutenberg es la biblioteca digital más antigua del mundo, ofreciendo más de 70,000 libros electrónicos gratuitos.
          Todos los libros aquí mostrados son de dominio público y pueden ser descargados libremente.
        </p>
      </div>
    </div>
  );
}
