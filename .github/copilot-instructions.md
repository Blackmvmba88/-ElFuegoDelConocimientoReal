## Propósito rápido

Estas instrucciones ayudan a un agente de codificación a entender lo esencial del repositorio "El Fuego del Conocimiento Real" para ser productivo rápidamente.

Resumen corto: la repo apunta a una aplicación Web UI (Next.js + Tailwind + Three.js) que consume un backend en Python (FastAPI) y usa PostgreSQL/Redis y vectores (Qdrant/FAISS) para indexado semántico. El README en la raíz contiene la arquitectura general; usa eso como fuente primaria.

## Dónde mirar primero
- `README.md` (raíz): descripción de arquitectura y componentes (Frontend Next.js, Backend FastAPI, Postgres/Redis, embeddings).
- Busca `package.json`, `requirements.txt`, `pyproject.toml`, `Dockerfile`, `docker-compose.yml`, `src/`, `app/`, `backend/`, `frontend/` para ubicar código real.

## Arquitectura y responsabilidades (extracto accionable)
- Frontend: Next.js + Tailwind + Three.js — componentes UI: `Cámara de Grados`, `Forja de Textos`, `Biblioteca Viva`, `Llama Trina`.
- Backend: FastAPI — API para ingestión y síntesis, trabaja con PostgreSQL (persistencia) y Redis (cache semántica).
- Indexado/IA: Embeddings + Qdrant/FAISS para búsquedas semánticas y generación por el módulo "IA Hermética".

Cuando agregues o modifiques código, pregúntate: ¿estoy tocando UI (Next), API (FastAPI), o la capa de IA/indexado? Mantén límites claros entre estas capas.

## Flujo de trabajo típico del desarrollador
- Si existe `package.json`: instalar dependencias y arrancar frontend con `npm install` / `npm run dev` (o `pnpm`/`yarn` según lockfile).
- Si existe `requirements.txt` o `pyproject.toml`: crear un entorno virtual e instalar dependencias; arrancar backend con `uvicorn app:app --reload` (ajusta `app:app` según módulo).
- Si no hay orquestación, busca `docker-compose.yml` para levantar Postgres/Redis/Qdrant.

Nota: estos comandos son convenciones estándares referidas desde el README; antes de ejecutarlos, confirma la presencia de los archivos de configuración mencionados.

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
- Comprobar presencia de scripts: `ls -la | egrep "package.json|requirements.txt|pyproject.toml|docker-compose.yml"`.

Si no encuentras implementación (por ejemplo solo hay README), abre un issue/PR proponiendo la estructura a implementar y documenta las primeras decisiones (carpetas, scripts, start commands).

## Qué evitar
- No asumas un entorno de ejecución sin confirmar archivos de configuración. El README describe la intención, pero la implementación puede faltar.
- No mezclar logic de indexado/IA dentro de componentes UI. Mantén una API clara entre capas.

## Preguntas para el mantenedor (si faltan artefactos)
1. ¿Existe el código fuente del frontend/backend aquí o se mantiene en repositorios separados?
2. ¿Preferís Docker-compose para desarrollo o instrucciones locales con virtualenv/Node? Responder esto guía los comandos de inicio que el agente debe proponer.

---
Si quieres, hago una segunda pasada y adapto el archivo a partir de la estructura real si me indicas dónde está el código (o si quieres que busque más a fondo por nombres alternativos). ¿Qué prefieres? 
