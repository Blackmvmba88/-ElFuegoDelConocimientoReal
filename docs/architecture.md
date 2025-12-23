# 🏛️ Arquitectura del Sistema - El Fuego del Conocimiento Real

## 📐 Principio Rector

> **Regla de Oro**: Si un componente no sabe en qué contexto temporal vive ni qué eventos consume, no pertenece al núcleo (CORE).

Esta arquitectura separa responsabilidades para **reducir fricción**, **aumentar claridad** y **preparar escalabilidad** sin matar la creatividad.

---

## 🔥 Estructura del Monorepo (Mental Model)

### **CORE (Estable)** 
Componentes fundamentales que definen la lógica de negocio y no cambian con cada interfaz:

#### `lib/` - Lógica de Negocio Central
- **`lib/levels.ts`** - Sistema de 33 grados masónicos
- **`lib/chambers.ts`** - 5 cámaras elementales (Silencio, Luz, Fuego, Aire, Éter)
- **`lib/gutenberg-client.ts`** - Cliente para API de Gutenberg
- **`lib/semantic-engine.ts`** *(Futuro)* - Motor de análisis semántico
- **`lib/fusion-engine.ts`** *(Futuro)* - Síntesis y fusión de textos

**Responsabilidad**: Lógica pura, sin dependencias de UI. Exportan funciones y tipos.

#### `types/` - Contratos y Esquemas
- **`types/event-schema.ts`** - Esquema de eventos del sistema
- **`types/core.ts`** - Tipos fundamentales del dominio
- **`types/api.ts`** - Contratos de API

**Responsabilidad**: Definir interfaces claras entre capas. Todo componente debe tipar sus inputs/outputs.

---

### **INTERFACES (Mutables)**
Componentes de presentación que pueden cambiar sin afectar la lógica:

#### `components/` - Componentes UI
- **Presentacionales**: `Header.tsx`, `Navigation.tsx`, `ThemeToggle.tsx`
- **Contenedores de Dominio**: 
  - `CamaraDeGrados.tsx` - Navegación de grados
  - `BibliotecaViva.tsx` - Exploración de libros
  - `ForjaDeTextos.tsx` - Creación y edición
  - `LlamaTrina.tsx` - Visualización energética (Three.js)

**Responsabilidad**: Renderizar UI, manejar interacción local, NO contener lógica de negocio.

#### `app/` - Rutas y Páginas (Next.js App Router)
- **Rutas públicas**: `/`, `/biblioteca`, `/forja`, `/camara`
- **Layouts**: Estructura y navegación común

**Responsabilidad**: Orquestar componentes, manejar routing, fetching de datos en server components.

---

### **INTELIGENCIA / IA (Planificado)**
Servicios que procesan, analizan y generan conocimiento:

#### Backend Services *(Fase 2)*
- **`services/ingest/`** - Ingestión de textos desde múltiples fuentes
  - Gutenberg, Archive.org, PDFs locales
  - Normalización de formatos
  - Extracción de metadatos

- **`services/semantic-analysis/`** - Motor de análisis semántico
  - Tokenización y procesamiento NLP
  - Detección de símbolos herméticos
  - Análisis de correspondencias
  - Generación de embeddings

- **`services/synthesis/`** - Motor de síntesis (IA Hermética)
  - Fusión inteligente de textos
  - Generación de fragmentos ocultos
  - Transformación estilística
  - Creación de nuevas obras

- **`services/state-sync/`** - Coordinador de Estado
  - Fuente de verdad para sesiones de usuario
  - Sincronización entre frontend/backend
  - Persistencia de progreso
  - Modo record/replay para debugging

#### Data Layer *(Fase 2)*
- **PostgreSQL**: Persistencia principal (usuarios, libros, anotaciones)
- **Redis**: Caché semántica y sesiones activas
- **Qdrant/FAISS**: Búsqueda vectorial para embeddings

---

