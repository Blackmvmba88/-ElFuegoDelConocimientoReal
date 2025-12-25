# GitHub OAuth Authentication Setup Guide

Este documento explica cómo configurar la autenticación con GitHub OAuth en "El Fuego del Conocimiento Real".

## 🔑 Características del Sistema de Autenticación

- **GitHub OAuth**: Autenticación segura mediante GitHub
- **Identificación del Creador**: El usuario con el GitHub username configurado es automáticamente identificado como creador
- **Roles y Permisos**: Sistema de roles (Creator, Admin, User)
- **JWT Tokens**: Tokens seguros para API backend
- **NextAuth.js**: Gestión de sesiones en el frontend
- **Sesión Persistente**: Las sesiones duran 7 días

## 📋 Paso 1: Crear una GitHub OAuth App

1. Ve a GitHub Settings: https://github.com/settings/developers
2. Click en "OAuth Apps" → "New OAuth App"
3. Completa los campos:
   - **Application name**: El Fuego del Conocimiento Real (Local)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Guarda el **Client ID**
6. Click "Generate a new client secret" y guarda el **Client Secret**

### Para Producción

Crea otra OAuth App con:
- **Homepage URL**: `https://tu-dominio.com`
- **Authorization callback URL**: `https://tu-dominio.com/api/auth/callback/github`

## 🔧 Paso 2: Configurar Variables de Entorno

### Frontend (.env.local)

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-app-client-secret

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Backend (.env)

Crea un archivo `.env` en la carpeta `backend/`:

```env
# Application
DEBUG=true
HOST=0.0.0.0
PORT=8000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/elfuego

# Redis
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-secret-key-for-jwt-tokens

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-app-client-secret
GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/callback/github

# Creator identification
CREATOR_GITHUB_USERNAME=Blackmvmba88
```

**⚠️ IMPORTANTE**: Reemplaza `Blackmvmba88` con tu GitHub username si eres tú el creador del proyecto.

## 🚀 Paso 3: Instalar Dependencias

### Frontend
```bash
npm install
```

### Backend
```bash
cd backend
pip install -r requirements.txt
```

## 🗄️ Paso 4: Configurar Base de Datos

```bash
cd backend

# Crear base de datos (si no existe)
createdb elfuego

# Ejecutar migraciones
alembic upgrade head
```

## ▶️ Paso 5: Iniciar los Servicios

### Terminal 1 - Backend
```bash
cd backend
python -m app.main
# O con uvicorn:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Frontend
```bash
npm run dev
```

## 🧪 Paso 6: Probar la Autenticación

1. Abre http://localhost:3000
2. Click en "Iniciar con GitHub"
3. Autoriza la aplicación en GitHub
4. Serás redirigido de vuelta a la aplicación, autenticado

## 🔐 Roles y Permisos

### Creator (Creador)
- Usuario cuyo GitHub username coincide con `CREATOR_GITHUB_USERNAME`
- Acceso completo al sistema
- Marcado automáticamente como Admin
- Badge especial en la UI

### Admin
- Usuarios marcados manualmente como admin
- Acceso administrativo al sistema

### User (Usuario Regular)
- Usuarios autenticados normales
- Acceso a funciones básicas

## 🔒 Proteger Rutas

### Backend (FastAPI)

```python
from app.core.dependencies import get_current_user, get_current_creator

@router.get("/protected")
async def protected_route(current_user: User = Depends(get_current_user)):
    return {"message": f"Hello {current_user.username}"}

@router.post("/admin-only")
async def admin_route(current_user: User = Depends(get_current_creator)):
    return {"message": "Only creator can access"}
```

### Frontend (Next.js)

```typescript
'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ProtectedPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect('/auth/signin')
  }

  return <div>Protected content</div>
}
```

## 🌐 Configuración para Producción

1. **Crear OAuth App de Producción** en GitHub
2. **Actualizar variables de entorno**:
   ```env
   NEXTAUTH_URL=https://tu-dominio.com
   GITHUB_REDIRECT_URI=https://tu-dominio.com/api/auth/callback/github
   ```
3. **Usar secretos seguros** generados con `openssl rand -base64 32`
4. **Configurar HTTPS** (requerido por OAuth)
5. **Actualizar CORS** en backend para permitir tu dominio

## 🐛 Troubleshooting

### Error: "Invalid callback URL"
- Verifica que el callback URL en GitHub OAuth App coincida exactamente con el configurado

### Error: "No session found"
- Verifica que `NEXTAUTH_SECRET` esté configurado
- Borra cookies del navegador y vuelve a intentar

### Error: "Failed to exchange token"
- Verifica que `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET` sean correctos
- Verifica que el backend esté corriendo

### Usuario no marcado como Creator
- Verifica que `CREATOR_GITHUB_USERNAME` coincida exactamente con tu GitHub username
- El username es case-insensitive

## 📚 Referencias

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)

## 🔄 Flujo de Autenticación

```
1. Usuario click "Iniciar con GitHub"
   ↓
2. NextAuth.js redirige a GitHub
   ↓
3. Usuario autoriza en GitHub
   ↓
4. GitHub redirige con código
   ↓
5. NextAuth.js intercambia código por token
   ↓
6. Backend recibe token y crea/actualiza usuario
   ↓
7. Backend genera JWT token
   ↓
8. Frontend almacena sesión
   ↓
9. Usuario autenticado
```

## 🎯 Próximos Pasos

Una vez configurado:
1. Personaliza los roles y permisos según tus necesidades
2. Agrega más providers OAuth si lo deseas
3. Implementa refresh tokens para sesiones más largas
4. Agrega logging de eventos de autenticación
