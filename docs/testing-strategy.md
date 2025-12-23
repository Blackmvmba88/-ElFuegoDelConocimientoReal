# 🧪 Estrategia de Testing - El Fuego del Conocimiento Real

## 🎯 Filosofía de Testing

> **Tests que importan, no burocracia.**

Priorizamos tests de frontera que validan contratos entre componentes sobre tests triviales de renderizado. Pocos tests, pero significativos.

---

## 🚨 Principios Fundamentales

### 1. **Tests de Frontera Primero**
- ✅ Validar interfaces entre capas (UI ↔ Core ↔ IA)
- ✅ Verificar contratos de eventos
- ✅ Probar transformaciones de datos críticas
- ❌ No testear que React renderiza sin error (eso no aporta valor)

### 2. **Tests Significativos**
Un test es significativo si:
- Puede fallar cuando el comportamiento del sistema cambia
- Su fallo indica un problema real, no un cambio cosmético
- Documenta un requisito o edge case importante

### 3. **Minimal pero Completo**
- Preferir pocos tests que cubran casos críticos
- Sobre muchos tests que validan lo obvio

---

## 🔍 Qué Testear (Prioridades)

### ⭐ **Nivel 1: Tests Críticos (MUST HAVE)**

#### 1.1 Validación de Contratos de Eventos

```typescript
// types/event-schema.test.ts
describe('Event Schema Validation', () => {
  it('rechaza eventos sin timestamp', () => {
    const invalid = { type: 'user_progress', payload: {} };
    expect(isValidBaseEvent(invalid)).toBe(false);
  });
  
  it('rechaza eventos con confidence fuera de rango', () => {
    const invalid = createEvent('user_progress', {}, { confidence: 1.5 });
    expect(isValidBaseEvent(invalid)).toBe(false);
  });
  
  it('acepta eventos válidos', () => {
    const valid = createEvent('user_progress', {
      userId: 'user-123',
      grade: 5,
      chamber: 'fire',
      actionType: 'read'
    });
    expect(isValidBaseEvent(valid)).toBe(true);
  });
});
```

#### 1.2 Lógica de Progresión de Grados

```typescript
// lib/levels.test.ts
describe('Grade Progression Logic', () => {
  it('calcula próximo grado correctamente', () => {
    expect(getNextGrade(1, 100)).toBe(2);
    expect(getNextGrade(32, 100)).toBe(33);
    expect(getNextGrade(33, 100)).toBe(33); // Max grade
  });
  
  it('valida requisitos por grado', () => {
    expect(canUnlockGrade(5, { booksRead: 10, textsWritten: 2 })).toBe(true);
    expect(canUnlockGrade(10, { booksRead: 5, textsWritten: 0 })).toBe(false);
  });
  
  it('maneja edge case de experiencia negativa', () => {
    expect(calculateGradeProgress(-100)).toBe(0);
  });
});
```

#### 1.3 Integración con APIs Externas (Mocks)

```typescript
// lib/gutenberg-client.test.ts
describe('Gutenberg API Client', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn();
  });
  
  it('maneja respuestas vacías correctamente', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] })
    });
    
    const books = await searchBooks('nonexistent-query');
    expect(books).toEqual([]);
  });
  
  it('reintenta en caso de error 429 (rate limit)', async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce({ status: 429 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [{ id: 1 }] })
      });
    
    const books = await searchBooks('test');
    expect(books).toHaveLength(1);
  });
  
  it('falla después de max reintentos', async () => {
    (global.fetch as jest.Mock).mockRejectedValue({ status: 500 });
    
    await expect(searchBooks('test')).rejects.toThrow();
  });
});
```

---

### ⭐⭐ **Nivel 2: Tests Importantes (SHOULD HAVE)**

#### 2.1 Análisis Semántico

```typescript
// lib/semantic-engine.test.ts (Futuro - Fase 2)
describe('Semantic Analysis Engine', () => {
  it('extrae keywords herméticas correctamente', () => {
    const text = "La piedra filosofal transforma el plomo en oro...";
    const keywords = extractHermeticKeywords(text);
    
    expect(keywords).toContain('piedra filosofal');
    expect(keywords).toContain('transforma');
  });
  
  it('detecta símbolos alquímicos en texto', () => {
    const text = "☿ Mercury ♂ Mars ♃ Jupiter";
    const symbols = detectAlchemicalSymbols(text);
    
    expect(symbols).toHaveLength(3);
  });
  
  it('calcula energía de texto', () => {
    const highEnergy = "¡Fuego! ¡Poder! ¡Transformación!";
    const lowEnergy = "El silencio es profundo.";
    
    expect(calculateTextEnergy(highEnergy)).toBe('high');
    expect(calculateTextEnergy(lowEnergy)).toBe('low');
  });
});
```

