import LibraryCatalog from '@/components/LibraryCatalog';

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <LibraryCatalog />
    </div>
  );
}

export const metadata = {
  title: 'Catálogo Hermético | El Fuego del Conocimiento Real',
  description: 'Biblioteca Iniciática Operativa: 55+ textos fundamentales organizados en 5 tradiciones sapienciales, desde la antigüedad hasta la modernidad.',
};
