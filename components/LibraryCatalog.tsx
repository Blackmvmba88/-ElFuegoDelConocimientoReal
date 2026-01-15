'use client';

import React, { useState, useMemo } from 'react';
import { 
  CATALOG_CATEGORIES, 
  COMPLETE_CATALOG, 
  getBooksByCategory, 
  searchBooks,
  getCatalogStats,
  type BookCategory,
  type CatalogBook 
} from '@/lib/library-catalog';

const categoryColors = {
  'hermeticism-alchemy': 'from-amber-500 to-orange-600',
  'masonry-initiation': 'from-blue-500 to-indigo-600',
  'universal-sapiential': 'from-purple-500 to-violet-600',
  'physics-mathematics': 'from-emerald-500 to-teal-600',
  'language-symbol': 'from-rose-500 to-pink-600',
};

const categoryBorders = {
  'hermeticism-alchemy': 'border-amber-500',
  'masonry-initiation': 'border-blue-500',
  'universal-sapiential': 'border-purple-500',
  'physics-mathematics': 'border-emerald-500',
  'language-symbol': 'border-rose-500',
};

export default function LibraryCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'all'>('all');
  const [selectedDegree, setSelectedDegree] = useState<number>(33); // Show all by default
  const [searchQuery, setSearchQuery] = useState('');
  const [showEssentialOnly, setShowEssentialOnly] = useState(false);

  const stats = getCatalogStats();

  // Filter books based on selected criteria
  const filteredBooks = useMemo(() => {
    let books = COMPLETE_CATALOG;

    // Apply category filter
    if (selectedCategory !== 'all') {
      books = getBooksByCategory(selectedCategory);
    }

    // Apply degree filter
    books = books.filter(book => 
      !book.degreeRecommendation || book.degreeRecommendation <= selectedDegree
    );

    // Apply search query
    if (searchQuery.trim()) {
      books = searchBooks(searchQuery).filter(book => books.includes(book));
    }

    // Apply essential filter
    if (showEssentialOnly) {
      books = books.filter(book => book.importance === 'essential');
    }

    return books;
  }, [selectedCategory, selectedDegree, searchQuery, showEssentialOnly]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          📚 Biblioteca Iniciática Operativa
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {stats.totalBooks} textos fundamentales organizados en 5 tradiciones sapienciales.
          De la antigüedad ({' '}~1000 a.C.{' '}) hasta la modernidad (1989).
        </p>
      </div>

      {/* Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalBooks}</div>
          <div className="text-sm text-muted-foreground">Textos Total</div>
        </div>
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{stats.publicDomain}</div>
          <div className="text-sm text-muted-foreground">Dominio Público</div>
        </div>
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-500">{stats.essential}</div>
          <div className="text-sm text-muted-foreground">Esenciales</div>
        </div>
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-500">5</div>
          <div className="text-sm text-muted-foreground">Tradiciones</div>
        </div>
        <div className="bg-card border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">33</div>
          <div className="text-sm text-muted-foreground">Grados</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">🔍 Filtros</h2>
        
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">Buscar</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Título, autor, keywords..."
            className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
            >
              Todas
            </button>
            {Object.values(CATALOG_CATEGORIES).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${categoryColors[cat.id]} text-white`
                    : 'hover:bg-accent'
                }`}
              >
                {cat.symbol} {cat.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Degree Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Grado Masónico: {selectedDegree === 33 ? 'Todos' : selectedDegree}°
          </label>
          <input
            type="range"
            min="1"
            max="33"
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1° Aprendiz</span>
            <span>18° Rosa Cruz</span>
            <span>33° Inspector</span>
          </div>
        </div>

        {/* Essential Only Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="essential-only"
            checked={showEssentialOnly}
            onChange={(e) => setShowEssentialOnly(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="essential-only" className="text-sm font-medium cursor-pointer">
            Solo textos esenciales
          </label>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Mostrando {filteredBooks.length} de {stats.totalBooks} textos
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No se encontraron textos con los filtros actuales.</p>
          <p className="text-sm mt-2">Intenta ajustar los filtros o la búsqueda.</p>
        </div>
      )}
    </div>
  );
}

function BookCard({ book }: { book: CatalogBook }) {
  const category = CATALOG_CATEGORIES[book.category];
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className={`bg-card border-2 ${categoryBorders[book.category]} rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer`}
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Header */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start justify-between">
          <span className="text-2xl">{category.symbol}</span>
          {book.importance === 'essential' && (
            <span className="px-2 py-1 bg-amber-500/20 text-amber-500 text-xs rounded-full">
              ⭐ Esencial
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg leading-tight line-clamp-2">
          {book.title}
        </h3>
        
        {book.originalTitle && book.originalTitle !== book.title && (
          <p className="text-sm text-muted-foreground italic">
            {book.originalTitle}
          </p>
        )}
        
        <p className="text-sm text-muted-foreground">
          {book.author} {book.year && `(${book.year < 0 ? `${Math.abs(book.year)} a.C.` : book.year})`}
        </p>
      </div>

      {/* Description */}
      <p className={`text-sm text-muted-foreground mb-4 ${showDetails ? '' : 'line-clamp-3'}`}>
        {book.description}
      </p>

      {/* Metadata */}
      <div className="space-y-2 text-xs">
        {book.degreeRecommendation && (
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">🎓 Grado:</span>
            <span className="font-medium">{book.degreeRecommendation}°</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">📖 Idioma:</span>
          <span className="font-medium">{book.language === 'visual' ? 'Visual (sin texto)' : book.language}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">⚖️ Licencia:</span>
          <span className={`font-medium ${book.publicDomain ? 'text-green-500' : 'text-orange-500'}`}>
            {book.publicDomain ? 'Dominio Público' : 'Copyright'}
          </span>
        </div>
      </div>

      {/* Keywords */}
      {showDetails && book.keywords.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-1">
            {book.keywords.slice(0, 5).map((keyword, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-accent text-xs rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {showDetails && book.sources.length > 0 && (
        <div className="mt-4 pt-4 border-t space-y-2">
          <div className="font-medium text-sm">📥 Fuentes disponibles:</div>
          {book.sources.map((source, idx) => (
            <a
              key={idx}
              href={source.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block text-sm text-primary hover:underline"
            >
              {source.name === 'gutenberg' && '📚 Project Gutenberg'}
              {source.name === 'archive' && '🏛️ Internet Archive'}
              {source.name === 'wikisource' && '📖 Wikisource'}
              {source.name === 'sacred-texts' && '🕉️ Sacred Texts'}
              {source.name === 'hathitrust' && '📜 HathiTrust'}
              {source.id && ` (#${source.id})`}
            </a>
          ))}
        </div>
      )}

      {/* Hermetic Symbols */}
      {showDetails && book.hermeticSymbols && book.hermeticSymbols.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="font-medium text-sm mb-2">🜍 Símbolos herméticos:</div>
          <div className="flex flex-wrap gap-1">
            {book.hermeticSymbols.map((symbol, idx) => (
              <span 
                key={idx}
                className={`px-2 py-1 border ${categoryBorders[book.category]} text-xs rounded-full`}
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-4 text-center text-xs text-muted-foreground">
        {showDetails ? '▲ Click para contraer' : '▼ Click para expandir'}
      </div>
    </div>
  );
}