#### 2.2 Síntesis de Textos

```typescript
// lib/fusion-engine.test.ts (Futuro - Fase 2)
describe('Text Fusion Engine', () => {
  it('fusiona dos textos manteniendo coherencia', () => {
    const text1 = "El fuego purifica el alma.";
    const text2 = "La luz revela la verdad oculta.";
    
    const fused = fuseTexts([text1, text2], { method: 'fusion' });
    
    expect(fused).toContain('fuego');
    expect(fused).toContain('luz');
    expect(fused.length).toBeGreaterThan(text1.length);
  });
  
  it('preserva estilo del texto base', () => {
    const base = "Así habló el maestro...";
    const addition = "modern text here";
    
    const result = fuseTexts([base, addition], { preserveStyle: 'base' });
    
    expect(result).toMatch(/[Aa]sí|habló|maestro/);
  });
});
```

---

### ⭐⭐⭐ **Nivel 3: Tests Útiles (NICE TO HAVE)**

#### 3.1 Componentes UI Críticos

```typescript
// components/CamaraDeGrados.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import CamaraDeGrados from './CamaraDeGrados';

describe('CamaraDeGrados Component', () => {
  it('muestra todos los 33 grados', () => {
    render(<CamaraDeGrados />);
    const grades = screen.getAllByRole('button', { name: /Grado \d+/ });
    expect(grades).toHaveLength(33);
  });
  
  it('bloquea grados no desbloqueados', () => {
    render(<CamaraDeGrados currentGrade={5} />);
    const grade10 = screen.getByText('Grado 10');
    
    expect(grade10).toHaveAttribute('disabled');
  });
  
  it('emite evento al seleccionar grado', () => {
    const onGradeSelect = jest.fn();
    render(<CamaraDeGrados onGradeSelect={onGradeSelect} />);
    
    const grade1 = screen.getByText('Grado 1');
    fireEvent.click(grade1);
    
    expect(onGradeSelect).toHaveBeenCalledWith(1);
  });
});
```

#### 3.2 Hooks Personalizados

```typescript
// hooks/useSession.test.ts (Futuro)
import { renderHook, act } from '@testing-library/react-hooks';
import { useSession } from './useSession';

describe('useSession Hook', () => {
  it('carga sesión existente', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSession());
    
    await waitForNextUpdate();
    
    expect(result.current.session).toBeDefined();
    expect(result.current.session?.id).toBeTruthy();
  });
  
  it('actualiza estado localmente y sincroniza', async () => {
    const { result } = renderHook(() => useSession());
    
    act(() => {
      result.current.updateState({ currentGrade: 10 });
    });
    
    expect(result.current.session?.state.currentGrade).toBe(10);
  });
});
```

---

## 🚫 Qué NO Testear (Anti-patrones)

### ❌ Tests Triviales de Renderizado

```typescript
// ❌ MAL: No aporta valor
it('renderiza sin crashear', () => {
  render(<MiComponente />);
  expect(screen.getByTestId('mi-componente')).toBeInTheDocument();
});

// ✅ BIEN: Valida comportamiento real
it('muestra mensaje de error cuando falla la carga', async () => {
  mockFetch.mockRejectedValue(new Error('Network error'));
  render(<MiComponente />);
  
  await waitFor(() => {
    expect(screen.getByText(/error de red/i)).toBeInTheDocument();
  });
});
```

### ❌ Tests de Implementación Interna

```typescript
// ❌ MAL: Testea cómo, no qué
it('llama a setState con el valor correcto', () => {
  const setState = jest.fn();
  jest.spyOn(React, 'useState').mockReturnValue([0, setState]);
  
  render(<Counter />);
  fireEvent.click(screen.getByText('Increment'));
  
  expect(setState).toHaveBeenCalledWith(1);
});

// ✅ BIEN: Testea el resultado observable
it('incrementa el contador al hacer click', () => {
  render(<Counter />);
  expect(screen.getByText('0')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### ❌ Tests que Solo Verifican Tipos

```typescript
// ❌ MAL: TypeScript ya hace esto
it('acepta props del tipo correcto', () => {
  const props = { title: 'Test', count: 5 };
  expect(() => render(<MiComponente {...props} />)).not.toThrow();
});

