'use client';

import TextSynthesizer from '@/components/TextSynthesizer';

export default function ForgePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-flame-primary to-flame-secondary bg-clip-text text-transparent">
          ⚒️ Forja de Textos
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Crea, transforma y fusiona textos herméticos usando la inteligencia artificial. 
          Genera nuevas síntesis desde textos antiguos.
        </p>
      </div>

      <TextSynthesizer />

      {/* Information Section */}
      <div className="mt-16 p-6 rounded-xl bg-white dark:bg-shadow-light border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Capacidades de la Forja
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-flame-primary mb-2">🔥 Generar</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Crea textos herméticos originales sobre cualquier tema en estilos alquímicos, 
              masónicos o cabalísticos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-mystic-primary mb-2">🔄 Transformar</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Moderniza, arcaiza, simplifica, amplifica o poetiza textos mientras 
              preservas su esencia hermética.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-hermetic-primary mb-2">⚡ Fusionar</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Combina múltiples textos en una síntesis coherente que integra 
              las ideas principales de cada uno.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Nota:</strong> Esta función requiere claves API de OpenAI o Anthropic configuradas en el backend.
          </p>
        </div>
      </div>
    </div>
  );
}
