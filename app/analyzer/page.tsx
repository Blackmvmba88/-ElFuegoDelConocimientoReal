'use client';

import SemanticAnalyzer from '@/components/SemanticAnalyzer';

export default function AnalyzerPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-flame-primary to-flame-secondary bg-clip-text text-transparent">
          🔮 Analizador Semántico
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Analiza textos herméticos y descubre símbolos alquímicos, masónicos y cabalísticos ocultos en el conocimiento antiguo.
        </p>
      </div>

      <SemanticAnalyzer />

      {/* Information Section */}
      <div className="mt-16 p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          ¿Qué puede detectar el Analizador?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-flame-primary mb-2">⚗️ Símbolos Alquímicos</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Piedra filosofal</li>
              <li>• Mercurio, azufre, sal</li>
              <li>• Prima materia</li>
              <li>• Ouroboros</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-mystic-primary mb-2">🔺 Símbolos Masónicos</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Escuadra y compás</li>
              <li>• Ojo que todo lo ve</li>
              <li>• Pilares y columnas</li>
              <li>• Grados iniciáticos</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-hermetic-primary mb-2">✡️ Símbolos Cabalísticos</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Árbol de la Vida</li>
              <li>• Sefirot</li>
              <li>• Tetragrámaton</li>
              <li>• Ein Sof</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