// Si quieres validación en runtime, usa validators:
// ✅ BIEN: Valida en runtime con datos externos
it('valida datos de API antes de renderizar', async () => {
  const invalidData = { title: 123, count: 'not-a-number' };
  mockFetch.mockResolvedValue(invalidData);
  
  await expect(loadData()).rejects.toThrow('Invalid data format');
});
```

---

## 🎭 Estrategia de Mocking

### Principios de Mocking

1. **Mock solo dependencias externas**: APIs, servicios, timers
2. **No mockear el código bajo test**: Mockear todo hace tests inútiles
3. **Usar fixtures realistas**: Datos de mock deben representar casos reales

### Mocks Útiles

```typescript
// __mocks__/gutenberg-client.ts
export const mockBooks = [
  {
    id: 1,
    title: 'The Kybalion',
    author: 'Three Initiates',
    language: 'en',
    downloadUrl: 'https://...'
  },
  // ... más libros de prueba
];

export const searchBooks = jest.fn().mockResolvedValue(mockBooks);
export const getBook = jest.fn().mockImplementation((id: number) => {
  return mockBooks.find(b => b.id === id);
});
```

```typescript
// __mocks__/sync-service.ts
export class MockSyncService {
  private state: SessionState = {
    currentGrade: 1,
    currentChamber: 'silence',
    gradeProgress: 0,
    openBooks: []
  };
  
  now(): number {
    return Date.now();
  }
  
  saveState(sessionId: string, state: SessionState): void {
    this.state = { ...this.state, ...state };
  }
  
  loadState(sessionId: string): SessionState {
    return this.state;
  }
}
```

---

## 📊 Métricas de Testing

### Qué Medir

1. **Coverage de Frontera**: % de interfaces entre capas cubiertas
2. **Tests Significativos**: Ratio de tests que validan comportamiento vs tests triviales
3. **Falsos Positivos**: Tests que fallan sin que haya bug real
4. **Tiempo de Ejecución**: Test suite debe correr en < 30 segundos

### Umbrales Objetivo

```typescript
{
  "coverageThreshold": {
    "global": {
      "branches": 70,      // No buscar 100%, no vale la pena
      "functions": 75,
      "lines": 75,
      "statements": 75
    },
    "lib/**/*.ts": {       // CORE debe tener mayor cobertura
      "branches": 85,
      "functions": 90,
      "lines": 85,
      "statements": 85
    }
  }
}
```

---

## 🏃 Ejecución de Tests

### Comandos Disponibles

```bash
# Todos los tests
npm test

# Watch mode (desarrollo)
npm run test:watch

# Coverage report
npm run test:coverage

# Solo tests de un archivo
npm test -- lib/levels.test.ts

# Solo tests con patrón
npm test -- --testNamePattern="valida eventos"
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - name: Fail if coverage < 70%
        run: npm run test:coverage -- --coverageThreshold='{"global":{"lines":70}}'
```

---

## 🧩 Estructura de Archivos de Test

```
__tests__/
├── integration/           # Tests que cruzan múltiples componentes
│   ├── user-flow.test.ts
│   └── api-integration.test.ts
├── e2e/                   # Tests end-to-end (Playwright futuro)
│   └── user-journey.spec.ts
└── fixtures/              # Datos de prueba reutilizables
    ├── mock-books.ts
    ├── mock-sessions.ts
    └── mock-events.ts

lib/
├── levels.ts
└── levels.test.ts         # Test junto al código

components/
├── CamaraDeGrados.tsx
└── CamaraDeGrados.test.tsx

types/
├── event-schema.ts
└── event-schema.test.ts
```

---

## 🔍 Debugging Tests

### Tests que Fallan Intermitentemente

```typescript
// Problema: Race conditions con async
// ❌ MAL
it('carga datos', async () => {
  render(<MiComponente />);
  expect(screen.getByText('Loaded')).toBeInTheDocument(); // Falla a veces
});

// ✅ BIEN
it('carga datos', async () => {
  render(<MiComponente />);
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  }, { timeout: 3000 });
});
```

### Ver Output de Tests

```bash
# Verbose mode
npm test -- --verbose

# Solo logs de tests que fallan
npm test -- --silent

# Debug con Node debugger
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## 📚 Recursos y Referencias

- **Jest Docs**: [jestjs.io](https://jestjs.io/)
- **React Testing Library**: [testing-library.com/react](https://testing-library.com/react)
- **Testing Best Practices**: [kentcdodds.com/blog/common-mistakes-with-react-testing-library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✨ Conclusión

Una buena estrategia de testing no es tener 100% de cobertura, sino tener confianza en que:

1. ✅ Los contratos entre componentes son respetados
2. ✅ Los casos críticos están cubiertos
3. ✅ Los edge cases están documentados
4. ✅ Los cambios peligrosos son detectados

**Regla de Oro**: Si un test no puede fallar cuando algo se rompe, ese test no aporta valor.

---

**Última Actualización**: Diciembre 2024  
**Próxima Revisión**: Tras implementar primeros tests de frontera