## 🔄 Flujo de Datos y Eventos

### Arquitectura Basada en Eventos

Todos los componentes del sistema se comunican mediante eventos tipados. Esto permite:
- ✅ Desacoplamiento entre capas
- ✅ Testing aislado de componentes
- ✅ Trazabilidad de acciones
- ✅ Replay y debugging

### Tipos de Eventos Base

```typescript
// Definidos en types/event-schema.ts

interface BaseEvent {
  timestamp: number;        // Unix timestamp ms
  duration?: number;        // Duración del evento (ms)
  confidence: number;       // 0-1, certeza del evento
  payload: unknown;         // Datos específicos del evento
}

interface TextAnalysisEvent extends BaseEvent {
  type: 'text_analysis';
  payload: {
    bookId: string;
    keywords: string[];
    symbols: string[];
    energy: 'low' | 'medium' | 'high';
  };
}

interface UserProgressEvent extends BaseEvent {
  type: 'user_progress';
  payload: {
    userId: string;
    grade: number;
    chamber: string;
    actionType: 'read' | 'write' | 'fuse';
  };
}

interface SemanticSearchEvent extends BaseEvent {
  type: 'semantic_search';
  payload: {
    query: string;
    results: Array<{ bookId: string; score: number }>;
  };
}
```

---

## 🎯 Separación de Responsabilidades

### Frontend (Next.js + React)
**Lo que DEBE hacer**:
- Renderizar UI responsive
- Manejar interacciones inmediatas
- Mostrar feedback visual
- Cachear datos no críticos (React Query futuro)

**Lo que NO debe hacer**:
- Análisis semántico pesado
- Generación de embeddings
- Lógica de negocio compleja
- Persistencia crítica

### Backend (FastAPI - Planificado Fase 2)
**Lo que DEBE hacer**:
- Análisis semántico y NLP
- Generación de embeddings
- Síntesis y fusión de textos
- Gestión de sesiones y usuarios
- Coordinación de estado

**Lo que NO debe hacer**:
- Decisiones de UI/UX
- Renderizado de componentes
- Manejo de temas o preferencias visuales

---

## 📊 Capas del Sistema

