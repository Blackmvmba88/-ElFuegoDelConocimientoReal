# 🔄 Sistema de Sincronización y Coordinación de Estado

## 📐 Principio Fundamental

> **`services/state-sync` es la fuente de verdad temporal del sistema.**  
> Ningún componente calcula tiempo local sin referencia al sync.

Este documento define cómo los componentes se coordinan, mantienen estado consistente y permiten debugging mediante sesiones reproducibles.

---

## 🎯 Objetivos del Sistema de Sync

1. **Consistencia Temporal**: Todos los componentes comparten la misma noción de "ahora"
2. **Estado Predecible**: El estado puede ser reconstruido desde eventos
3. **Debugging Facilitado**: Sesiones pueden grabarse y reproducirse
4. **Escalabilidad**: Preparado para múltiples clientes y servicios distribuidos

---

## 🏗️ Arquitectura del State Sync Service

### Responsabilidades Core

```typescript
interface StateSyncService {
  // === TIEMPO ===
  /** Obtener timestamp actual del sistema */
  now(): number;
  
  /** Calcular drift entre cliente y servidor */
  calculateDrift(): Promise<number>;
  
  // === SESIÓN ===
  /** Crear nueva sesión de usuario */
  createSession(userId: string): Session;
  
  /** Obtener sesión activa */
  getSession(sessionId: string): Session | null;
  
  /** Finalizar sesión */
  endSession(sessionId: string): void;
  
  // === ESTADO ===
  /** Guardar estado de sesión */
  saveState(sessionId: string, state: SessionState): void;
  
  /** Cargar estado de sesión */
  loadState(sessionId: string): SessionState | null;
  
  /** Sincronizar estado entre cliente y servidor */
  syncState(sessionId: string, clientState: Partial<SessionState>): SessionState;
  
  // === REPLAY & RECORDING ===
  /** Iniciar grabación de sesión */
  startRecording(sessionId: string, mode: RecordMode): void;
  
  /** Detener grabación */
  stopRecording(sessionId: string): RecordedSession;
  
  /** Reproducir sesión grabada */
  replaySession(recordedSession: RecordedSession): AsyncIterator<SystemEvent>;
}
```

---

## 🕐 Gestión de Tiempo

### El Problema
En sistemas distribuidos (frontend + backend), cada proceso tiene su propio reloj. Esto causa:
- ❌ Timestamps inconsistentes en eventos
- ❌ Imposibilidad de ordenar eventos globalmente
- ❌ Drift temporal que crece con el tiempo

### La Solución: Sync Service como Reloj Maestro

```typescript
// ❌ INCORRECTO: Cada componente usa su tiempo local
const event = {
  timestamp: Date.now(), // Tiempo del cliente
  payload: { ... }
};

// ✅ CORRECTO: Usar tiempo del sync service
import { syncService } from '@/lib/sync-service';

const event = createEvent('user_progress', {
  userId: 'user-123',
  grade: 5,
  chamber: 'fire',
  actionType: 'read'
}, {
  confidence: 1.0
});
// createEvent usa syncService.now() internamente
```

### Sincronización de Relojes

Al iniciar sesión:
1. Cliente envía timestamp local `T_client`
2. Servidor responde con `T_server` y mide RTT
3. Se calcula drift: `drift = T_server - T_client - (RTT / 2)`
4. Cliente ajusta todos sus timestamps: `adjusted = Date.now() + drift`

```typescript
// Implementación de ajuste de tiempo
class TimeSyncClient {
  private drift: number = 0;
  
  async sync(): Promise<void> {
    const t0 = Date.now();
    const serverTime = await this.fetchServerTime();
    const t1 = Date.now();
    
    const rtt = t1 - t0;
    this.drift = serverTime - t0 - (rtt / 2);
  }
  
  now(): number {
    return Date.now() + this.drift;
  }
}
```

---

## 📦 Estructura de Sesión

### Session Object

