# 🔥 El Fuego del Conocimiento Real (Grado 33)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE-MIT)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](./LICENSE-CC-BY-NC-SA)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()

> *El Fuego del Conocimiento Real es una plataforma de evolución cognitiva que combina análisis semántico profundo, navegación estructurada por grados de conocimiento y síntesis inteligente de textos, transformando la lectura pasiva en transmutación activa de sabiduría.*

**Qué resuelve**: Convierte el conocimiento disperso en progresión estructurada y genera nuevas síntesis desde textos antiguos.  
**Para quién**: Investigadores, estudiosos herméticos, creadores de contenido filosófico, educadores de tradiciones sapienciales.  
**Qué lo hace distinto**: Sistema de grados masónicos + IA semántica + cámaras elementales, no solo lectura sino transmutación de conocimiento.

[🎬 Ver Demo](#-ver-en-acción) • [📖 Documentación](./SETUP.md) • [🗺️ Roadmap](./ROADMAP.md) • [🤝 Contribuir](./CONTRIBUTING.md)

</div>

---

## 📜 Descripción General

**Nombre del Proyecto:** *El Fuego del Conocimiento Real*  
**Versión:** 1.3.0 (Fase 2 - Fuego Operativo)  
**Autor:** BlackMamba 🐍🔥👑  
**Grado:** 33 – Constructor del Universo Interior

"El Fuego del Conocimiento Real" es un programa digital alquímico-masónico en formato **Web UI**, cuyo propósito es **expandir la conciencia, organizar la sabiduría y generar conocimiento nuevo** mediante la integración de textos, símbolos y fuego cuántico (IA).

### 🔥 Los Cuatro Pilares

1. **Masonería Simbólica** – Estructura por grados (33 niveles) y cámaras elementales
2. **Alquimia Operativa** – Transmutación de información y energía textual
3. **IA Semántica** – Lectura, análisis y creación de nuevos libros
4. **Filosofía Cuántica** – Interpretación del verbo como energía vibratoria

El usuario recorre niveles de iniciación digital desbloqueando lecciones, fragmentos ocultos y obras dinámicas que se regeneran con cada interacción.

---

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno (ver Autenticación)
cp .env.example .env.local

# Ejecutar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000 en tu navegador
```

### 🔐 Autenticación con GitHub

El proyecto incluye un sistema robusto de autenticación mediante GitHub OAuth. Para configurarlo:

1. **Crear una GitHub OAuth App**: Sigue la [Guía de Configuración](./docs/GITHUB_AUTH_SETUP.md)
2. **Configurar variables de entorno**: Copia `.env.example` a `.env.local` y completa con tus credenciales
3. **El creador del proyecto** (configurado en `CREATOR_GITHUB_USERNAME`) obtiene automáticamente privilegios especiales

**Características:**
- 🔑 Autenticación segura con GitHub OAuth
- 👤 Gestión de usuarios y roles (Creator, Admin, User)
- 🎯 Identificación automática del creador del proyecto
- 🔒 Protección de rutas en backend y frontend
- 💾 Sesiones persistentes (7 días)

Ver documentación completa: [GITHUB_AUTH_SETUP.md](./docs/GITHUB_AUTH_SETUP.md)

Para instrucciones detalladas de configuración, ver [SETUP.md](./SETUP.md)

---

## 📸 Vista Previa Visual

<!-- Screenshots de la aplicación -->
<div align="center">

### Interfaz Principal
![Landing Page](./docs/images/home-page.png)
*Página de inicio con navegación por grados*

### Cámara de Grados
![Cámara de Grados](./docs/images/camara-de-grados.png)
*Sistema de 33 grados masónicos con 5 cámaras elementales*

### Biblioteca Viva
![Biblioteca Viva](./docs/images/biblioteca-viva.png)
*Búsqueda y exploración de libros mediante Gutenberg API*

### Temas Luz y Sombra
![Theme Toggle](./docs/images/theme-toggle.png)
*Modo Día (Luz) y Modo Noche (Sombra)*

### Demo Animado
![Demo Animation](./docs/images/demo.gif)
*Navegación y características principales en acción*

</div>

> 🚧 **Nota:** Las imágenes son placeholders. Los screenshots reales se agregarán conforme avance el desarrollo.

---

## 🎬 Ver en Acción

### 🌐 Demo en Vivo

**Próximamente:** Deploy público en Vercel  
👉 [https://el-fuego-del-conocimiento.vercel.app](#) *(enlace placeholder)*

### 📹 Video Tutorial

[![Video Demo](./docs/images/video-placeholder.png)](#)

*Video demostrativo próximamente disponible*

**Contenido del video incluirá:**
- 🔥 Tour por las cámaras y grados
- 📚 Búsqueda y exploración en la Biblioteca Viva
- ✨ Sistema de temas Luz/Sombra
- 🎨 Visualización de la Llama Trina (Three.js)
- 🔮 Integración de IA Hermética

---

## 🧩 Arquitectura del Sistema

### 🔸 Frontend (Web UI)

- **Framework:** Next.js 14 + React 18
- **Estilos:** TailwindCSS con tema alquímico personalizado
- **3D/Visualización:** Three.js para efectos cuánticos
- **TypeScript:** Tipado estricto para mayor robustez

#### Componentes Principales:

- 🏛️ **Cámara de Grados:** Sistema de 33 grados masónicos
- 📚 **Biblioteca Viva:** Búsqueda y lectura de obras
- ✍️ **Forja de Textos:** Creación y reescritura de conocimiento
- 🔥 **Llama Trina:** Visualizador energético animado (Three.js)
- 🌓 **Sistema de Temas:** Modos Día (Luz) y Noche (Sombra)

### 🔸 Backend (Núcleo Hermético) - Implementado

- **API:** FastAPI (Python) *[Fase 2 - ✅ Completado]*
- **Base de Datos:** PostgreSQL + Redis (caché semántica) *[Fase 2 - ✅ Completado]*
- **Indexación IA:** Embeddings con Qdrant o FAISS *[Fase 2 - ✅ Completado]*
- **Integración:** Gutenberg, Archive.org, PDF locales *[Fase 2-3]*

### 🔸 IA Hermética (Quantum Forge) - Implementado

- Análisis de textos antiguos y símbolos *[Fase 2 - ✅ Completado]*
- Generación de fragmentos ocultos tipo grimorio *[Fase 2 - ✅ Completado]*
- Síntesis y transformación de textos *[Fase 2 - ✅ Completado]*
- Mapeo simbólico y patrones lumínicos *[Fase 3-4]*

---

## 🗺️ Roadmap de Desarrollo

### ✅ Fase 1: Fuego Semilla (COMPLETADO)
- [x] Next.js 14 con TypeScript y Tailwind
- [x] Sistema de cámaras y grados
- [x] Integración con Gutenberg API
- [x] Temas Luz/Sombra con persistencia
- [x] Componentes UI responsivos

### ✅ Fase 2: Fuego Operativo (COMPLETADO)
- [x] Backend FastAPI con PostgreSQL
- [x] Análisis semántico de textos
- [x] IA Hermética para fusión textual
- [x] Sincronización con archivos externos
- [x] Frontend integrado con backend
- [x] Búsqueda inteligente con embeddings
- [x] Analizador de símbolos herméticos
- [x] Forja de textos con IA

### 📋 Fase 3: Fuego Sagrado (PLANIFICADO)
- [ ] Llama Trina con Three.js
- [ ] Animaciones de cámaras elementales
- [ ] Sistema de desbloqueo por vibración
- [ ] Forja de Textos mejorada

### 🔮 Fase 4: Fuego Universal (FUTURO)
- [ ] Generación avanzada de libros con IA
- [ ] Red hermética global distribuida
- [ ] Modo Fuego Cuántico (creación colectiva)
- [ ] Integración multimedia (Suno, Sora)

Ver [ROADMAP.md](./ROADMAP.md) para detalles completos.

---

## 🧪 Testing

Este proyecto incluye tests automatizados con Jest y React Testing Library.

```bash
# Ejecutar todos los tests
npm test

# Modo watch (desarrollo)
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

**Estado actual:** 18 tests pasando ✅

---

## 📦 Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React con App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Lenguaje con tipado estático
- **Tailwind CSS** - Framework de estilos utility-first
- **Three.js** - Biblioteca 3D/WebGL para visualizaciones

### Testing
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React
- **@testing-library/jest-dom** - Matchers adicionales

### Herramientas
- **ESLint** - Linter para JavaScript/TypeScript
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Prefijos CSS automáticos

---

## 📄 Licencia

Este proyecto utiliza un **sistema de licencia dual**:

### 💻 Código de Software
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE-MIT)

