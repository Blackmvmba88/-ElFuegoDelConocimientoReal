import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '@/components/BookCard';
import { Book } from '@/types';

describe('BookCard Component', () => {
  const mockBook: Book = {
    id: '1',
    title: 'Test Book Title',
    author: 'Test Author',
    language: 'en',
    downloadUrl: 'https://example.com/book.pdf',
    subjects: ['Philosophy', 'Hermetic'],
    coverUrl: 'https://example.com/cover.jpg',
  };

  it('renders book title and author', () => {
    render(<BookCard book={mockBook} />);
    
    expect(screen.getByText('Test Book Title')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('renders download button when downloadUrl is provided', () => {
    render(<BookCard book={mockBook} />);
    
    const downloadButton = screen.getByText(/Descargar \/ Leer/i);
    expect(downloadButton).toBeInTheDocument();
  });

  it('does not render download button when downloadUrl is not provided', () => {
    const bookWithoutDownload: Book = { ...mockBook, downloadUrl: undefined };
    render(<BookCard book={bookWithoutDownload} />);
    
    const downloadButton = screen.queryByText(/Descargar \/ Leer/i);
    expect(downloadButton).not.toBeInTheDocument();
  });

  it('calls onDownload callback when download button is clicked', () => {
    const onDownloadMock = jest.fn();
    render(<BookCard book={mockBook} onDownload={onDownloadMock} />);
    
    const downloadButton = screen.getByText(/Descargar \/ Leer/i);
    fireEvent.click(downloadButton);
    
    expect(onDownloadMock).toHaveBeenCalledTimes(1);
  });

  it('renders subjects when provided', () => {
    render(<BookCard book={mockBook} />);
    
    expect(screen.getByText('Philosophy')).toBeInTheDocument();
    expect(screen.getByText('Hermetic')).toBeInTheDocument();
  });

  it('limits subjects display to 2', () => {
    const bookWithManySubjects: Book = {
      ...mockBook,
      subjects: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'],
    };
    render(<BookCard book={bookWithManySubjects} />);
    
    expect(screen.getByText('Subject 1')).toBeInTheDocument();
    expect(screen.getByText('Subject 2')).toBeInTheDocument();
    expect(screen.queryByText('Subject 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Subject 4')).not.toBeInTheDocument();
  });

  it('renders without subjects', () => {
    const bookWithoutSubjects: Book = { ...mockBook, subjects: undefined };
    const { container } = render(<BookCard book={bookWithoutSubjects} />);
    
    expect(screen.getByText('Test Book Title')).toBeInTheDocument();
    expect(container.querySelector('.flex-wrap')).not.toBeInTheDocument();
  });
});
