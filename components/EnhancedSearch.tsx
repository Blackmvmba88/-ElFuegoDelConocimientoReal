"use client";

import { useState, useEffect } from 'react';
import { useBookSearch } from '@/lib/use-api';

interface SearchFilters {
  author?: string;
  language?: string;
  element?: string;
  symbol?: string;
}

export default function EnhancedSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const { results, loading, error, searchBooks } = useBookSearch();

  const handleSearch = async () => {
    if (query.trim()) {
      await searchBooks(query, filters);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-amber-600 dark:text-amber-400">
          🔍 Búsqueda Inteligente
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Búsqueda semántica con análisis hermético
        </p>
      </div>

      {/* Search Input */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Buscar textos herméticos, alquímicos, masónicos..."
            className="flex-1 px-4 py-3 rounded-lg border-2 border-amber-200 dark:border-amber-900 
                     bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                     focus:border-amber-500 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 
                     text-white font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {/* Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
        >
          {showFilters ? '▲ Ocultar filtros' : '▼ Mostrar filtros avanzados'}
        </button>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 
                         bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Elemento
              </label>
              <select
                value={filters.element || ''}
                onChange={(e) => setFilters({ ...filters, element: e.target.value })}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600
                         bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="">Todos</option>
                <option value="fire">🔥 Fuego</option>
                <option value="water">💧 Agua</option>
                <option value="air">💨 Aire</option>
                <option value="earth">🌍 Tierra</option>
                <option value="ether">✨ Éter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Símbolos
              </label>
              <select
                value={filters.symbol || ''}
                onChange={(e) => setFilters({ ...filters, symbol: e.target.value })}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600
                         bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="">Todos</option>
                <option value="alchemical">⚗️ Alquímicos</option>
                <option value="masonic">🔺 Masónicos</option>
                <option value="kabbalistic">✡️ Cabalísticos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                Idioma
              </label>
              <select
                value={filters.language || ''}
                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600
                         bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="">Todos</option>
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="la">Latin</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilters({})}
                className="w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600
                         hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
          Error: {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {results.total} resultados encontrados para "{results.query}"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.results.map((book: any) => (
              <div
                key={book.id}
                className="p-4 rounded-lg border-2 border-amber-200 dark:border-amber-900
                         bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-slate-100">
                  {book.title}
                </h3>
                {book.author && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    por {book.author}
                  </p>
                )}
                {book.description && (
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 line-clamp-3">
                    {book.description}
                  </p>
                )}

                {/* Hermetic Metadata */}
                <div className="space-y-2 text-xs">
                  {book.hermetic_symbols && book.hermetic_symbols.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {book.hermetic_symbols.slice(0, 3).map((symbol: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 
                                   text-purple-700 dark:text-purple-300"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  )}

                  {book.elemental_energy && Object.keys(book.elemental_energy).length > 0 && (
                    <div className="flex gap-1 text-xs">
                      {Object.entries(book.elemental_energy)
                        .filter(([_, value]) => (value as number) > 0.2)
                        .map(([element, value]) => (
                          <span
                            key={element}
                            className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30
                                     text-blue-700 dark:text-blue-300"
                          >
                            {element}: {((value as number) * 100).toFixed(0)}%
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <button className="mt-3 text-sm text-amber-600 dark:text-amber-400 hover:underline">
                  Ver detalles →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !results && !error && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          <p>Ingresa una búsqueda para descubrir textos herméticos</p>
        </div>
      )}
    </div>
  );
}
