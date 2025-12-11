'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GuestModeProps {
  onEnter?: () => void;
}

/**
 * GuestMode Component - Provides access to Level 1 public content
 * Allows visitors to explore the project without full authentication
 */
export default function GuestMode({ onEnter }: GuestModeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const level1Content = {
    title: "Grado 1 - Aprendiz",
    element: "Silencio",
    description: "El primer paso en el camino del conocimiento. Explora las verdades fundamentales disponibles para todos los buscadores.",
    features: [
      {
        icon: "📚",
        title: "Biblioteca Básica",
        description: "Acceso a una selección curada de textos introductorios"
      },
      {
        icon: "🔍",
        title: "Búsqueda Pública",
        description: "Explora el catálogo de Gutenberg sin restricciones"
      },
      {
        icon: "🌓",
        title: "Temas Luz/Sombra",
        description: "Experimenta la interfaz en modos día y noche"
      }
    ],
    limitations: [
      "Acceso limitado a grados superiores (2-33)",
      "Sin capacidades de creación en Forja de Textos",
      "Visualizaciones 3D no disponibles",
      "No disponible sincronización de progreso"
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Guest Mode Header */}
      <div className="bg-gradient-to-r from-flame-primary to-flame-secondary p-6 rounded-t-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              🌟 Modo Invitado - Nivel 1 Público
            </h2>
            <p className="text-white/90">
              Explora el conocimiento básico sin necesidad de registro
            </p>
          </div>
          <div className="text-6xl">
            🚪
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-shadow-light border-2 border-flame-primary dark:border-flame-secondary rounded-b-xl p-6">
        
        {/* Level 1 Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🤫</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {level1Content.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Elemento: {level1Content.element}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {level1Content.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {level1Content.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Limitations */}
        <div className="mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-flame-primary dark:hover:text-flame-secondary transition-colors"
          >
            <span className="font-medium">¿Qué no está disponible en modo invitado?</span>
            <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {isExpanded && (
            <ul className="mt-3 space-y-2 pl-4">
              {level1Content.limitations.map((limitation, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                >
                  <span className="text-red-500 mt-0.5">🔒</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/library"
            onClick={onEnter}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-flame-primary to-flame-secondary text-white rounded-lg hover:opacity-90 transition-opacity text-center font-semibold"
          >
            🚀 Entrar como Invitado
          </Link>
          
          <Link
            href="/chambers"
            className="flex-1 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-flame-primary dark:border-flame-secondary text-flame-primary dark:text-flame-secondary rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center font-semibold"
          >
            🏛️ Ver Todos los Grados
          </Link>
        </div>

        {/* Info Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-1">
                ¿Quieres acceso completo?
              </p>
              <p>
                El modo invitado te permite explorar el nivel básico. Para desbloquear 
                todos los grados, cámaras y características avanzadas, considera registrarte 
                cuando esta funcionalidad esté disponible en fases futuras.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophical Quote */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-l-4 border-flame-primary dark:border-flame-secondary">
        <p className="text-gray-700 dark:text-gray-300 italic text-center">
          &quot;El conocimiento es como el fuego: debe compartirse para crecer, 
          pero requiere preparación para no quemar al que lo toca.&quot;
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 text-center mt-2">
          - Proverbio Hermético 🔥
        </p>
      </div>
    </div>
  );
}
