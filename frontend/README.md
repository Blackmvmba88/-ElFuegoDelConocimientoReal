# Frontend - El Fuego del Conocimiento Real

## Descripción

Frontend del proyecto basado en Next.js, TailwindCSS y Three.js, implementando la interfaz de usuario del "Grimorio Interactivo".

## Estructura

```
frontend/
├── app/              # App Router (Next.js 13+)
├── components/       # Componentes React
│   ├── camaras/     # Componentes de Cámaras de Grados
│   ├── forja/       # Componentes de Forja de Textos
│   ├── biblioteca/  # Componentes de Biblioteca Viva
│   └── llama/       # Componentes de Llama Trina (Three.js)
├── lib/             # Utilidades y helpers
├── public/          # Archivos estáticos
└── styles/          # Estilos globales
```

## Instalación

```bash
# Instalar dependencias
npm install
# o
pnpm install
# o
yarn install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Componentes Principales

### 1. Cámara de Grados
Sistema de iniciación y progreso del usuario por niveles.

### 2. Forja de Textos
Editor y creador de conocimiento con IA asistida.

### 3. Biblioteca Viva
Buscador, lector y gestor de libros digitales.

### 4. Llama Trina
Visualizador 3D del fuego cuántico (Three.js).

## Modos de Visualización

- **Modo Luz (Día)**: Interfaz clara para lectura y estudio
- **Modo Sombra (Noche)**: Interfaz oscura para inmersión profunda

## Tecnologías

- **Next.js 14+**: Framework React con App Router
- **TailwindCSS**: Estilos utility-first
- **Three.js**: Visualizaciones 3D
- **React Three Fiber**: React renderer para Three.js
- **Framer Motion**: Animaciones fluidas
