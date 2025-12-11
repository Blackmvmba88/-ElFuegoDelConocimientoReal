# 🤝 Contributing to El Fuego del Conocimiento Real

¡Gracias por tu interés en contribuir a este proyecto alquímico-masónico de conocimiento digital! Toda contribución es una chispa más en el fuego colectivo.

---

## 📜 Código de Conducta

Este proyecto está comprometido con crear un ambiente inclusivo y respetuoso. Se espera que todos los participantes:

- 🤝 Sean respetuosos y considerados
- 💭 Acepten críticas constructivas con gracia
- 🔥 Se enfoquen en lo que es mejor para la comunidad
- ✨ Muestren empatía hacia otros miembros

---

## 🎯 Cómo Puedes Contribuir

### 1. 🐛 Reportar Bugs

Si encuentras un bug, por favor:

1. **Busca primero** en [issues existentes](https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal/issues)
2. Si no existe, **crea un nuevo issue** usando la plantilla de bug
3. **Incluye:**
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Información del entorno (OS, browser, Node version)

### 2. ✨ Sugerir Features

Para nuevas funcionalidades:

1. **Verifica el [ROADMAP.md](./ROADMAP.md)** para ver si ya está planificado
2. **Abre un issue** usando la plantilla de feature request
3. **Explica:**
   - El problema que resuelve
   - Cómo se alinea con la filosofía del proyecto
   - Ejemplos o mockups si es posible

### 3. 📚 Mejorar Documentación

La documentación es crucial. Puedes contribuir:

- Corrigiendo errores tipográficos o gramaticales
- Mejorando explicaciones confusas
- Añadiendo ejemplos o guías
- Traduciendo documentación
- Creando tutoriales o videos

### 4. 💻 Contribuir Código

#### Antes de Empezar

1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Configura** el upstream:
   ```bash
   git remote add upstream https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal.git
   ```
4. **Sincroniza** tu fork regularmente:
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

#### Proceso de Desarrollo

1. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/nombre-descriptivo
   # o
   git checkout -b fix/nombre-del-bug
   ```

2. **Haz tus cambios** siguiendo las [guías de estilo](#-guías-de-estilo)

3. **Escribe tests** para tus cambios:
   ```bash
   npm test
   ```

4. **Ejecuta el linter**:
   ```bash
   npm run lint
   ```

5. **Commit** tus cambios con mensajes descriptivos:
   ```bash
   git commit -m "feat: add new chamber animation"
   git commit -m "fix: correct theme toggle behavior"
   git commit -m "docs: improve setup instructions"
   ```

6. **Push** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```

7. **Abre un Pull Request** usando la plantilla proporcionada

---

## 🎨 Guías de Estilo

### TypeScript/JavaScript

- Usa **TypeScript** para todo el código nuevo
- Sigue las reglas de **ESLint** configuradas
- Usa **tipos explícitos** cuando sea posible
- Prefiere **const** sobre let, evita var
- Usa **async/await** en lugar de callbacks o .then()

```typescript
// ✅ Bien
const fetchBooks = async (query: string): Promise<Book[]> => {
  const response = await api.get(`/books?q=${query}`);
  return response.data;
};

// ❌ Mal
function fetchBooks(query, callback) {
  api.get('/books?q=' + query).then(callback);
}
```

### React Components

- Usa **componentes funcionales** con hooks
- Prefiere **named exports** para componentes
- Agrupa imports: React → Third-party → Local
- Usa **PropTypes o TypeScript interfaces**
- Añade **comentarios JSDoc** para componentes públicos

```typescript
// ✅ Bien
'use client';

import { useState } from 'react';
import { Book } from '@/types';

interface BookCardProps {
  book: Book;
  onSelect?: (id: string) => void;
}

/**
 * Card component for displaying book information
 */
export default function BookCard({ book, onSelect }: BookCardProps) {
  // Component implementation
}
```

### CSS/Tailwind

- Prefiere **Tailwind classes** sobre CSS custom
- Usa **clases semánticas** del tema alquímico:
  - `flame-primary`, `flame-secondary` para acentos
  - `shadow-light`, `shadow-dark` para fondos oscuros
  - `light-primary`, `light-secondary` para fondos claros
- Agrupa clases lógicamente: layout → spacing → colors → effects

```tsx
// ✅ Bien
<div className="flex items-center gap-4 p-6 rounded-lg bg-white dark:bg-shadow-light hover:shadow-lg transition-all">

// ❌ Mal (clases desordenadas)
<div className="hover:shadow-lg bg-white p-6 flex dark:bg-shadow-light gap-4 rounded-lg items-center transition-all">
```

