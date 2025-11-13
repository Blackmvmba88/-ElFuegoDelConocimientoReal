# Arquitectura del Sistema

## Visión General

"El Fuego del Conocimiento Real" es un sistema distribuido compuesto por múltiples servicios que trabajan en conjunto para proporcionar una experiencia de gestión del conocimiento inmersiva y potenciada por IA.

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Next.js App │  │  Three.js 3D │  │  TailwindCSS │      │
│  │   (React)    │  │ Visualizer   │  │    Styles    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY (FastAPI)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Authentication │ Rate Limiting │ Request Routing   │   │
│  └─────────────────────────────────────────────────────┘   │
└────────┬────────────────┬───────────────────┬───────────────┘
         │                │                   │
         ▼                ▼                   ▼
┌─────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Books     │  │   AI Hermética  │  │     Users       │
│   Service   │  │   (Quantum      │  │     Service     │
│             │  │    Forge)       │  │                 │
└──────┬──────┘  └────────┬────────┘  └────────┬────────┘
       │                  │                     │
       │                  ▼                     │
       │         ┌─────────────────┐            │
       │         │   Embeddings    │            │
       │         │   & Vectors     │            │
       │         └────────┬────────┘            │
       │                  │                     │
       ▼                  ▼                     ▼
┌──────────────────────────────────────────────────────┐
│              CAPA DE PERSISTENCIA                     │
│  ┌───────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ PostgreSQL│  │  Redis   │  │  Qdrant/FAISS    │  │
│  │  (Datos)  │  │ (Caché)  │  │   (Vectores)     │  │
│  └───────────┘  └──────────┘  └──────────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Componentes Principales

### 1. Frontend (Next.js)

**Responsabilidades:**
- Interfaz de usuario responsive
- Visualizaciones 3D con Three.js
- Estado de la aplicación del cliente
- Enrutamiento y navegación

**Tecnologías:**
- Next.js 14+ (App Router)
- React 18+
- TailwindCSS
- Three.js / React Three Fiber
- Framer Motion (animaciones)

### 2. Backend API (FastAPI)

**Responsabilidades:**
- Endpoints REST
- Autenticación y autorización
- Lógica de negocio
- Orquestación de servicios

**Tecnologías:**
- FastAPI
- Pydantic (validación)
- SQLAlchemy (ORM)
- Python 3.10+

### 3. Base de Datos (PostgreSQL)

**Responsabilidades:**
- Almacenamiento persistente
- Datos estructurados
- Transacciones ACID

**Esquemas principales:**
- `users`: Usuarios y perfiles
- `books`: Metadatos de libros
- `grades`: Sistema de grados de iniciación
- `reading_progress`: Progreso de lectura

### 4. Caché (Redis)

**Responsabilidades:**
- Caché de sesiones
- Caché de consultas frecuentes
- Rate limiting
- Cache semántica

**Usos:**
- Tokens de autenticación
- Resultados de búsqueda
- Datos de usuario activos

### 5. Motor de Vectores (Qdrant/FAISS)

**Responsabilidades:**
- Búsqueda semántica
- Almacenamiento de embeddings
- Similarity search

**Características:**
- Indexación de documentos
- Búsqueda por similitud vectorial
- Clustering de contenido

### 6. IA Hermética (Quantum Forge)

**Responsabilidades:**
- Generación de embeddings
- Análisis de texto
- Síntesis de conocimiento
- Detección de símbolos

**Tecnologías:**
- Sentence Transformers
- OpenAI API (opcional)
- Custom ML models

## Flujo de Datos

### Flujo de Búsqueda Semántica

```
1. Usuario ingresa consulta en Frontend
2. Frontend envía request a API
3. API genera embedding de consulta
4. API busca vectores similares en Qdrant
5. API recupera documentos de PostgreSQL
6. API retorna resultados rankeados
7. Frontend muestra resultados al usuario
```

### Flujo de Síntesis de Texto

```
1. Usuario selecciona textos fuente
2. Frontend envía textos a API
3. API invoca IA Hermética
4. IA procesa y genera nuevo texto
5. API almacena resultado
6. Frontend muestra texto generado
```

## Principios de Diseño

### 1. Separación de Responsabilidades
Cada capa tiene responsabilidades claramente definidas.

### 2. Escalabilidad
Componentes pueden escalar horizontalmente de forma independiente.

### 3. Resiliencia
Fallback strategies y circuit breakers en servicios críticos.

### 4. Seguridad
- Autenticación JWT
- CORS configurado
- Rate limiting
- Sanitización de inputs

### 5. Observabilidad
- Logging estructurado
- Métricas de performance
- Tracing distribuido (futuro)

## Patrones de Arquitectura Utilizados

1. **API Gateway Pattern**: FastAPI como punto único de entrada
2. **Repository Pattern**: Abstracción de acceso a datos
3. **Service Layer**: Lógica de negocio separada de endpoints
4. **Cache-Aside**: Redis como caché de lectura
5. **CQRS (parcial)**: Separación de lecturas y escrituras complejas

## Consideraciones de Deployment

### Desarrollo
```bash
docker-compose up
```

### Producción (futuro)
- Kubernetes para orquestación
- Load balancer (Nginx/Traefik)
- CDN para assets estáticos
- Backup automatizado de bases de datos

## Seguridad

### Autenticación
- JWT tokens con refresh
- Password hashing (bcrypt)
- Rate limiting por IP

### Datos
- Encriptación en tránsito (HTTPS)
- Encriptación en reposo (futuro)
- Sanitización de inputs

### API
- CORS configurado
- Headers de seguridad
- Validación estricta con Pydantic

## Monitoreo y Logs (Futuro)

- Prometheus para métricas
- Grafana para visualización
- ELK Stack para logs centralizados
- Sentry para error tracking

## Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [Three.js Documentation](https://threejs.org/docs/)
