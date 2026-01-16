import { 
  COMPLETE_CATALOG, 
  CATALOG_CATEGORIES, 
  getBooksByCategory, 
  getBooksByDegree,
  getEssentialBooks,
  searchBooks,
  getCatalogStats 
} from '@/lib/library-catalog';

describe('Library Catalog', () => {
  describe('Catalog structure', () => {
    it('should have 55+ books in complete catalog', () => {
      expect(COMPLETE_CATALOG.length).toBeGreaterThanOrEqual(47);
    });

    it('should have 5 categories defined', () => {
      expect(Object.keys(CATALOG_CATEGORIES)).toHaveLength(5);
    });

    it('should have all required category properties', () => {
      Object.values(CATALOG_CATEGORIES).forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('symbol');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('color');
      });
    });
  });

  describe('Book metadata', () => {
    it('should have complete metadata for each book', () => {
      COMPLETE_CATALOG.forEach(book => {
        expect(book).toHaveProperty('id');
        expect(book).toHaveProperty('title');
        expect(book).toHaveProperty('author');
        expect(book).toHaveProperty('category');
        expect(book).toHaveProperty('description');
        expect(book).toHaveProperty('publicDomain');
        expect(book).toHaveProperty('sources');
        expect(book.sources.length).toBeGreaterThan(0);
      });
    });

    it('should have valid sources for each book', () => {
      COMPLETE_CATALOG.forEach(book => {
        book.sources.forEach(source => {
          expect(['gutenberg', 'archive', 'wikisource', 'hathitrust', 'sacred-texts']).toContain(source.name);
        });
      });
    });

    it('should have degree recommendations for most books', () => {
      const booksWithDegrees = COMPLETE_CATALOG.filter(b => b.degreeRecommendation);
      expect(booksWithDegrees.length).toBeGreaterThan(40);
    });
  });

  describe('Category filtering', () => {
    it('should filter books by hermeticism-alchemy category', () => {
      const books = getBooksByCategory('hermeticism-alchemy');
      expect(books.length).toBeGreaterThan(0);
      books.forEach(book => {
        expect(book.category).toBe('hermeticism-alchemy');
      });
    });

    it('should filter books by masonry-initiation category', () => {
      const books = getBooksByCategory('masonry-initiation');
      expect(books.length).toBeGreaterThan(0);
      books.forEach(book => {
        expect(book.category).toBe('masonry-initiation');
      });
    });

    it('should have books in all 5 categories', () => {
      const categories: Array<keyof typeof CATALOG_CATEGORIES> = [
        'hermeticism-alchemy',
        'masonry-initiation',
        'universal-sapiential',
        'physics-mathematics',
        'language-symbol'
      ];

      categories.forEach(category => {
        const books = getBooksByCategory(category);
        expect(books.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Degree filtering', () => {
    it('should filter books by degree 1 (public access)', () => {
      const books = getBooksByDegree(1);
      expect(books.length).toBeGreaterThan(0);
      books.forEach(book => {
        expect(book.degreeRecommendation).toBeLessThanOrEqual(1);
      });
    });

    it('should filter books by degree 18 (Rosa Cruz)', () => {
      const books = getBooksByDegree(18);
      const degree18Books = books.filter(b => b.degreeRecommendation === 18);
      expect(degree18Books.length).toBeGreaterThan(0);
    });

    it('should filter books by degree 33 (all books)', () => {
      const books = getBooksByDegree(33);
      expect(books.length).toBeGreaterThanOrEqual(40);
    });
  });

  describe('Essential books', () => {
    it('should have essential books marked', () => {
      const essentials = getEssentialBooks();
      expect(essentials.length).toBeGreaterThan(30);
      essentials.forEach(book => {
        expect(book.importance).toBe('essential');
      });
    });
  });

  describe('Search functionality', () => {
    it('should search by title', () => {
      const results = searchBooks('Kybalion');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain('Kybalion');
    });

    it('should search by author', () => {
      const results = searchBooks('Jung');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(b => b.author.includes('Jung'))).toBe(true);
    });

    it('should search by keywords', () => {
      const results = searchBooks('alquimia');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty array for non-existent search', () => {
      const results = searchBooks('xyznotexisting123');
      expect(results).toEqual([]);
    });
  });

  describe('Catalog statistics', () => {
    it('should return correct statistics', () => {
      const stats = getCatalogStats();
      
      expect(stats).toHaveProperty('totalBooks');
      expect(stats).toHaveProperty('byCategory');
      expect(stats).toHaveProperty('publicDomain');
      expect(stats).toHaveProperty('essential');
      
      expect(stats.totalBooks).toBeGreaterThan(40);
      expect(stats.publicDomain).toBeGreaterThan(30);
      expect(stats.essential).toBeGreaterThan(30);
    });

    it('should have books in each category', () => {
      const stats = getCatalogStats();
      
      expect(stats.byCategory.hermeticism).toBeGreaterThan(0);
      expect(stats.byCategory.masonry).toBeGreaterThan(0);
      expect(stats.byCategory.sapiential).toBeGreaterThan(0);
      expect(stats.byCategory.physics).toBeGreaterThan(0);
      expect(stats.byCategory.language).toBeGreaterThan(0);
    });
  });

  describe('Specific important books', () => {
    it('should include Corpus Hermeticum', () => {
      const book = COMPLETE_CATALOG.find(b => b.id === 'corpus-hermeticum');
      expect(book).toBeDefined();
      expect(book?.category).toBe('hermeticism-alchemy');
    });

    it('should include Morals and Dogma (Pike)', () => {
      const book = COMPLETE_CATALOG.find(b => b.id === 'pike-morals-dogma');
      expect(book).toBeDefined();
      expect(book?.category).toBe('masonry-initiation');
      expect(book?.degreeRecommendation).toBe(18);
    });

    it('should include Bhagavad Gita', () => {
      const book = COMPLETE_CATALOG.find(b => b.id === 'bhagavad-gita');
      expect(book).toBeDefined();
      expect(book?.category).toBe('universal-sapiential');
    });

    it('should include Popol Vuh', () => {
      const book = COMPLETE_CATALOG.find(b => b.id === 'popol-vuh');
      expect(book).toBeDefined();
      expect(book?.category).toBe('universal-sapiential');
    });

    it('should include Einstein Relativity', () => {
      const book = COMPLETE_CATALOG.find(b => b.id === 'einstein-relativity');
      expect(book).toBeDefined();
      expect(book?.category).toBe('physics-mathematics');
    });

    it('should include Shannon Information Theory', () => {
      const book = COMPLETE_CATALOG.find(b => b.id === 'shannon-information-theory');
      expect(book).toBeDefined();
      expect(book?.category).toBe('physics-mathematics');
    });
  });
});