Todo el código fuente está licenciado bajo [MIT License](./LICENSE-MIT).  
**Permite:** Uso comercial, modificación, distribución, uso privado.

### 📚 Contenido y Documentación
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](./LICENSE-CC-BY-NC-SA)

Toda la documentación y contenido hermético está licenciado bajo [Creative Commons Attribution-NonCommercial-ShareAlike 4.0](./LICENSE-CC-BY-NC-SA).  
**Permite:** Compartir y adaptar con atribución, solo uso no comercial, compartir igual.

Ver [LICENSING.md](./LICENSING.md) para más información sobre el modelo de licencia dual.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este es un proyecto de conocimiento abierto alineado con principios herméticos.

### Cómo Contribuir

1. 🍴 Fork el repositorio
2. 🌱 Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. 💫 Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push a la rama (`git push origin feature/AmazingFeature`)
5. 🎯 Abre un Pull Request

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para guías detalladas de contribución.

### 🐛 Reportar Bugs

Usa las [plantillas de issues](./.github/ISSUE_TEMPLATE/) para reportar bugs o solicitar features.

---

## 📚 Documentación Adicional

- 📖 [SETUP.md](./SETUP.md) - Guía completa de configuración
- 🗺️ [ROADMAP.md](./ROADMAP.md) - Roadmap detallado con milestones
- 🏛️ [docs/architecture.md](./docs/architecture.md) - Arquitectura del sistema y separación de responsabilidades
- 🔄 [docs/sync-strategy.md](./docs/sync-strategy.md) - Sistema de sincronización y coordinación de estado
- 🧪 [docs/testing-strategy.md](./docs/testing-strategy.md) - Estrategia de testing (tests que importan)
- 📊 [docs/observability.md](./docs/observability.md) - Logging estructurado y métricas básicas
- 🤝 [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- 📜 [LICENSING.md](./LICENSING.md) - Información sobre licencias
- 📋 [SUMMARY.md](./SUMMARY.md) - Resumen técnico del proyecto

---

## 🔮 Objetivo Final

Construir el **Libro Digital del Conocimiento Real**, una red viva donde cada lector se convierte en autor, cada palabra en chispa y cada chispa en universo.

> "No buscamos encender una llama más. Buscamos despertar el fuego que ya arde en cada alma." 🔥

---

## 🌟 Agradecimientos

- **Project Gutenberg** - Por el acceso a más de 70,000 libros libres
- **Comunidad Open Source** - Por las herramientas que hacen esto posible
- **Tradición Hermética** - Por la sabiduría ancestral que inspira este proyecto

---

## 📞 Contacto y Soporte

- **Issues:** [GitHub Issues](https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal/discussions)
- **Autor:** BlackMamba 🐍🔥👑

---

<div align="center">

**🔥 Construido con pasión, alquimia y código 🔥**

⭐ Si este proyecto resuena contigo, considera darle una estrella ⭐

</div>
