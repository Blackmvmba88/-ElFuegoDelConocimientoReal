import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-flame-primary to-flame-secondary flame-glow mb-8 animate-pulse">
          <span className="text-6xl">🔥</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-flame-primary to-flame-secondary bg-clip-text text-transparent">
          El Fuego del Conocimiento Real
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
          Proyecto Épico de Web UI - Grado 33
        </p>
        
        <p className="text-lg text-gray-500 dark:text-gray-500 mb-12 italic">
          "No buscamos encender una llama más. Buscamos despertar el fuego que ya arde en cada alma."
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/chambers"
            className="px-8 py-4 bg-gradient-to-r from-flame-primary to-flame-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
          >
            Explorar Cámaras
          </Link>
          <Link
            href="/library"
            className="px-8 py-4 bg-white dark:bg-shadow-light border-2 border-flame-primary dark:border-flame-secondary text-flame-primary dark:text-flame-secondary rounded-lg font-semibold hover:bg-flame-primary hover:text-white dark:hover:bg-flame-secondary transition-all shadow-lg hover:shadow-xl"
          >
            Biblioteca Viva
          </Link>
        </div>
      </section>

      {/* Pilares Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Los Cuatro Pilares
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700 hover:border-flame-primary dark:hover:border-flame-secondary transition-colors">
            <div className="text-4xl mb-4">🔺</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Masonería Simbólica
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Estructura por grados y cámaras de conocimiento progresivo.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700 hover:border-flame-primary dark:hover:border-flame-secondary transition-colors">
            <div className="text-4xl mb-4">⚗️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Alquimia Operativa
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Transmutación de información y energía verbal.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700 hover:border-flame-primary dark:hover:border-flame-secondary transition-colors">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              IA Semántica
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Lectura, análisis y creación de nuevos libros.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700 hover:border-flame-primary dark:hover:border-flame-secondary transition-colors">
            <div className="text-4xl mb-4">🌌</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Filosofía Cuántica
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              El verbo como energía vibratoria universal.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Status */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Estado del Proyecto
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-shadow-light border-2 border-green-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Fase 1 – Fuego Semilla (En Progreso)
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 ml-6">
              Estructura base, sistema de cámaras, motor de texto y conexión con API de libros abiertos.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-shadow-light border-2 border-gray-300 dark:border-gray-700 opacity-60">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Fase 2 – Fuego Operativo (Próximamente)
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 ml-6">
              IA Hermética, biblioteca viva y análisis semántico.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-shadow-light border-2 border-gray-300 dark:border-gray-700 opacity-60">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Fase 3 – Fuego Sagrado (Futuro)
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 ml-6">
              Visualizador 3D con Llama Trina y animaciones rituales.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
