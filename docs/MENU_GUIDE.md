# 🔥 Menu del Sistema - Guía de Usuario

## Descripción

El menú interactivo de El Fuego del Conocimiento Real es una interfaz de terminal (TUI) que facilita todas las operaciones de desarrollo del proyecto. Es completamente multiplataforma y compatible con:

- ✅ **Linux** (Ubuntu, Debian, Fedora, Arch, etc.)
- ✅ **macOS** (todas las versiones recientes)
- ✅ **Windows** (10/11, PowerShell, CMD)
- ✅ **Termux** (Android)
- ✅ **WSL** (Windows Subsystem for Linux)

## Características Principales

### 🎨 Interfaz Intuitiva
- Menú visual con colores y emojis
- Navegación simple con números
- Retroalimentación clara en cada operación
- Detección automática de plataforma

### 🚀 Funciones Principales

1. **Start Frontend** - Inicia el servidor de desarrollo de Next.js
2. **Start Backend** - Inicia el servidor FastAPI con Docker o uvicorn
3. **Start Full Stack** - Guía para iniciar ambos servicios
4. **Run Tests** - Ejecuta suite completa de tests
5. **Check System Health** - Verifica dependencias y configuración
6. **View Documentation** - Lista documentación disponible
7. **Development Tools** - Herramientas adicionales de desarrollo
8. **System Information** - Muestra información detallada del sistema

### 🛠️ Herramientas de Desarrollo

El submenú de herramientas incluye:
- Instalación de dependencias (frontend + backend)
- Build de producción
- Linting de código
- Formateo de código
- Limpieza de artefactos de build

## Instalación y Uso

### Requisitos Previos

- **Python 3.7+** (requisito mínimo)
- **Node.js 18+** (para el frontend)
- **Git** (para gestión de versiones)
- **Docker** (opcional, para backend con contenedores)

### Primera Ejecución

#### En Linux / macOS / Termux

```bash
# Dar permisos de ejecución (solo primera vez)
chmod +x menu.sh

# Ejecutar el menú
./menu.sh
```

#### En Windows

```cmd
# Opción 1: Doble clic en menu.bat desde el Explorador

# Opción 2: Desde CMD o PowerShell
menu.bat
```

#### Método Universal (cualquier plataforma)

```bash
# Con Python 3
python3 menu.py

# O simplemente python (si es Python 3)
python menu.py
```

## Guía de Uso Detallada

### 1️⃣ Iniciar Frontend

Cuando seleccionas la opción **1. Start Frontend**:

1. El menú verifica si existen las dependencias (`node_modules`)
2. Si no existen, las instala automáticamente con `npm install`
3. Inicia el servidor de desarrollo con `npm run dev`
4. El frontend estará disponible en `http://localhost:3000`

**Nota:** Presiona `Ctrl+C` para detener el servidor.

### 2️⃣ Iniciar Backend

Cuando seleccionas la opción **2. Start Backend**:

El menú intentará usar Docker Compose primero:
- Si Docker está disponible: inicia todos los servicios (PostgreSQL, Redis, Qdrant, FastAPI)
- Si Docker no está disponible: crea un entorno virtual Python e inicia solo el servidor FastAPI

El backend estará disponible en:
- API: `http://localhost:8000`
- Documentación: `http://localhost:8000/docs`

### 3️⃣ Iniciar Full Stack

Esta opción proporciona instrucciones para ejecutar frontend y backend simultáneamente. Necesitarás:
- Dos terminales separadas, o
- Un multiplexor de terminal como `tmux` o `screen`

**Recomendación:**
```bash
# Terminal 1
./menu.sh
# Seleccionar opción 2 (Backend)

# Terminal 2
./menu.sh
# Seleccionar opción 1 (Frontend)
```

### 4️⃣ Ejecutar Tests

Ejecuta automáticamente:
- Tests de frontend con Jest
- Tests de backend con pytest

Muestra un resumen de resultados al finalizar.

### 5️⃣ Verificar Salud del Sistema

Realiza verificaciones de:

**Dependencias:**
- Node.js y npm
- Python
- Docker y Docker Compose
- Git

**Estructura del Proyecto:**
- Archivos de configuración
- Directorios principales
- Módulos instalados

**Resultado:**
- ✓ Verde: Todo correcto
- ✗ Rojo: Falta instalar
- ⚠ Amarillo: Opcional o advertencia

### 6️⃣ Ver Documentación

Lista todos los archivos de documentación disponibles:
- README.md
- SETUP.md
- QUICKSTART.md
- ROADMAP.md
- CONTRIBUTING.md

También indica la URL de la documentación de la API.

### 7️⃣ Herramientas de Desarrollo

Submenú con funciones adicionales:

#### 7.1 - Instalar Dependencias
Instala todas las dependencias del proyecto:
- Frontend: `npm install`
- Backend: `pip install -r requirements.txt`

#### 7.2 - Build Frontend
Compila el proyecto Next.js para producción:
```bash
npm run build
```

#### 7.3 - Lint Code
Ejecuta el linter (ESLint) para verificar calidad del código:
```bash
npm run lint
```

#### 7.4 - Format Code
Formatea el código (requiere Prettier configurado):
```bash
npm run format
```

#### 7.5 - Clean Build
Elimina artefactos de compilación:
- `.next/` (build de Next.js)
- `out/` (export de Next.js)
- `node_modules/.cache/`
- `backend/__pycache__/`
- `backend/.pytest_cache/`

### 8️⃣ Información del Sistema

Muestra información detallada:

