'use client'

import { useState } from 'react'

interface Libro {
  id: number
  titulo: string
  autor: string
  categoria: string
  descripcion: string
  vibracion: number
  simbolo: string
}

const librosEjemplo: Libro[] = [
  {
    id: 1,
    titulo: 'El Kybalion',
    autor: 'Tres Iniciados',
    categoria: 'Hermetismo',
    descripcion: 'Los siete principios herméticos de la verdad universal',
    vibracion: 33,
    simbolo: '📿'
  },
  {
    id: 2,
    titulo: 'La Doctrina Secreta',
    autor: 'Helena Blavatsky',
    categoria: 'Teosofía',
    descripcion: 'La síntesis de ciencia, religión y filosofía',
    vibracion: 30,
    simbolo: '🔮'
  },
  {
    id: 3,
    titulo: 'Corpus Hermeticum',
    autor: 'Hermes Trismegisto',
    categoria: 'Alquimia',
    descripcion: 'Los textos fundamentales de la tradición hermética',
    vibracion: 33,
    simbolo: '⚗️'
  },
  {
    id: 4,
    titulo: 'Bhagavad Gita',
    autor: 'Vyasa',
    categoria: 'Filosofía Oriental',
    descripcion: 'El diálogo sagrado sobre el dharma y la iluminación',
    vibracion: 33,
    simbolo: '🕉️'
  },
  {
    id: 5,
    titulo: 'La República',
    autor: 'Platón',
    categoria: 'Filosofía',
    descripcion: 'El diálogo sobre la justicia y el mundo de las ideas',
    vibracion: 25,
    simbolo: '🏛️'
  },
  {
    id: 6,
    titulo: 'Tratado de Alquimia',
    autor: 'Paracelso',
    categoria: 'Alquimia',
    descripcion: 'Los secretos de la transmutación y la medicina espagírica',
    vibracion: 28,
    simbolo: '🧪'
  },
]

export function BibliotecaViva() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos')
  const [libroSeleccionado, setLibroSeleccionado] = useState<Libro | null>(null)

  const categorias = ['Todos', ...new Set(librosEjemplo.map(l => l.categoria))]
  
  const librosFiltrados = librosEjemplo.filter(libro => {
    const matchBusqueda = libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          libro.autor.toLowerCase().includes(busqueda.toLowerCase())
    const matchCategoria = categoriaFiltro === 'Todos' || libro.categoria === categoriaFiltro
    return matchBusqueda && matchCategoria
  })

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-hermetic-400 mb-4">
          📚 Biblioteca Viva
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explora la colección infinita de textos sagrados, tratados herméticos
          y sabiduría ancestral. Cada libro vibra con su propia frecuencia.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="🔍 Buscar por título o autor..."
              className="w-full px-6 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-hermetic-500"
            />
          </div>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="px-6 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-hermetic-500"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {librosFiltrados.map(libro => (
          <button
            key={libro.id}
            onClick={() => setLibroSeleccionado(libro)}
            className={`p-6 rounded-lg border transition-all duration-300 text-left hover:shadow-lg hover:shadow-hermetic-500/20 ${
              libroSeleccionado?.id === libro.id
                ? 'bg-gradient-to-br from-hermetic-900/50 to-hermetic-800/30 border-hermetic-500 ring-2 ring-hermetic-500'
                : 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-hermetic-500'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">{libro.simbolo}</span>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-yellow-500">⚡</span>
                <span className="text-hermetic-400 font-bold">{libro.vibracion}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-hermetic-400 mb-1">
              {libro.titulo}
            </h3>
            <p className="text-sm text-mystic-400 mb-2">{libro.autor}</p>
            <span className="inline-block px-2 py-1 rounded text-xs bg-gray-800 text-gray-400 mb-2">
              {libro.categoria}
            </span>
            <p className="text-sm text-gray-400 line-clamp-2">{libro.descripcion}</p>
          </button>
        ))}
      </div>

      {librosFiltrados.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No se encontraron libros con estos criterios</p>
        </div>
      )}

      {/* Book Detail Modal */}
      {libroSeleccionado && (
        <div className="mt-8 p-8 rounded-lg bg-gradient-to-br from-hermetic-900/30 to-mystic-900/30 border border-hermetic-700/50">
          <div className="flex items-start gap-6 mb-6">
            <span className="text-8xl">{libroSeleccionado.simbolo}</span>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-3xl font-bold text-hermetic-400">
                  {libroSeleccionado.titulo}
                </h3>
                <div className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-lg">
                  <span className="text-yellow-500 text-xl">⚡</span>
                  <span className="text-hermetic-400 font-bold text-lg">
                    {libroSeleccionado.vibracion}
                  </span>
                </div>
              </div>
              <p className="text-xl text-mystic-400 mb-2">{libroSeleccionado.autor}</p>
              <span className="inline-block px-3 py-1 rounded bg-gray-800 text-gray-300 text-sm">
                {libroSeleccionado.categoria}
              </span>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-6">{libroSeleccionado.descripcion}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-hermetic-600 to-hermetic-700 text-white font-semibold hover:shadow-lg hover:shadow-hermetic-500/30 transition-all duration-300">
              📖 Leer Ahora
            </button>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-mystic-600 to-mystic-700 text-white font-semibold hover:shadow-lg hover:shadow-mystic-500/30 transition-all duration-300">
              💾 Descargar
            </button>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-flame-600 to-flame-700 text-white font-semibold hover:shadow-lg hover:shadow-flame-500/30 transition-all duration-300">
              ⭐ Favoritos
            </button>
          </div>

          <div className="p-4 rounded bg-gray-900/50 border border-gray-800">
            <h4 className="font-bold text-hermetic-400 mb-2">📊 Información de Vibración</h4>
            <p className="text-sm text-gray-400">
              Este texto resuena en la frecuencia {libroSeleccionado.vibracion}. 
              {libroSeleccionado.vibracion >= 30 
                ? ' Requiere un nivel avanzado de iniciación para su completa comprensión.'
                : ' Adecuado para iniciados de todos los niveles.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
