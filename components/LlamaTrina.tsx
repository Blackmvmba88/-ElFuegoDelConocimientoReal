'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function LlamaTrina() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [intensidad, setIntensidad] = useState(5)
  const [color, setColor] = useState('#f97316')
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true 
    })
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    rendererRef.current = renderer

    // Create flame particles
    const particleCount = 1000
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Position - spiral flame shape
      const angle = (i / particleCount) * Math.PI * 4
      const radius = Math.random() * 0.5
      const height = (i / particleCount) * 3 - 1.5
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius

      // Color - gradient from yellow to red to purple
      const colorMix = i / particleCount
      if (colorMix < 0.33) {
        // Yellow to orange
        colors[i3] = 1
        colors[i3 + 1] = 0.8 - colorMix
        colors[i3 + 2] = 0
      } else if (colorMix < 0.66) {
        // Orange to red
        colors[i3] = 1
        colors[i3 + 1] = 0.3 - (colorMix - 0.33) * 2
        colors[i3 + 2] = 0
      } else {
        // Red to purple
        colors[i3] = 1 - (colorMix - 0.66) * 2
        colors[i3 + 1] = 0
        colors[i3 + 2] = (colorMix - 0.66) * 3
      }

      sizes[i] = Math.random() * 3 + 1
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point lights for glow effect
    const light1 = new THREE.PointLight(0xff6600, 2, 10)
    light1.position.set(0, 1, 0)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x9d00ff, 1.5, 10)
    light2.position.set(0, -1, 0)
    scene.add(light2)

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate flame
      particleSystem.rotation.y += 0.005

      // Animate particles
      const positions = particles.attributes.position.array as Float32Array
      const time = Date.now() * 0.001

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const y = positions[i3 + 1]
        
        // Move particles up and reset
        positions[i3 + 1] = y + 0.01
        if (positions[i3 + 1] > 1.5) {
          positions[i3 + 1] = -1.5
        }

        // Add wave motion
        positions[i3] += Math.sin(time + i) * 0.001
        positions[i3 + 2] += Math.cos(time + i) * 0.001
      }

      particles.attributes.position.needsUpdate = true

      // Pulse lights
      light1.intensity = 2 + Math.sin(time * 2) * 0.5
      light2.intensity = 1.5 + Math.cos(time * 2) * 0.5

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !renderer || !camera) return
      
      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      
      // Dispose of Three.js objects to prevent memory leaks
      renderer.dispose()
      particleMaterial.dispose()
      particles.dispose()
      
      // Dispose of lights and scene
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
    }
  }, [])

  // Store initial light intensities
  const initialIntensitiesRef = useRef<number[]>([])

  // Update intensity
  useEffect(() => {
    if (!sceneRef.current) return
    
    const lights = sceneRef.current.children.filter(
      child => child instanceof THREE.PointLight
    ) as THREE.PointLight[]
    
    // Store initial intensities on first run
    if (initialIntensitiesRef.current.length === 0) {
      initialIntensitiesRef.current = lights.map(light => light.intensity)
    }
    
    // Update intensities based on initial values
    lights.forEach((light, index) => {
      const initialIntensity = initialIntensitiesRef.current[index] || 2
      light.intensity = initialIntensity * (intensidad / 5)
    })
  }, [intensidad])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-orange-400 mb-4">
          🔥 Llama Trina
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Visualiza el fuego cuántico en tiempo real. La Llama Trina representa
          las tres dimensiones de la energía hermética: física, mental y espiritual.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="relative">
        <div className="rounded-lg overflow-hidden border-2 border-flame-700/50 shadow-2xl shadow-flame-500/20">
          <canvas
            ref={canvasRef}
            className="w-full h-[500px] bg-black"
          />
        </div>
        
        {/* Overlay Info */}
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-flame-700/50">
          <p className="text-flame-400 font-bold text-sm mb-1">⚡ ENERGÍA ACTIVA</p>
          <p className="text-gray-300 text-xs">Visualización del Fuego Cuántico</p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-gradient-to-br from-flame-900/50 to-flame-800/30 border border-flame-700/50">
          <h3 className="text-lg font-bold text-flame-400 mb-4">🔥 Intensidad del Fuego</h3>
          <input
            type="range"
            min="1"
            max="10"
            value={intensidad}
            onChange={(e) => setIntensidad(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Brasa</span>
            <span className="text-flame-400 font-bold">{intensidad}</span>
            <span>Infierno</span>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-br from-mystic-900/50 to-mystic-800/30 border border-mystic-700/50">
          <h3 className="text-lg font-bold text-mystic-400 mb-4">🎨 Frecuencia Cromática</h3>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-20 h-10 rounded cursor-pointer"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-400">Color seleccionado:</p>
              <p className="text-lg font-bold text-mystic-400">{color}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
          <h4 className="font-bold text-flame-400 mb-2 flex items-center gap-2">
            <span>🔥</span> Dimensión Física
          </h4>
          <p className="text-sm text-gray-400">
            Representa la energía material y las fuerzas elementales
          </p>
        </div>
        <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
          <h4 className="font-bold text-mystic-400 mb-2 flex items-center gap-2">
            <span>💭</span> Dimensión Mental
          </h4>
          <p className="text-sm text-gray-400">
            Simboliza el pensamiento, la lógica y el conocimiento
          </p>
        </div>
        <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
          <h4 className="font-bold text-hermetic-400 mb-2 flex items-center gap-2">
            <span>✨</span> Dimensión Espiritual
          </h4>
          <p className="text-sm text-gray-400">
            Encarna la conciencia superior y la sabiduría hermética
          </p>
        </div>
      </div>

      {/* Energy Stats */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-flame-700/50">
        <h3 className="text-xl font-bold text-flame-400 mb-4">📊 Métricas Energéticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-flame-500">∞</p>
            <p className="text-sm text-gray-400">Partículas Activas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-mystic-500">{intensidad * 10}%</p>
            <p className="text-sm text-gray-400">Potencia Cuántica</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-hermetic-500">432 Hz</p>
            <p className="text-sm text-gray-400">Frecuencia Base</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-500">⚡</p>
            <p className="text-sm text-gray-400">Estado: Activo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
