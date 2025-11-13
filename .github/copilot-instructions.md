## Propósito rápido

Estas instrucciones ayudan a un agente de codificación a entender lo esencial del repositorio "El Fuego del Conocimiento Real" para ser productivo rápidamente.

Resumen corto: la repo apunta a una aplicación Web UI (Next.js + Tailwind + Three.js) que consume un backend en Python (FastAPI) y usa PostgreSQL/Redis y vectores (Qdrant/FAISS) para indexado semántico. El README en la raíz contiene la arquitectura general; usa eso como fuente primaria.

## Dónde mirar primero
- `README.md` (raíz): descripción de arquitectura y componentes (Frontend Next.js, Backend FastAPI, Postgres/Redis, embeddings).
- `frontend/package.json`: dependencias del frontend Next.js
- `backend/requirements.txt`: dependencias del backend Python
- `docker-compose.yml`: orquestación de servicios (Postgres, Redis, Qdrant)
- `docs/arquitectura.md`: documentación detallada de arquitectura
- Estructura frontend: `frontend/app/`, `frontend/components/`, `frontend/lib/`
- Estructura backend: `backend/app/`, `backend/main.py`

## Arquitectura y responsabilidades (extracto accionable)
- Frontend: Next.js + Tailwind + Three.js — componentes UI: `Cámara de Grados`, `Forja de Textos`, `Biblioteca Viva`, `Llama Trina`.
- Backend: FastAPI — API para ingestión y síntesis, trabaja con PostgreSQL (persistencia) y Redis (cache semántica).
- Indexado/IA: Embeddings + Qdrant/FAISS para búsquedas semánticas y generación por el módulo "IA Hermética".

Cuando agregues o modifiques código, pregúntate: ¿estoy tocando UI (Next), API (FastAPI), o la capa de IA/indexado? Mantén límites claros entre estas capas.

## Flujo de trabajo típico del desarrollador
- **Frontend**: existe `frontend/package.json`. Instalar dependencias con `npm install` y arrancar con `npm run dev` (puerto 3000).
- **Backend**: existe `backend/requirements.txt`. Crear un entorno virtual con `python -m venv venv`, activar, instalar dependencias con `pip install -r requirements.txt`, y arrancar con `uvicorn main:app --reload` desde el directorio `backend/` (puerto 8000).
- **Servicios**: usa `docker-compose.yml` para levantar Postgres, Redis, y Qdrant con `docker-compose up -d`.
- Ver archivos `.env.example` en `frontend/` y `backend/` para configurar variables de entorno.

## Patrones y convenciones del proyecto
- Nombres semánticos: componentes y módulos usan nombres simbólicos (ej. `Cámara de Grados`, `Forja de Textos`). Usa esos nombres en commits y PRs para claridad.
- Separación clara: UI <-> API <-> Indexado. Evita mezclar lógica de negocio de IA en componentes UI.
- Embeddings y caché: usa Redis para caché semántica y Qdrant/FAISS para almacenamiento de vectores. Persistencia primaria: PostgreSQL.

## Integraciones externas y puntos de interés
- Fuentes externas de datos: Gutenberg, Archive.org, y APIs de libros (mencionadas en README). Revisa cualquier adaptador en `backend/` o `integrations/`.
- Servicios de IA: puede haber integración con motores externos (Suno, Sora, Codex) — busca adaptadores con nombres similares.

## Ejemplos útiles para un agente (tareas frecuentes)
- Añadir endpoint: crear ruta en FastAPI, pruebas mínimas, y documentar en README o OpenAPI.
- Añadir componente UI: colocar en la carpeta frontend (`components/` o `app/`), exponer props claras y escribir una historia/PR con captura.
- Indexado: añadir pipeline para extracción de embeddings y una prueba que compara búsquedas antes/después.

## Búsquedas y comprobaciones rápidas (comandos de ejemplo)
Antes de cambiar nada, busca referencias:
- Buscar framework o archivos clave: `git grep -n "Next.js\|FastAPI\|PostgreSQL\|Qdrant\|FAISS"`.
- Comprobar presencia de scripts: `ls -la | egrep "package.json|requirements.txt|docker-compose.yml"`.
- Ver estructura: `tree -L 2 frontend/` o `tree -L 2 backend/`.

La implementación base ahora existe:
- Frontend: Next.js con App Router, TailwindCSS, y configuración para Three.js
- Backend: FastAPI con main.py funcional y estructura de directorios
- Infraestructura: docker-compose.yml con Postgres, Redis, y Qdrant
- Documentación: LICENSE, CONTRIBUTING.md, y docs/arquitectura.md

## Qué evitar
- No mezclar lógica de indexado/IA dentro de componentes UI. Mantén una API clara entre capas.
- Mantener la separación entre frontend (puerto 3000) y backend (puerto 8000).
- No commitear archivos .env - usar .env.example como plantilla.

## Preguntas para el mantenedor (si se necesita más claridad)
1. ¿Qué servicio de IA externa prefieres usar? (OpenAI, local models, etc.)
2. ¿Prefieres Qdrant o FAISS para el almacenamiento de vectores?
3. ¿Hay requisitos específicos de autenticación/autorización?

---

**Nota:** La estructura base ahora está implementada. Los próximos pasos son implementar la lógica de negocio en cada capa según las fases del roadmap. 