```
┌─────────────────────────────────────────────────┐
│  INTERFAZ (Mutable)                             │
│  • Components React                             │
│  • Páginas Next.js                              │
│  • Visualizaciones Three.js                     │
└──────────────────┬──────────────────────────────┘
                   │ Eventos UI
                   ↓
┌─────────────────────────────────────────────────┐
│  COORDINACIÓN (State Sync Service)              │
│  • Gestión de sesiones                          │
│  • Event bus                                    │
│  • Caché y sincronización                       │
└──────────────────┬──────────────────────────────┘
                   │ Eventos de Dominio
                   ↓
┌─────────────────────────────────────────────────┐
│  CORE (Estable)                                 │
│  • Lógica de grados y cámaras                   │
│  • Tipos y contratos                            │
│  • Validaciones                                 │
└──────────────────┬──────────────────────────────┘
                   │ Comandos
                   ↓
┌─────────────────────────────────────────────────┐
│  INTELIGENCIA (IA)                              │
│  • Análisis semántico                           │
│  • Síntesis de textos                           │
│  • Embeddings y búsqueda vectorial              │
└──────────────────┬──────────────────────────────┘
                   │ Queries
                   ↓
┌─────────────────────────────────────────────────┐
│  PERSISTENCIA                                   │
│  • PostgreSQL (datos estructurados)             │
│  • Redis (caché)                                │
│  • Qdrant/FAISS (vectores)                      │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Principios de Desarrollo

### 1. **Claridad sobre Cleverness**
Prefiere código explícito y fácil de seguir sobre optimizaciones prematuras.

### 2. **Componibilidad**
Cada módulo debe poder usarse de forma aislada con mocks claros.

### 3. **Testabilidad desde el Diseño**
Si no puedes escribir un test significativo, el componente está mal diseñado.

### 4. **Contexto Temporal Explícito**
Todo evento, log o métrica debe incluir timestamp. La observabilidad depende de esto.

### 5. **Fail Fast, Fail Loud**
Mejor un error claro temprano que comportamiento silencioso incorrecto.

---

## 🧪 Estrategia de Testing

### Tests de Frontera (Priority)
Enfocarse en las interfaces entre capas:
- ✅ Validación de contratos de eventos
- ✅ Respuestas de API (mocks de Gutenberg)
- ✅ Transformaciones de datos críticas
- ✅ Flujos de usuario end-to-end clave

### Tests Unitarios (Selective)
Solo para lógica compleja en CORE:
- ✅ Cálculos de progresión de grados
- ✅ Parsers y validadores
- ✅ Algoritmos de síntesis (futuro)

### Tests de Integración (Future)
Cuando exista backend:
- ✅ Frontend + Backend API
- ✅ Backend + Bases de datos
- ✅ Flujos completos con estado

**Anti-patrón**: Tests que solo verifican que React renderiza sin error. Esos no aportan valor.

---

## 📈 Observabilidad Mínima

### Structured Logging
Todos los logs en formato JSON:
```json
{
  "timestamp": 1703376000000,
  "level": "info",
  "component": "semantic-analysis",
  "event": "text_analyzed",
  "bookId": "gutenberg-1234",
  "duration": 234,
  "metadata": {
    "keywords_found": 12,
    "symbols_detected": 3
  }
}
```

### Métricas Básicas (Sin Dashboards Aún)
- **Latencia**: Tiempo de respuesta por operación
- **Errores**: Tasa de fallo por endpoint/componente
- **Throughput**: Operaciones por segundo
- **User Actions**: Eventos de interacción (lectura, escritura, fusión)

**Objetivo**: VER el sistema respirar antes de optimizar.

---

## 🚀 Plan de Migración (Fase Actual → Fase 2)

### Estado Actual (Fase 1)
- ✅ Frontend Next.js con componentes básicos
- ✅ Integración con Gutenberg API (client-side)
- ✅ Sistema de temas y navegación

### Próximos Pasos (Fase 2)
1. **Backend Foundation**
   - Crear `services/ingest` para normalizar fuentes de datos
   - Implementar `services/state-sync` como coordinador central
   - Setup PostgreSQL + Redis + esquemas

2. **Event System**
   - Definir todos los eventos en `types/event-schema.ts`
   - Implementar event bus básico (puede ser simple pub/sub en memoria inicialmente)
   - Migrar componentes a consumir eventos tipados

3. **Testing Infrastructure**
   - Setup Jest con tests de frontera
   - Crear mocks de servicios externos
   - CI/CD con tests automáticos

4. **IA Básica**
   - Análisis semántico simple (keyword extraction)
   - Embeddings básicos con OpenAI o modelo local
   - Primera versión de fusión de textos

---

## 📚 Referencias y Recursos

- **Next.js App Router**: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- **Event-Driven Architecture**: [martinfowler.com/articles/201701-event-driven.html](https://martinfowler.com/articles/201701-event-driven.html)
- **Semantic Search**: Qdrant, FAISS, Pinecone
- **NLP Tools**: spaCy, Hugging Face Transformers

---

## ✨ Conclusión

Esta arquitectura establece las bases para un sistema escalable, mantenible y testeable. La separación clara entre CORE, INTERFACES e INTELIGENCIA permite:

- **Evolución independiente** de cada capa
- **Testing efectivo** de componentes aislados
- **Onboarding rápido** de nuevos desarrolladores
- **Debugging rastreable** mediante eventos

El sistema ya no es un experimento. Está a una capa de convertirse en plataforma.

---

**Última Actualización**: Diciembre 2024  
**Próxima Revisión**: Post-implementación Fase 2
