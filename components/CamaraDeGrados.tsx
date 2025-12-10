'use client'

import { useState } from 'react'

interface Grado {
  numero: number
  nombre: string
  descripcion: string
  simbolo: string
  desbloqueado: boolean
}

const grados: Grado[] = [
  { numero: 1, nombre: 'Aprendiz', descripcion: 'El inicio del viaje hacia la luz interior', simbolo: '🔨', desbloqueado: true },
  { numero: 2, nombre: 'Compañero', descripcion: 'Dominio de las herramientas del conocimiento', simbolo: '📐', desbloqueado: true },
  { numero: 3, nombre: 'Maestro', descripcion: 'Comprensión de los misterios fundamentales', simbolo: '👁️', desbloqueado: true },
  { numero: 18, nombre: 'Caballero Rosacruz', descripcion: 'La alquimia del espíritu', simbolo: '🌹', desbloqueado: false },
  { numero: 30, nombre: 'Caballero Kadosh', descripcion: 'El guerrero de la verdad', simbolo: '⚔️', desbloqueado: false },
  { numero: 33, nombre: 'Soberano Gran Inspector', descripcion: 'Constructor del Universo Interior', simbolo: '👑', desbloqueado: false },
]

export function CamaraDeGrados() {
  const [selectedGrado, setSelectedGrado] = useState<Grado | null>(null)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-flame-400 flame-glow mb-4">
          🏛️ Cámara de Grados
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Avanza en tu iniciación digital a través de los grados masónicos. 
          Cada grado desbloquea nuevas lecciones, fragmentos ocultos y sabiduría hermética.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grados.map((grado) => (
          <button
            key={grado.numero}
            onClick={() => setSelectedGrado(grado)}
            disabled={!grado.desbloqueado}
            className={`p-6 rounded-lg border transition-all duration-300 text-left ${
              grado.desbloqueado
                ? 'bg-gradient-to-br from-flame-900/50 to-flame-800/30 border-flame-700/50 hover:border-flame-500 hover:shadow-lg hover:shadow-flame-500/20 cursor-pointer'
                : 'bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed'
            } ${selectedGrado?.numero === grado.numero ? 'ring-2 ring-flame-500' : ''}`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">{grado.simbolo}</span>
              {grado.desbloqueado ? (
                <span className="text-green-500 text-sm">✓ Desbloqueado</span>
              ) : (
                <span className="text-gray-600 text-sm">🔒 Bloqueado</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-flame-400 mb-1">
              Grado {grado.numero}
            </h3>
            <h4 className="text-lg text-mystic-400 mb-2">{grado.nombre}</h4>
            <p className="text-sm text-gray-400">{grado.descripcion}</p>
          </button>
        ))}
      </div>

      {selectedGrado && (
        <div className="mt-8 p-8 rounded-lg bg-gradient-to-br from-flame-900/30 to-mystic-900/30 border border-flame-700/50">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{selectedGrado.simbolo}</span>
            <div>
              <h3 className="text-3xl font-bold text-flame-400">
                Grado {selectedGrado.numero}: {selectedGrado.nombre}
              </h3>
              <p className="text-gray-300 mt-2">{selectedGrado.descripcion}</p>
            </div>
          </div>

          {selectedGrado.desbloqueado ? (
            <div className="space-y-4">
              <div className="p-4 rounded bg-gray-800/50 border border-gray-700">
                <h4 className="font-bold text-hermetic-400 mb-2">📖 Lecciones Disponibles</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Lección 1: Fundamentos del Grado {selectedGrado.numero}</li>
                  <li>• Lección 2: Símbolos y Rituales</li>
                  <li>• Lección 3: Meditaciones Herméticas</li>
                </ul>
              </div>
              
              <div className="p-4 rounded bg-gray-800/50 border border-gray-700">
                <h4 className="font-bold text-mystic-400 mb-2">✨ Fragmentos Ocultos</h4>
                <p className="text-sm text-gray-300">
                  Descubre los textos secretos que solo se revelan en este grado...
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg mb-4">
                🔒 Este grado aún no está desbloqueado
              </p>
              <p className="text-sm text-gray-500">
                Completa los grados anteriores y aumenta tu vibración espiritual para acceder
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
