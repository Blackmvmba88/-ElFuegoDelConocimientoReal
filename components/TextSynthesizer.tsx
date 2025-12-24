"use client";

import { useState } from 'react';
import { useTextSynthesis } from '@/lib/use-api';

type SynthesisMode = 'generate' | 'transform' | 'fusion';
type TransformationType = 'modernize' | 'archaize' | 'simplify' | 'amplify' | 'poetic';
type StyleType = 'alchemical' | 'masonic' | 'kabbalistic';

export default function TextSynthesizer() {
  const [mode, setMode] = useState<SynthesisMode>('generate');
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('');
  const [style, setStyle] = useState<StyleType>('alchemical');
  const [transformationType, setTransformationType] = useState<TransformationType>('modernize');
  
  const { result, loading, error, generateText, transformText, synthesize } = useTextSynthesis();

  const handleGenerate = async () => {
    if (theme.trim()) {
      await generateText(theme, style);
    }
  };

  const handleTransform = async () => {
    if (text.trim()) {
      await transformText(text, transformationType);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">
          ⚗️ Forja de Textos - IA Hermética
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Genera y transforma textos con sabiduría alquímica
        </p>
      </div>

      {/* Mode Selection */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => setMode('generate')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'generate'
              ? 'bg-red-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          ✨ Generar
        </button>
        <button
          onClick={() => setMode('transform')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'transform'
              ? 'bg-red-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          🔄 Transformar
        </button>
        <button
          onClick={() => setMode('fusion')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'fusion'
              ? 'bg-red-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          🔥 Fusionar
        </button>
      </div>

      {/* Generate Mode */}
      {mode === 'generate' && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border-2 border-red-200 dark:border-red-900">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100">
              Generar Texto Original
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Tema o concepto
                </label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Ej: La transmutación del ego, El camino del iniciado, La luz interior"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                           focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Estilo hermético
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as StyleType)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="alchemical">⚗️ Alquímico</option>
                  <option value="masonic">🔺 Masónico</option>
                  <option value="kabbalistic">✡️ Cabalístico</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !theme.trim()}
                className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700
                         text-white font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? '⚗️ Generando...' : '✨ Generar Texto'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transform Mode */}
      {mode === 'transform' && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border-2 border-red-200 dark:border-red-900">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100">
              Transformar Texto Existente
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Texto a transformar
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ingresa el texto que deseas transformar..."
                  className="w-full h-32 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                           focus:border-red-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Tipo de transformación
                </label>
                <select
                  value={transformationType}
                  onChange={(e) => setTransformationType(e.target.value as TransformationType)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600
                           bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="modernize">🔄 Modernizar (lenguaje actual)</option>
                  <option value="archaize">📜 Arcaizar (lenguaje antiguo)</option>
                  <option value="simplify">💡 Simplificar (más claro)</option>
                  <option value="amplify">🔍 Amplificar (más profundo)</option>
                  <option value="poetic">🎭 Poetizar (verso hermético)</option>
                </select>
              </div>

              <button
                onClick={handleTransform}
                disabled={loading || !text.trim()}
                className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700
                         text-white font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? '🔄 Transformando...' : '🔥 Transformar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fusion Mode */}
      {mode === 'fusion' && (
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border-2 border-red-200 dark:border-red-900">
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100">
              Fusionar Textos
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              Próximamente: Fusiona múltiples textos en una síntesis coherente
            </p>
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                Esta función estará disponible una vez que se integre la gestión de biblioteca
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
          Error: {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border-2 border-green-200 dark:border-green-900">
          <h3 className="font-bold text-lg mb-4 text-green-900 dark:text-green-100 flex items-center gap-2">
            ✅ Texto Generado
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 
                          border border-slate-200 dark:border-slate-700">
              <p className="text-slate-900 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
                {result.content || result.transformed || result.original}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(result.content || result.transformed)}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 
                       hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              📋 Copiar
            </button>
            <button
              onClick={() => {
                setText(result.content || result.transformed);
                setMode('transform');
              }}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 
                       hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              🔄 Transformar nuevamente
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 <strong>Nota:</strong> Esta función requiere que configures las claves API de OpenAI o Anthropic 
          en el backend para funcionar. Ver backend/.env.example para más detalles.
        </p>
      </div>
    </div>
  );
}
