'use client';

import { Book } from '@/types';

interface BookCardProps {
  book: Book;
  onDownload?: () => void;
}

export default function BookCard({ book, onDownload }: BookCardProps) {
  return (
    <div className="group relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-shadow-light hover:shadow-lg transition-all duration-300">
      <div className="flex gap-4">
        {book.coverUrl && (
          <div className="flex-shrink-0">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-20 h-28 object-cover rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-book.png';
              }}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-flame-primary dark:group-hover:text-flame-secondary transition-colors">
            {book.title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {book.author}
          </p>
          
          {book.subjects && book.subjects.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {book.subjects.slice(0, 2).map((subject, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  {subject.split('--')[0].trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {book.downloadUrl && (
        <button
          onClick={onDownload}
          className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-flame-primary to-flame-secondary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          Descargar / Leer
        </button>
      )}
    </div>
  );
}