```typescript
interface Session {
  /** ID único de la sesión */
  id: string;
  
  /** ID del usuario */
  userId: string;
  
  /** Timestamp de inicio */
  startedAt: number;
  
  /** Timestamp de última actividad */
  lastActivityAt: number;
  
  /** Estado actual de la sesión */
  state: SessionState;
  
  /** Modo de grabación activo */
  recordMode?: RecordMode;
  
  /** Eventos grabados (si recording activo) */
  recordedEvents?: SystemEvent[];
  
  /** Metadatos adicionales */
  metadata?: Record<string, unknown>;
}

interface SessionState {
  /** Grado actual del usuario */
  currentGrade: number;
  
  /** Cámara actual */
  currentChamber: 'silence' | 'light' | 'fire' | 'air' | 'ether';
  
  /** Progreso en el grado actual (0-1) */
  gradeProgress: number;
  
  /** Libros abiertos */
  openBooks: string[];
  
  /** Última búsqueda realizada */
  lastSearch?: string;
  
  /** Estado de UI (colapsado, expandido, etc.) */
  uiState?: Record<string, unknown>;
  
  /** Preferencias del usuario */
  preferences?: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}
```

---

## 🎬 Modo Record & Replay

### ¿Por Qué Grabar Sesiones?

1. **Debugging**: Reproducir bugs reportados exactamente como ocurrieron
2. **Testing**: Validar cambios contra sesiones reales de usuarios
3. **Analytics**: Entender patrones de uso complejos
4. **Training**: Entrenar modelos de IA con comportamiento real

### Modos de Grabación

```typescript
type RecordMode = 
  | 'full'                 // Todos los eventos
  | 'interactions_only'    // Solo interacciones de usuario
  | 'critical_path';       // Solo eventos críticos (errores, progreso)
```

### Uso Básico

```bash
# Iniciar app con recording
npm run dev --record-session=full

# Reproducir sesión grabada
npm run replay --session=session-123.json
```

```typescript
// API Programática
import { syncService } from '@/lib/sync-service';

// Iniciar grabación
const session = syncService.createSession('user-123');
syncService.startRecording(session.id, 'interactions_only');

// ... usuario interactúa con la app ...

// Detener y guardar
const recorded = syncService.stopRecording(session.id);
await saveRecordedSession(recorded);

// Reproducir después
const recorded = await loadRecordedSession('session-123.json');
for await (const event of syncService.replaySession(recorded)) {
  console.log('Replay event:', event);
  // Despachar evento al sistema
  eventBus.publish(event);
}
```

---

## 🔌 Integración con Componentes

### Frontend Components

Los componentes React deben consumir estado del sync service, no mantener estado local crítico:

```typescript
// ❌ INCORRECTO: Estado local que puede desincronizarse
function CamaraDeGrados() {
  const [currentGrade, setCurrentGrade] = useState(1);
  
  // Problema: Si el usuario abre en otro tab, se desincroniza
}

// ✅ CORRECTO: Estado desde sync service
function CamaraDeGrados() {
  const session = useSession(); // Hook que consulta sync service
  const currentGrade = session.state.currentGrade;
  
  const updateGrade = (newGrade: number) => {
    syncService.saveState(session.id, {
      ...session.state,
      currentGrade: newGrade
    });
  };
}
```

### Hooks Útiles (A Implementar)

```typescript
// useSession: Obtener sesión actual
const session = useSession();

// useSyncedState: Estado sincronizado automáticamente
const [grade, setGrade] = useSyncedState('currentGrade', 1);

// useEventListener: Escuchar eventos específicos
useEventListener('user_progress', (event) => {
  console.log('Progreso:', event.payload);
});

// useReplayMode: Detectar si estamos en modo replay
const isReplaying = useReplayMode();
```

---

## 🚀 Implementación Progresiva

### Fase 1: Local In-Memory (Actual)
```typescript
// Implementación simple en memoria para frontend
class LocalSyncService implements StateSyncService {
  private sessions = new Map<string, Session>();
  
  now(): number {
    return Date.now(); // Sin ajuste de drift aún
  }
  
  // ... resto de métodos básicos
}
```

### Fase 2: Backend + WebSocket
```typescript
// Cliente con WebSocket para sync real-time
class RemoteSyncService implements StateSyncService {
  private ws: WebSocket;
  private drift: number = 0;
  
  async init() {
    await this.syncTime();
    this.ws.on('state_update', this.handleStateUpdate);
  }
  
  // ... implementación con comunicación servidor
}
```

### Fase 3: Distributed (Redis + Event Sourcing)
```typescript
// Backend con Redis para state multi-instancia
class DistributedSyncService {
  private redis: RedisClient;
  private eventStore: EventStore;
  
  // State reconstruido desde eventos
  async loadState(sessionId: string): Promise<SessionState> {
    const events = await this.eventStore.getEvents(sessionId);
    return this.replayEvents(events);
  }
}
```

