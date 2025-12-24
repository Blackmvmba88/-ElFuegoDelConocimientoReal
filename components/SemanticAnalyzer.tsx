"use client";

import { useState } from 'react';
import { useSemanticAnalysis } from '@/lib/use-api';

export default function SemanticAnalyzer() {
  const [text, setText] = useState('');
  const { analysis, loading, error, analyzeText } = useSemanticAnalysis();

  const handleAnalyze = async () => {
    if (text.trim()) {
      await analyzeText(text);
    }
  };

  const getElementEmoji = (element: string) => {
    const emojis: Record<string, string> = {
      fire: '🔥',
      water: '💧',
      air: '💨',
      earth: '🌍',
      ether: '✨',
    };
    return emojis[element] || '•';
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      alchemical: '⚗️',
      masonic: '🔺',
      kabbalistic: '✡️',
    };
    return emojis[category] || '🔮';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
          🔮 Análisis Semántico Hermético
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Detecta símbolos alquímicos, masónicos y cabalísticos en cualquier texto
        </p>
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingresa un texto para analizar sus símbolos herméticos y energía elemental...

Ejemplo: 'El alquimista buscó la piedra filosofal, combinando mercurio, azufre y sal en el fuego del horno. Las columnas de Boaz y Jachin guardaban el secreto del árbol de la vida.'"
          className="w-full h-48 px-4 py-3 rounded-lg border-2 border-purple-200 dark:border-purple-900
                   bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                   focus:border-purple-500 focus:outline-none resize-none"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="w-full px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700
                   text-white font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? 'Analizando...' : '🔍 Analizar Texto'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
          Error: {error}
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-lg mb-2 text-purple-900 dark:text-purple-100">
              📊 Resumen del Análisis
            </h3>
            <p className="text-slate-700 dark:text-slate-300">{analysis.summary}</p>
          </div>

          {/* Hermetic Symbols */}
          {analysis.hermetic_symbols && analysis.hermetic_symbols.length > 0 && (
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-xl mb-4 text-purple-900 dark:text-purple-100">
                🔮 Símbolos Herméticos Detectados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.hermetic_symbols.map((symbol: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-700
                             bg-slate-50 dark:bg-slate-900/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCategoryEmoji(symbol.category)}</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                            {symbol.symbol.replace(/_/g, ' ')}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                            {symbol.category}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded text-xs bg-purple-100 dark:bg-purple-900/30
                                     text-purple-700 dark:text-purple-300">
                        {symbol.count}x
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Elemental Energy */}
          {analysis.elemental_energy && (
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-xl mb-4 text-purple-900 dark:text-purple-100">
                ⚡ Energía Elemental
              </h3>
              <div className="space-y-3">
                {Object.entries(analysis.elemental_energy)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([element, value]) => (
                    <div key={element}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize flex items-center gap-2">
                          <span className="text-xl">{getElementEmoji(element)}</span>
                          {element}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {((value as number) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                          style={{ width: `${(value as number) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Correspondences */}
          {analysis.correspondences && analysis.correspondences.length > 0 && (
            <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-800">
              <h3 className="font-bold text-xl mb-4 text-purple-900 dark:text-purple-100">
                🔗 Correspondencias Herméticas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.correspondences.map((corr: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-700
                             bg-gradient-to-br from-purple-50 to-blue-50 
                             dark:from-purple-900/20 dark:to-blue-900/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getCategoryEmoji(corr.category)}</span>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
                        {corr.symbol.replace(/_/g, ' ')}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {corr.correspondences.map((item: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded text-xs bg-white dark:bg-slate-800
                                   text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !analysis && !error && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          <p>Ingresa un texto para descubrir sus símbolos herméticos ocultos</p>
        </div>
      )}
    </div>
  );
}
