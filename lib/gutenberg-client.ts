import { GutenbergResponse, GutenbergBook, Book } from '@/types';

const GUTENBERG_API_BASE = 'https://gutendex.com/books';

export class GutenbergClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = GUTENBERG_API_BASE;
  }

  /**
   * Buscar libros en el catálogo de Gutenberg
   */
  async searchBooks(query: string, page: number = 1): Promise<GutenbergResponse> {
    try {
      const url = new URL(this.baseUrl);
      url.searchParams.append('search', query);
      url.searchParams.append('page', page.toString());

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Error fetching books: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  }

  /**
   * Obtener libros por tema
   */
  async getBooksByTopic(topic: string, page: number = 1): Promise<GutenbergResponse> {
    try {
      const url = new URL(this.baseUrl);
      url.searchParams.append('topic', topic);
      url.searchParams.append('page', page.toString());

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Error fetching books by topic: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching books by topic:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de un libro específico
   */
  async getBookById(id: number): Promise<GutenbergBook> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching book: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching book by id:', error);
      throw error;
    }
  }

  /**
   * Convertir libro de Gutenberg a formato interno
   */
  convertToBook(gutenbergBook: GutenbergBook): Book {
    const coverUrl = gutenbergBook.formats['image/jpeg'] || '';
    const downloadUrl = gutenbergBook.formats['text/html'] || 
                       gutenbergBook.formats['text/plain; charset=utf-8'] ||
                       gutenbergBook.formats['application/epub+zip'] || '';

    return {
      id: gutenbergBook.id.toString(),
      title: gutenbergBook.title,
      author: gutenbergBook.authors.map(a => a.name).join(', ') || 'Autor Desconocido',
      language: gutenbergBook.languages[0] || 'unknown',
      downloadUrl,
      formats: gutenbergBook.formats,
      subjects: gutenbergBook.subjects || [],
      coverUrl,
    };
  }

  /**
   * Obtener libros herméticos/filosóficos recomendados
   */
  async getHermeticBooks(): Promise<Book[]> {
    try {
      const topics = ['philosophy', 'occult', 'mysticism', 'alchemy'];
      const books: Book[] = [];

      // Fetch topics concurrently for better performance
      const responses = await Promise.all(
        topics.map(topic => this.getBooksByTopic(topic, 1))
      );

      responses.forEach(response => {
        const convertedBooks = response.results.slice(0, 5).map(b => this.convertToBook(b));
        books.push(...convertedBooks);
      });

      return books;
    } catch (error) {
      console.error('Error fetching hermetic books:', error);
      return [];
    }
  }
}

// Singleton instance
export const gutenbergClient = new GutenbergClient();
