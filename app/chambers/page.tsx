'use client';

import { useState } from 'react';
import ChamberCard from '@/components/ChamberCard';
import { chambers } from '@/lib/chambers';
import { Chamber } from '@/types';

export const dynamic = 'force-dynamic';

export default function ChambersPage() {
  const [selectedElement, setSelectedElement] = useState<Chamber['element'] | 'all'>('all');

  const filteredChambers = selectedElement === 'all' 
    ? chambers 
    : chambers.filter(c => c.element === selectedElement);

  const elements: Array<Chamber['element'] | 'all'> = ['all', 'Silencio', 'Luz', 'Fuego', 'Aire', 'Éter'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-flame-primary to-flame-secondary bg-clip-text text-transparent">
          Las Cámaras del Conocimiento
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Recorre los 33 grados de iniciación a través de las cinco cámaras elementales.
          Cada grado desbloquea nuevos niveles de comprensión y conocimiento hermético.
        </p>
      </div>

      {/* Filtros por elemento */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {elements.map((element) => (
          <button
            key={element}
            onClick={() => setSelectedElement(element)}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all
              ${selectedElement === element
                ? 'bg-gradient-to-r from-flame-primary to-flame-secondary text-white shadow-lg'
                : 'bg-white dark:bg-shadow-light text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-flame-primary dark:hover:border-flame-secondary'
              }
            `}
          >
            {element === 'all' ? 'Todas' : element}
          </button>
        ))}
      </div>

      {/* Grid de cámaras */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChambers.map((chamber) => (
          <ChamberCard
            key={chamber.id}
            chamber={chamber}
            onClick={() => {
              // TODO: Navegar a la página de detalle de la cámara
              console.log('Chamber clicked:', chamber.name);
            }}
          />
        ))}
      </div>

      {filteredChambers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            No hay cámaras disponibles para este elemento.
          </p>
        </div>
      )}

      {/* Leyenda */}
      <div className="mt-16 p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Sobre las Cámaras
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <strong className="text-gray-900 dark:text-white">🤫 Silencio (Grados 1-10):</strong> El inicio del camino donde el silencio revela las primeras verdades.
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">💡 Luz (Grados 11-20):</strong> La luz comienza a iluminar los misterios ocultos del conocimiento.
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">🔥 Fuego (Grados 21-27):</strong> El fuego alquímico transmuta la materia en espíritu.
          </div>
          <div>
            <strong className="text-gray-900 dark:text-white">🌬️ Aire (Grados 28-30):</strong> El aire eleva el espíritu a las alturas del entendimiento.
          </div>
          <div className="md:col-span-2">
            <strong className="text-gray-900 dark:text-white">✨ Éter (Grados 31-33):</strong> El éter conecta todas las dimensiones del conocimiento universal.
          </div>
        </div>
      </div>
    </div>
  );
}
