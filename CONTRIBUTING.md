# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a **El Fuego del Conocimiento Real**! 🔥

## 📋 Código de Conducta

Este proyecto se adhiere a un código de conducta basado en el respeto mutuo, la colaboración constructiva y el crecimiento compartido del conocimiento.

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/TU_USUARIO/-ElFuegoDelConocimientoReal.git
cd -ElFuegoDelConocimientoReal
```

### 2. Crear una Rama

```bash
git checkout -b feature/mi-nueva-funcionalidad
# o
git checkout -b fix/corrección-de-bug
```

### 3. Realizar Cambios

- Escribe código limpio y bien documentado
- Sigue las convenciones de estilo del proyecto
- Añade tests cuando sea apropiado
- Actualiza la documentación según sea necesario

### 4. Commit

Usa mensajes de commit descriptivos:

```bash
git commit -m "feat: añadir componente Cámara de Grados"
git commit -m "fix: corregir error en API de búsqueda semántica"
git commit -m "docs: actualizar guía de instalación"
```

Convenciones de commits:
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formato, punto y coma faltantes, etc.
- `refactor:` - Refactorización de código
- `test:` - Añadir o modificar tests
- `chore:` - Actualizar dependencias, etc.

### 5. Push y Pull Request

```bash
git push origin feature/mi-nueva-funcionalidad
```

Luego crea un Pull Request en GitHub con:
- Descripción clara de los cambios
- Referencias a issues relacionados
- Screenshots si hay cambios visuales

## 🏗️ Estructura del Proyecto

```
-ElFuegoDelConocimientoReal/
├── frontend/          # Next.js + Tailwind + Three.js
├── backend/           # FastAPI + Python
├── docs/              # Documentación adicional
├── docker/            # Configuraciones Docker
└── scripts/           # Scripts de utilidad
```

## 🧪 Testing

Antes de enviar tu PR, asegúrate de:

```bash
# Frontend
cd frontend
npm test
npm run lint

# Backend
cd backend
pytest
flake8 .
```

## 📝 Estándares de Código

### Frontend (JavaScript/TypeScript)
- Usar ESLint y Prettier
- Componentes funcionales con hooks
- Tipado estricto con TypeScript
- Nombres semánticos según la temática del proyecto

### Backend (Python)
- Seguir PEP 8
- Type hints en funciones
- Docstrings en clases y funciones principales
- Tests con pytest

## 🎯 Prioridades de Contribución

Consulta el [Roadmap en README.md](README.md#-roadmap-épico-de-desarrollo) para ver las prioridades actuales.

Áreas donde más ayuda se necesita:
- Implementación de componentes UI
- APIs de integración con bibliotecas externas
- Módulos de IA y procesamiento semántico
- Documentación y ejemplos
- Tests y mejoras de calidad

## 💡 ¿Tienes una Idea?

Si tienes una idea pero no estás seguro de cómo implementarla:
1. Abre un Issue para discutirla
2. Etiquétalo como `enhancement` o `question`
3. La comunidad te ayudará a darle forma

## 📬 Contacto

Para preguntas específicas, puedes:
- Abrir un Issue en GitHub
- Comentar en un Pull Request existente

---

**Recuerda:** Cada contribución, por pequeña que sea, ayuda a encender el fuego del conocimiento. 🔥

¡Gracias por ser parte de este viaje!
