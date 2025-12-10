'use client'

import { useState } from 'react'
import { CamaraDeGrados } from '@/components/CamaraDeGrados'
import { ForjaDeTextos } from '@/components/ForjaDeTextos'
import { BibliotecaViva } from '@/components/BibliotecaViva'
import { LlamaTrina } from '@/components/LlamaTrina'

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home')

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-flame-500 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4 flame-glow text-flame-400">
            🔥 El Fuego del Conocimiento Real
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Grado 33 - Constructor del Universo Interior
          </p>
          <p className="text-lg text-mystic-400 mystic-glow max-w-3xl mx-auto mt-8">
            Un programa digital alquímico-masónico para expandir la conciencia,
            organizar la sabiduría y generar conocimiento nuevo mediante la integración
            de textos, símbolos y fuego cuántico.
          </p>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => setActiveSection('camara')}
          className="group p-6 rounded-lg bg-gradient-to-br from-flame-900/50 to-flame-800/30 border border-flame-700/50 hover:border-flame-500 transition-all duration-300 hover:shadow-lg hover:shadow-flame-500/20"
        >
          <div className="text-4xl mb-3">🏛️</div>
          <h3 className="text-xl font-bold text-flame-400 mb-2">Cámara de Grados</h3>
          <p className="text-sm text-gray-400">Acceso por iniciación digital</p>
        </button>

        <button
          onClick={() => setActiveSection('forja')}
          className="group p-6 rounded-lg bg-gradient-to-br from-mystic-900/50 to-mystic-800/30 border border-mystic-700/50 hover:border-mystic-500 transition-all duration-300 hover:shadow-lg hover:shadow-mystic-500/20"
        >
          <div className="text-4xl mb-3">⚒️</div>
          <h3 className="text-xl font-bold text-mystic-400 mb-2">Forja de Textos</h3>
          <p className="text-sm text-gray-400">Crear y reescribir conocimiento</p>
        </button>

        <button
          onClick={() => setActiveSection('biblioteca')}
          className="group p-6 rounded-lg bg-gradient-to-br from-hermetic-900/50 to-hermetic-800/30 border border-hermetic-700/50 hover:border-hermetic-500 transition-all duration-300 hover:shadow-lg hover:shadow-hermetic-500/20"
        >
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-xl font-bold text-hermetic-400 mb-2">Biblioteca Viva</h3>
          <p className="text-sm text-gray-400">Búsqueda y lectura de obras</p>
        </button>

        <button
          onClick={() => setActiveSection('llama')}
          className="group p-6 rounded-lg bg-gradient-to-br from-orange-900/50 to-red-800/30 border border-orange-700/50 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
        >
          <div className="text-4xl mb-3">🔥</div>
          <h3 className="text-xl font-bold text-orange-400 mb-2">Llama Trina</h3>
          <p className="text-sm text-gray-400">Visualizador energético</p>
        </button>
      </section>

      {/* Active Section Display */}
      <section className="mt-12">
        {activeSection === 'camara' && <CamaraDeGrados />}
        {activeSection === 'forja' && <ForjaDeTextos />}
        {activeSection === 'biblioteca' && <BibliotecaViva />}
        {activeSection === 'llama' && <LlamaTrina />}
        {activeSection === 'home' && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Selecciona una sección para comenzar tu viaje iniciático</p>
          </div>
        )}
      </section>

      {/* Pillars Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-flame-400">
          Los Cuatro Pilares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-3xl mb-3 text-center">🔺</div>
            <h3 className="text-lg font-bold text-flame-400 mb-2 text-center">Masonería Simbólica</h3>
            <p className="text-sm text-gray-400 text-center">
              Estructura por grados y cámaras sagradas
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-3xl mb-3 text-center">⚗️</div>
            <h3 className="text-lg font-bold text-mystic-400 mb-2 text-center">Alquimia Operativa</h3>
            <p className="text-sm text-gray-400 text-center">
              Transmutación de información y energía
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-3xl mb-3 text-center">🤖</div>
            <h3 className="text-lg font-bold text-hermetic-400 mb-2 text-center">IA Semántica</h3>
            <p className="text-sm text-gray-400 text-center">
              Lectura, análisis y creación de nuevos libros
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
            <div className="text-3xl mb-3 text-center">⚛️</div>
            <h3 className="text-lg font-bold text-orange-400 mb-2 text-center">Filosofía Cuántica</h3>
            <p className="text-sm text-gray-400 text-center">
              Interpretación del verbo como energía vibratoria
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