**Plataforma:**
- Sistema operativo
- Arquitectura
- Versión de Python
- Detección de Termux

**Versiones:**
- Node.js
- npm
- Docker

**Rutas:**
- Directorio del proyecto
- Directorio de trabajo actual

## Uso en Diferentes Plataformas

### Linux / macOS

```bash
# Método recomendado
./menu.sh

# Alternativa
python3 menu.py
```

**Características especiales:**
- Soporte para colores ANSI completo
- Integración con bash/zsh
- Permisos de ejecución automáticos

### Windows

```cmd
REM Método recomendado (CMD)
menu.bat

REM PowerShell
.\menu.bat

REM Con Python directamente
python menu.py
```

**Características especiales:**
- Detección automática de Python (python, python3, py)
- Compatible con CMD y PowerShell
- Soporte de colores en Windows 10+

### Termux (Android)

```bash
# Instalar Python primero si no está instalado
pkg install python

# Ejecutar el menú
./menu.sh

# O con Python
python menu.py
```

**Características especiales:**
- Detección automática de Termux
- Adaptación de comandos para Android
- Interfaz optimizada para pantallas pequeñas

### WSL (Windows Subsystem for Linux)

```bash
# Funciona igual que en Linux
./menu.sh
```

## Solución de Problemas

### Error: Python no está instalado

**Síntoma:** `python3: command not found` o `Python is not installed`

**Solución:**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3

# macOS
brew install python3

# Windows
# Descargar de https://www.python.org/downloads/

# Termux
pkg install python
```

### Error: Permisos denegados (Linux/macOS)

**Síntoma:** `Permission denied: ./menu.sh`

**Solución:**
```bash
chmod +x menu.sh menu.py
```

### Error: npm no encontrado

**Síntoma:** El menú no puede iniciar el frontend

**Solución:**
```bash
# Instalar Node.js y npm primero

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node

# Windows
# Descargar de https://nodejs.org/

# Termux
pkg install nodejs
```

### Error: Docker no encontrado

**Síntoma:** Backend no inicia con Docker

**Solución:**
- El menú automáticamente usará uvicorn si Docker no está disponible
- O instala Docker: https://docs.docker.com/get-docker/

### Los colores no se ven bien

**Síntoma:** Caracteres extraños en lugar de colores

**Solución:**
- Windows: Usa Windows Terminal en lugar de CMD
- Terminal antigua: Los colores se desactivan automáticamente
- Termux: Actualiza Termux a la última versión

### Ctrl+C no detiene el servidor

**Síntoma:** El proceso continúa después de Ctrl+C

**Solución:**
- Presiona Ctrl+C nuevamente
- En Windows, presiona Ctrl+Break
- Como último recurso, cierra la terminal

## Tips y Mejores Prácticas

### 1. Usar tmux para Full Stack

```bash
# Instalar tmux
sudo apt install tmux  # Linux
brew install tmux      # macOS
pkg install tmux       # Termux

# Crear sesión
tmux new -s elfuego

# Panel izquierdo: backend
./menu.sh
# Seleccionar opción 2

# Dividir pantalla (Ctrl+b luego ")
# Panel derecho: frontend
./menu.sh
# Seleccionar opción 1
```

### 2. Alias para Acceso Rápido

Añade a tu `.bashrc` o `.zshrc`:

```bash
alias elfuego='cd /ruta/a/ElFuegoDelConocimientoReal && ./menu.sh'
```

Luego simplemente ejecuta:
```bash
elfuego
```

### 3. Variables de Entorno

Crea un archivo `.env` antes de ejecutar el menú:

```bash
# Frontend (.env.local)
cp .env.example .env.local

# Backend (backend/.env)
cd backend
cp .env.example .env
```

### 4. Verificar Salud Regularmente

Antes de comenzar a trabajar:
```bash
./menu.sh
# Seleccionar opción 5 (Check System Health)
```

### 5. Limpiar Builds Periódicamente

Si tienes problemas extraños:
```bash
./menu.sh
# Seleccionar opción 7 (Development Tools)
# Luego opción 5 (Clean Build)
```

## Personalización

### Deshabilitar Colores

Si prefieres salida sin colores:

```bash
# Linux/macOS
export TERM=dumb
./menu.sh

# Windows
set TERM=dumb
menu.bat
```

### Cambiar Puerto del Frontend

Edita `package.json`:
```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

### Cambiar Puerto del Backend

Edita `backend/.env`:
```
PORT=8001
```

## Comandos Equivalentes

Si prefieres ejecutar comandos manualmente:

| Opción del Menú | Comando Equivalente |
|-----------------|---------------------|
| Start Frontend | `npm run dev` |
| Start Backend | `cd backend && docker-compose up` |
| Run Tests | `npm test && cd backend && pytest` |
| Build Frontend | `npm run build` |
| Lint Code | `npm run lint` |
| Install Deps | `npm install && cd backend && pip install -r requirements.txt` |

## Soporte y Contribuciones

- **Issues:** [GitHub Issues](https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal/discussions)

## Changelog del Menú

### Version 1.0.0 (Inicial)
- ✅ Soporte multi-plataforma completo
- ✅ Menú interactivo con TUI
- ✅ 8 opciones principales
- ✅ Submenú de herramientas de desarrollo
- ✅ Verificación de salud del sistema
- ✅ Detección automática de plataforma
- ✅ Manejo inteligente de Docker/no-Docker
- ✅ Scripts de wrapper para todos los sistemas

---

🔥 **¡Que el fuego del conocimiento ilumine tu desarrollo!** 🔥
