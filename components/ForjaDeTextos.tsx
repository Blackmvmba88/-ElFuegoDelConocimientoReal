'use client'

import { useState } from 'react'

export function ForjaDeTextos() {
  const [texto, setTexto] = useState('')
  const [textoTransmutado, setTextoTransmutado] = useState('')
  const [modo, setModo] = useState<'crear' | 'transmutar' | 'fusionar'>('crear')

  const handleTransmutar = () => {
    // Simulación de transmutación alquímica del texto
    const palabras = texto.split(' ')
    const transmutado = palabras
      .map(palabra => {
        // Agrega símbolos místicos y transforma el texto
        const simbolos = ['✨', '🔥', '⚗️', '🌟', '💫']
        const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)]
        return Math.random() > 0.7 ? `${simbolo}${palabra}${simbolo}` : palabra
      })
      .join(' ')
    
    setTextoTransmutado(
      `🔥 TEXTO TRANSMUTADO POR EL FUEGO HERMÉTICO 🔥\n\n${transmutado}\n\n✨ Texto procesado por la Forja de Textos ✨`
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-mystic-400 mystic-glow mb-4">
          ⚒️ Forja de Textos
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Crea, reescribe y transmuta conocimiento mediante la alquimia verbal.
          Fusiona autores antiguos con energía cuántica para generar nuevas obras.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setModo('crear')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            modo === 'crear'
              ? 'bg-gradient-flame text-white shadow-lg shadow-flame-500/30'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          📝 Crear
        </button>
        <button
          onClick={() => setModo('transmutar')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            modo === 'transmutar'
              ? 'bg-gradient-mystic text-white shadow-lg shadow-mystic-500/30'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          ⚗️ Transmutar
        </button>
        <button
          onClick={() => setModo('fusionar')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            modo === 'fusionar'
              ? 'bg-gradient-to-r from-flame-600 to-mystic-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          🔬 Fusionar
        </button>
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-flame-700/50">
            <h3 className="text-xl font-bold text-flame-400 mb-4">
              📜 Entrada de Texto
            </h3>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe o pega tu texto aquí para ser transmutado por el fuego del conocimiento..."
              className="w-full h-64 p-4 rounded-lg bg-gray-950 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-flame-500 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleTransmutar}
              disabled={!texto}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-flame text-white font-semibold hover:shadow-lg hover:shadow-flame-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔥 Transmutar Texto
            </button>
            <button
              onClick={() => {
                setTexto('')
                setTextoTransmutado('')
              }}
              className="px-6 py-3 rounded-lg bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700 transition-all duration-300"
            >
              🗑️ Limpiar
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-gradient-to-br from-mystic-900/50 to-mystic-800/30 border border-mystic-700/50">
            <h3 className="text-xl font-bold text-mystic-400 mb-4">
              ✨ Resultado Alquímico
            </h3>
            <div className="w-full h-64 p-4 rounded-lg bg-gray-950 border border-mystic-700 overflow-auto">
              {textoTransmutado ? (
                <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm">
                  {textoTransmutado}
                </pre>
              ) : (
                <p className="text-gray-500 italic">
                  El resultado de la transmutación aparecerá aquí...
                </p>
              )}
            </div>
          </div>

          {textoTransmutado && (
            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(textoTransmutado)
                } catch (error) {
                  console.error('Failed to copy to clipboard:', error)
                  // Fallback: create a temporary textarea
                  const textarea = document.createElement('textarea')
                  textarea.value = textoTransmutado
                  document.body.appendChild(textarea)
                  textarea.select()
                  document.execCommand('copy')
                  document.body.removeChild(textarea)
                }
              }}
              className="w-full px-6 py-3 rounded-lg bg-gradient-mystic text-white font-semibold hover:shadow-lg hover:shadow-mystic-500/30 transition-all duration-300"
            >
              📋 Copiar al Portapapeles
            </button>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
          <h4 className="font-bold text-flame-400 mb-2">🔥 Modo Crear</h4>
          <p className="text-sm text-gray-400">
            Genera nuevo conocimiento desde el vacío cuántico
          </p>
        </div>
        <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
          <h4 className="font-bold text-mystic-400 mb-2">⚗️ Modo Transmutar</h4>
          <p className="text-sm text-gray-400">
            Transforma textos existentes elevando su vibración
          </p>
        </div>
        <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
          <h4 className="font-bold text-hermetic-400 mb-2">🔬 Modo Fusionar</h4>
          <p className="text-sm text-gray-400">
            Combina múltiples fuentes en una síntesis hermética
          </p>
        </div>
      </div>
    </div>
  )
}