### Git Commits

Usa **Conventional Commits**:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan código)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

```bash
# ✅ Buenos commits
git commit -m "feat: add vibration-based unlock system"
git commit -m "fix: resolve theme persistence issue"
git commit -m "docs: update ROADMAP with Phase 3 details"

# ❌ Malos commits
git commit -m "changes"
git commit -m "fixed stuff"
git commit -m "WIP"
```

---

## 🧪 Testing

### Escribir Tests

- **Todos los componentes nuevos** deben tener tests
- Usa **React Testing Library** para componentes UI
- Usa **Jest** para lógica de negocio
- Apunta a **cobertura >80%** para código nuevo

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Watch mode (desarrollo)
npm run test:watch

# Cobertura
npm run test:coverage
```

### Ejemplo de Test

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const onClickMock = jest.fn();
    render(<MyComponent onClick={onClickMock} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
```

---

## 📝 Pull Request Process

### Checklist antes de enviar PR

- [ ] El código compila sin errores
- [ ] Todos los tests pasan
- [ ] El linter no muestra errores
- [ ] Agregaste/actualizaste tests según necesario
- [ ] Actualizaste documentación si aplica
- [ ] Seguiste las guías de estilo
- [ ] El PR resuelve un solo problema/feature
- [ ] Completaste la plantilla de PR

### Qué Esperar

1. **Revisión automática:** CI/CD ejecutará tests y linters
2. **Revisión humana:** Un maintainer revisará tu código
3. **Feedback:** Puede haber solicitudes de cambios
4. **Iteración:** Haz los cambios solicitados
5. **Merge:** Una vez aprobado, se hará merge

### Tiempo de Respuesta

- Issues: 24-48 horas
- Pull Requests: 2-5 días
- Preguntas: 24 horas

---

## 🔥 Filosofía del Proyecto

Al contribuir, ten en mente estos principios:

### 🏛️ Alineación Hermética
- El código debe reflejar la estructura masónica (grados, cámaras)
- Las features deben servir al propósito de expansión de consciencia
- El diseño debe mantener simbolismo alquímico

### 📚 Accesibilidad del Conocimiento
- El código debe ser claro y bien documentado
- Las features deben ser intuitivas
- La UI debe ser accesible (a11y)

### 🌟 Calidad sobre Cantidad
- Prefiere soluciones elegantes y simples
- Mantén el código limpio y mantenible
- Prioriza la experiencia del usuario

### 🤝 Comunidad Primero
- Sé respetuoso en reviews y discusiones
- Ayuda a otros contribuidores
- Comparte conocimiento libremente

---

## 🎓 Recursos para Nuevos Contribuidores

### Entendiendo el Proyecto

1. Lee el [README.md](./README.md) completo
2. Revisa el [ROADMAP.md](./ROADMAP.md)
3. Explora el [SETUP.md](./SETUP.md)
4. Mira la estructura en `/components` y `/app`

### Primeros Issues Recomendados

Busca issues etiquetados con:
- `good first issue` - Perfecto para principiantes
- `documentation` - Mejoras de documentación
- `help wanted` - Issues que necesitan ayuda

### Aprendiendo las Tecnologías

- **Next.js:** https://nextjs.org/learn
- **React:** https://react.dev/learn
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Testing Library:** https://testing-library.com/docs/react-testing-library/intro

---

## 📜 Licencia de Contribuciones

Al contribuir a este proyecto, aceptas que:

- **Código:** Se licenciará bajo [MIT License](./LICENSE-MIT)
- **Documentación/Contenido:** Se licenciará bajo [CC BY-NC-SA 4.0](./LICENSE-CC-BY-NC-SA)

Retienes el copyright de tu contribución pero otorgas derechos perpetuos al proyecto.

Ver [LICENSING.md](./LICENSING.md) para más detalles.

---

## ❓ Preguntas

Si tienes preguntas que no están cubiertas aquí:

1. Busca en [Issues](https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal/issues)
2. Abre una [Discussion](https://github.com/Blackmvmba88/-ElFuegoDelConocimientoReal/discussions)
3. Pregunta en tu Pull Request
4. Contacta a los maintainers

---

## 🙏 Agradecimientos

Gracias por considerar contribuir a **El Fuego del Conocimiento Real**. Cada contribución, grande o pequeña, ayuda a construir este universo de conocimiento digital.

> "En la colaboración encontramos la verdadera alquimia: transformar ideas individuales en sabiduría colectiva." 🔥

---

**¡Feliz contribución!** ✨
