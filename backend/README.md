# Backend - El Fuego del Conocimiento Real

## Descripción

Backend del proyecto basado en FastAPI, implementando el "Núcleo Hermético" del sistema.

## Estructura

```
backend/
├── app/
│   ├── api/          # Endpoints de la API
│   ├── core/         # Configuración y utilidades core
│   ├── models/       # Modelos de datos (SQLAlchemy)
│   ├── services/     # Lógica de negocio
│   └── db/           # Configuración de base de datos
├── tests/            # Tests del backend
├── requirements.txt  # Dependencias Python
└── main.py          # Punto de entrada de la aplicación
```

## Instalación

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar migraciones
alembic upgrade head

# Iniciar servidor de desarrollo
uvicorn main:app --reload
```

## API Endpoints

La documentación interactiva estará disponible en:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Módulos Principales

### 1. API de Libros
- Búsqueda semántica
- Descarga y sincronización
- Análisis de contenido

### 2. IA Hermética (Quantum Forge)
- Procesamiento de embeddings
- Generación de texto
- Análisis simbólico

### 3. Sistema de Grados
- Gestión de usuarios
- Progreso y desbloques
- Cámaras de iniciación