---

## 📊 Métricas de Sync

### Qué Medir

```typescript
interface SyncMetrics {
  /** Drift promedio entre cliente y servidor (ms) */
  averageDrift: number;
  
  /** Máximo drift observado */
  maxDrift: number;
  
  /** Latencia de sincronización de estado (ms) */
  syncLatency: number;
  
  /** Eventos perdidos por desconexión */
  droppedEvents: number;
  
  /** Conflictos de merge resueltos */
  mergeConflicts: number;
}
```

### Umbrales Aceptables

- **Drift < 100ms**: Excelente
- **Sync Latency < 200ms**: Bueno para UX
- **Dropped Events < 1%**: Aceptable con retry

---

## 🧪 Testing de Sync

### Tests Críticos

```typescript
describe('StateSyncService', () => {
  it('mantiene drift bajo después de múltiples syncs', async () => {
    const service = new StateSyncService();
    await service.syncTime();
    
    // Simular paso de tiempo
    await sleep(10000);
    
    const drift = await service.calculateDrift();
    expect(Math.abs(drift)).toBeLessThan(100);
  });
  
  it('puede reproducir sesión grabada idénticamente', async () => {
    const original = await recordUserSession(userId);
    const replayed = await replaySession(original);
    
    expect(replayed.finalState).toEqual(original.finalState);
  });
  
  it('resuelve conflictos de estado correctamente', async () => {
    // Simular dos clientes modificando mismo estado
    const result = await service.syncState(sessionId, {
      currentGrade: 5 // Cliente A
    });
    
    // Cliente B intenta actualizar
    const result2 = await service.syncState(sessionId, {
      currentGrade: 4 // Cliente B (desactualizado)
    });
    
    // Debe mantener el más reciente
    expect(result2.currentGrade).toBe(5);
  });
});
```

---

## 🔒 Seguridad y Validación

### Validación de Estado

```typescript
function validateSessionState(state: unknown): state is SessionState {
  if (typeof state !== 'object' || state === null) return false;
  
  const s = state as SessionState;
  
  return (
    typeof s.currentGrade === 'number' &&
    s.currentGrade >= 1 &&
    s.currentGrade <= 33 &&
    ['silence', 'light', 'fire', 'air', 'ether'].includes(s.currentChamber) &&
    typeof s.gradeProgress === 'number' &&
    s.gradeProgress >= 0 &&
    s.gradeProgress <= 1
  );
}
```

### Rate Limiting

```typescript
// Evitar spam de sync requests
const SYNC_RATE_LIMIT = 10; // max 10 syncs por segundo

class RateLimitedSyncService {
  private syncCount = 0;
  private resetAt = Date.now() + 1000;
  
  async syncState(sessionId: string, state: Partial<SessionState>) {
    if (Date.now() > this.resetAt) {
      this.syncCount = 0;
      this.resetAt = Date.now() + 1000;
    }
    
    if (this.syncCount >= SYNC_RATE_LIMIT) {
      throw new Error('Sync rate limit exceeded');
    }
    
    this.syncCount++;
    return this.doSync(sessionId, state);
  }
}
```

---

## 📚 Referencias

- **Time Synchronization**: NTP, Cristian's Algorithm
- **Event Sourcing**: [martinfowler.com/eaaDev/EventSourcing.html](https://martinfowler.com/eaaDev/EventSourcing.html)
- **CQRS Pattern**: Command Query Responsibility Segregation
- **WebSocket Best Practices**: [web.dev/websockets-basics](https://web.dev/)

---

## ✨ Conclusión

El State Sync Service es el corazón del sistema distribuido. Al establecerlo como fuente de verdad temporal y de estado, garantizamos:

- ✅ **Consistencia** entre múltiples clientes
- ✅ **Debugging reproducible** mediante record/replay
- ✅ **Escalabilidad** hacia arquitectura distribuida
- ✅ **Observabilidad** de todo el flujo de eventos

**Regla de Oro**: Si un componente no consulta al sync service para tiempo o estado crítico, está violando la arquitectura.

---

**Última Actualización**: Diciembre 2024  
**Próxima Revisión**: Tras implementación de backend (Fase 2)
