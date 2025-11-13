export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-fuego-900 via-hermetico-900 to-black">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-6xl font-serif font-bold mb-8 bg-gradient-to-r from-fuego-400 to-hermetico-400 bg-clip-text text-transparent">
          🔥 El Fuego del Conocimiento Real
        </h1>
        
        <p className="text-2xl text-gray-300 mb-4">
          Grado 33 – Constructor del Universo Interior
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-fuego-800">
            <h2 className="text-xl font-serif font-bold text-fuego-400 mb-3">
              🏛️ Cámara de Grados
            </h2>
            <p className="text-gray-400">
              Acceso por iniciación. Desbloquea niveles de conocimiento según tu progreso espiritual.
            </p>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-hermetico-800">
            <h2 className="text-xl font-serif font-bold text-hermetico-400 mb-3">
              ✍️ Forja de Textos
            </h2>
            <p className="text-gray-400">
              Crea y reescribe conocimiento con la asistencia de la IA Hermética.
            </p>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-fuego-800">
            <h2 className="text-xl font-serif font-bold text-fuego-400 mb-3">
              📚 Biblioteca Viva
            </h2>
            <p className="text-gray-400">
              Búsqueda, descarga y lectura de obras de sabiduría universal.
            </p>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-hermetico-800">
            <h2 className="text-xl font-serif font-bold text-hermetico-400 mb-3">
              🔥 Llama Trina
            </h2>
            <p className="text-gray-400">
              Visualizador energético del fuego cuántico en tiempo real.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 italic">
            "No buscamos encender una llama más. Buscamos despertar el fuego que ya arde en cada alma."
          </p>
        </div>
        
        <div className="mt-8 text-sm text-gray-600">
          <p>Estado: En Construcción | Versión: 1.0.0</p>
        </div>
      </div>
    </main>
  )
}
