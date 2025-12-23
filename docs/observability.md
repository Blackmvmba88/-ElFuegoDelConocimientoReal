# 📊 Observabilidad Mínima pero Real

## 🎯 Filosofía

> **Primero VER el sistema respirar. Después optimizar.**

Sin dashboards complejos aún. Solo estructuras que permitan entender qué está pasando en tiempo real y diagnosticar problemas cuando ocurran.

---

## 📐 Principios de Observabilidad

### 1. **Structured Logging**
- Todos los logs en formato JSON
- Campos consistentes: timestamp, level, component, event
- Fácil de parsear, filtrar y analizar

### 2. **Métricas Simples**
- Latencia de operaciones críticas
- Tasa de errores
- Throughput (operaciones por segundo)

### 3. **Sin Over-Engineering**
- No construir un sistema de monitoreo completo
- No implementar dashboards aún
- Sí capturar datos que permitan debug efectivo

---

## 📝 Structured Logging

### Formato de Log Estándar

```typescript
interface LogEntry {
  /** Timestamp Unix en milisegundos */
  timestamp: number;
  
  /** Nivel de severidad */
  level: 'debug' | 'info' | 'warn' | 'error';
  
  /** Componente que genera el log */
  component: string;
  
  /** Tipo de evento */
  event: string;
  
  /** Mensaje legible */
  message: string;
  
  /** Duración de la operación (ms) - opcional */
  duration?: number;
  
  /** Metadatos adicionales */
  metadata?: Record<string, unknown>;
  
  /** Stack trace si es error */
  stack?: string;
  
  /** ID de correlación para rastrear flujos */
  correlationId?: string;
}
```

### Implementación Básica

```typescript
// lib/logger.ts
class Logger {
  private component: string;
  
  constructor(component: string) {
    this.component = component;
  }
  
  private log(level: LogEntry['level'], event: string, message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      component: this.component,
      event,
      message,
      metadata
    };
    
    // En desarrollo: log bonito
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${this.component}:${event} - ${message}`, metadata || '');
    } else {
      // En producción: JSON structured
      console.log(JSON.stringify(entry));
    }
  }
  
  debug(event: string, message: string, metadata?: Record<string, unknown>): void {
    this.log('debug', event, message, metadata);
  }
  
  info(event: string, message: string, metadata?: Record<string, unknown>): void {
    this.log('info', event, message, metadata);
  }
  
  warn(event: string, message: string, metadata?: Record<string, unknown>): void {
    this.log('warn', event, message, metadata);
  }
  
  error(event: string, message: string, error?: Error, metadata?: Record<string, unknown>): void {
    this.log('error', event, message, {
      ...metadata,
      stack: error?.stack,
      errorMessage: error?.message
    });
  }
  
  /** Medir duración de operación */
  async time<T>(event: string, operation: () => Promise<T>): Promise<T> {
    const start = Date.now();
    try {
      const result = await operation();
      const duration = Date.now() - start;
      this.info(event, `Completed in ${duration}ms`, { duration });
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.error(event, `Failed after ${duration}ms`, error as Error, { duration });
      throw error;
    }
  }
}

// Factory function
export function createLogger(component: string): Logger {
  return new Logger(component);
}
```

### Uso en Componentes

```typescript
// lib/gutenberg-client.ts
import { createLogger } from './logger';

const logger = createLogger('gutenberg-client');

export async function searchBooks(query: string): Promise<Book[]> {
  logger.info('search_started', `Searching for: ${query}`, { query });
  
  try {
    const books = await logger.time('search_books', async () => {
      const response = await fetch(`https://gutendex.com/books/?search=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    });
    
    logger.info('search_completed', `Found ${books.length} books`, {
      query,
      resultCount: books.length
    });
    
    return books;
  } catch (error) {
    logger.error('search_failed', 'Failed to search books', error as Error, { query });
    throw error;
  }
}
```

### Logs de Eventos del Sistema

```typescript
// lib/event-logger.ts
import { createLogger } from './logger';
import type { SystemEvent } from '@/types/event-schema';

const logger = createLogger('event-bus');

export function logEvent(event: SystemEvent): void {
  logger.info('event_published', `Event: ${event.type}`, {
    eventType: event.type,
    timestamp: event.timestamp,
    confidence: event.confidence,
    duration: event.duration,
    payload: event.payload
  });
}

export function logEventError(event: SystemEvent, error: Error): void {
  logger.error('event_failed', `Event processing failed: ${event.type}`, error, {
    eventType: event.type,
    timestamp: event.timestamp,
    payload: event.payload
  });
}
```

---

## 📈 Métricas Básicas

### Qué Medir (Fase 1)

```typescript
interface Metrics {
  /** Latencias por operación (ms) */
  latencies: {
    searchBooks: number[];
    loadBook: number[];
    analyzeText: number[];
    synthesizeText: number[];
  };
  
  /** Contadores de errores */
  errors: {
    total: number;
    byComponent: Record<string, number>;
    byType: Record<string, number>;
  };
  
  /** Throughput (eventos/segundo) */
  throughput: {
    eventsPerSecond: number;
    requestsPerSecond: number;
  };
  
  /** User actions */
  userActions: {
    reads: number;
    writes: number;
    searches: number;
    gradeChanges: number;
  };
}
```

### Collector Simple

```typescript
// lib/metrics.ts
class MetricsCollector {
  private metrics: Metrics = {
    latencies: {
      searchBooks: [],
      loadBook: [],
      analyzeText: [],
      synthesizeText: []
    },
    errors: {
      total: 0,
      byComponent: {},
      byType: {}
    },
    throughput: {
      eventsPerSecond: 0,
      requestsPerSecond: 0
    },
    userActions: {
      reads: 0,
      writes: 0,
      searches: 0,
      gradeChanges: 0
    }
  };
  
  /** Registrar latencia */
  recordLatency(operation: keyof Metrics['latencies'], durationMs: number): void {
    this.metrics.latencies[operation].push(durationMs);
    
    // Mantener solo últimas 1000 mediciones
    if (this.metrics.latencies[operation].length > 1000) {
      this.metrics.latencies[operation].shift();
    }
  }
  
  /** Registrar error */
  recordError(component: string, errorType: string): void {
    this.metrics.errors.total++;
    this.metrics.errors.byComponent[component] = (this.metrics.errors.byComponent[component] || 0) + 1;
    this.metrics.errors.byType[errorType] = (this.metrics.errors.byType[errorType] || 0) + 1;
  }
  
  /** Registrar acción de usuario */
  recordUserAction(action: keyof Metrics['userActions']): void {
    this.metrics.userActions[action]++;
  }
  
  /** Obtener estadísticas de latencia */
  getLatencyStats(operation: keyof Metrics['latencies']): {
    min: number;
    max: number;
    avg: number;
    p50: number;
    p95: number;
    p99: number;
  } {
    const latencies = this.metrics.latencies[operation].sort((a, b) => a - b);
    
    if (latencies.length === 0) {
      return { min: 0, max: 0, avg: 0, p50: 0, p95: 0, p99: 0 };
    }
    
    const sum = latencies.reduce((a, b) => a + b, 0);
    
    return {
      min: latencies[0],
      max: latencies[latencies.length - 1],
      avg: sum / latencies.length,
      p50: latencies[Math.floor(latencies.length * 0.5)],
      p95: latencies[Math.floor(latencies.length * 0.95)],
      p99: latencies[Math.floor(latencies.length * 0.99)]
    };
  }
  
  /** Obtener snapshot de métricas */
  getSnapshot(): Metrics {
    return JSON.parse(JSON.stringify(this.metrics));
  }
  
  /** Resetear métricas */
  reset(): void {
    this.metrics = {
      latencies: { searchBooks: [], loadBook: [], analyzeText: [], synthesizeText: [] },
      errors: { total: 0, byComponent: {}, byType: {} },
      throughput: { eventsPerSecond: 0, requestsPerSecond: 0 },
      userActions: { reads: 0, writes: 0, searches: 0, gradeChanges: 0 }
    };
  }
}

export const metrics = new MetricsCollector();
```

### Uso en Código

```typescript
// lib/gutenberg-client.ts
import { metrics } from './metrics';
import { createLogger } from './logger';

const logger = createLogger('gutenberg-client');

export async function searchBooks(query: string): Promise<Book[]> {
  const start = Date.now();
  
  try {
    const response = await fetch(`https://gutendex.com/books/?search=${query}`);
    
    if (!response.ok) {
      metrics.recordError('gutenberg-client', `http_${response.status}`);
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    const duration = Date.now() - start;
    
    metrics.recordLatency('searchBooks', duration);
    metrics.recordUserAction('searches');
    
    logger.info('search_completed', `Found ${data.results.length} books`, {
      query,
      duration,
      resultCount: data.results.length
    });
    
    return data.results;
  } catch (error) {
    const duration = Date.now() - start;
    metrics.recordLatency('searchBooks', duration);
    metrics.recordError('gutenberg-client', 'search_failed');
    
    logger.error('search_failed', 'Failed to search books', error as Error, { query, duration });
    throw error;
  }
}
```

---

## 🔍 Herramientas de Inspección

### Debug Endpoint (Development Only)

```typescript
// app/api/debug/metrics/route.ts (Next.js API Route)
import { metrics } from '@/lib/metrics';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return Response.json({ error: 'Not available in production' }, { status: 403 });
  }
  
  const snapshot = metrics.getSnapshot();
  
  // Agregar estadísticas calculadas
  const stats = {
    searchBooks: metrics.getLatencyStats('searchBooks'),
    loadBook: metrics.getLatencyStats('loadBook'),
    analyzeText: metrics.getLatencyStats('analyzeText'),
    synthesizeText: metrics.getLatencyStats('synthesizeText')
  };
  
  return Response.json({
    metrics: snapshot,
    stats,
    timestamp: Date.now()
  });
}
```

### Console Command para Métricas

```typescript
// lib/metrics-cli.ts
export function printMetrics(): void {
  const stats = {
    searchBooks: metrics.getLatencyStats('searchBooks'),
    loadBook: metrics.getLatencyStats('loadBook')
  };
  
  console.log('=== METRICS SNAPSHOT ===');
  console.log('');
  console.log('Latencies (ms):');
  console.log('  Search Books:');
  console.log(`    avg: ${stats.searchBooks.avg.toFixed(2)}`);
  console.log(`    p50: ${stats.searchBooks.p50}`);
  console.log(`    p95: ${stats.searchBooks.p95}`);
  console.log(`    p99: ${stats.searchBooks.p99}`);
  console.log('');
  
  const snapshot = metrics.getSnapshot();
  console.log('Errors:');
  console.log(`  Total: ${snapshot.errors.total}`);
  console.log(`  By component:`, snapshot.errors.byComponent);
  console.log('');
  
  console.log('User Actions:');
  console.log(`  Reads: ${snapshot.userActions.reads}`);
  console.log(`  Writes: ${snapshot.userActions.writes}`);
  console.log(`  Searches: ${snapshot.userActions.searches}`);
  console.log(`  Grade Changes: ${snapshot.userActions.gradeChanges}`);
}

// Exponer en window para dev console
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).printMetrics = printMetrics;
  (window as any).metrics = metrics;
}
```

---

## 📊 Visualización Básica (Sin Dashboard)

### Logs Estructurados con jq

```bash
# Ver últimos 20 logs
npm run dev 2>&1 | grep '{' | tail -20 | jq '.'

# Filtrar errores
npm run dev 2>&1 | grep '{' | jq 'select(.level == "error")'

# Calcular latencia promedio de búsquedas
npm run dev 2>&1 | grep '{' | jq 'select(.event == "search_books") | .metadata.duration' | awk '{sum+=$1; count++} END {print sum/count}'

# Ver distribución de eventos
npm run dev 2>&1 | grep '{' | jq '.event' | sort | uniq -c
```

### Script de Análisis Simple

```typescript
// scripts/analyze-logs.ts
import fs from 'fs';
import path from 'path';

interface LogEntry {
  timestamp: number;
  level: string;
  component: string;
  event: string;
  message: string;
  metadata?: Record<string, unknown>;
}

function analyzeLogs(logFile: string): void {
  const logs: LogEntry[] = fs
    .readFileSync(logFile, 'utf-8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line));
  
  // Contar por nivel
  const byLevel = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Contar por componente
  const byComponent = logs.reduce((acc, log) => {
    acc[log.component] = (acc[log.component] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Errores más frecuentes
  const errors = logs.filter(log => log.level === 'error');
  const errorTypes = errors.reduce((acc, log) => {
    acc[log.event] = (acc[log.event] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('=== LOG ANALYSIS ===');
  console.log('');
  console.log('By Level:', byLevel);
  console.log('By Component:', byComponent);
  console.log('Error Types:', errorTypes);
  console.log('');
  console.log(`Total Logs: ${logs.length}`);
  console.log(`Time Range: ${new Date(logs[0].timestamp)} - ${new Date(logs[logs.length - 1].timestamp)}`);
}

// Uso: tsx scripts/analyze-logs.ts logs/app.log
const logFile = process.argv[2];
if (logFile) {
  analyzeLogs(logFile);
} else {
  console.error('Usage: tsx scripts/analyze-logs.ts <log-file>');
}
```

---

## 🚨 Alertas Básicas

### Thresholds Simples

```typescript
// lib/alerts.ts
import { createLogger } from './logger';
import { metrics } from './metrics';

const logger = createLogger('alerts');

export function checkThresholds(): void {
  const snapshot = metrics.getSnapshot();
  
  // Error rate alto
  if (snapshot.errors.total > 100) {
    logger.warn('high_error_rate', `High error rate: ${snapshot.errors.total} errors`, {
      errors: snapshot.errors
    });
  }
  
  // Latencia alta en búsquedas
  const searchStats = metrics.getLatencyStats('searchBooks');
  if (searchStats.p95 > 2000) {
    logger.warn('high_latency', `High search latency: p95=${searchStats.p95}ms`, {
      stats: searchStats
    });
  }
}

// Ejecutar check cada 5 minutos
if (typeof window === 'undefined') { // Server-side only
  setInterval(checkThresholds, 5 * 60 * 1000);
}
```

---

## 📚 Correlación de Eventos

### Correlation ID para Flujos

```typescript
// lib/correlation.ts
import { randomUUID } from 'crypto';

let currentCorrelationId: string | null = null;

export function startCorrelation(): string {
  currentCorrelationId = randomUUID();
  return currentCorrelationId;
}

export function getCorrelationId(): string | null {
  return currentCorrelationId;
}

export function endCorrelation(): void {
  currentCorrelationId = null;
}

// Uso en flujo completo
export async function searchAndAnalyze(query: string) {
  const correlationId = startCorrelation();
  
  try {
    logger.info('flow_started', 'Search and analyze flow', { correlationId, query });
    
    const books = await searchBooks(query); // Logs incluyen correlationId
    const analysis = await analyzeBooks(books); // Logs incluyen mismo correlationId
    
    logger.info('flow_completed', 'Flow completed successfully', { correlationId });
    return analysis;
  } catch (error) {
    logger.error('flow_failed', 'Flow failed', error as Error, { correlationId });
    throw error;
  } finally {
    endCorrelation();
  }
}
```

---

## 🎯 Próximos Pasos (Fase 2)

Cuando el sistema crezca:

1. **Log Aggregation**: Enviar logs a servicio externo (Logtail, Datadog, CloudWatch)
2. **Dashboards**: Crear visualizaciones básicas (Grafana, Datadog)
3. **Distributed Tracing**: OpenTelemetry para rastrear requests entre servicios
4. **Real-time Alerts**: Integración con Slack/Discord para errores críticos

Pero por ahora: **Structured Logs + Métricas Básicas = Suficiente para ver el sistema respirar.**

---

## ✨ Conclusión

La observabilidad no es opcional, es fundacional. Pero tampoco necesita ser compleja desde el día 1.

Con:
- ✅ Logs estructurados en JSON
- ✅ Métricas básicas (latencia, errores, throughput)
- ✅ Correlation IDs para flujos
- ✅ Herramientas simples de análisis

Ya podemos:
- 🔍 Diagnosticar problemas rápidamente
- 📊 Entender patrones de uso
- 🐛 Reproducir bugs con contexto
- 📈 Identificar cuellos de botella

**Regla de Oro**: Si no puedes ver qué hizo el sistema antes de fallar, tu observabilidad es insuficiente.

---

**Última Actualización**: Diciembre 2024  
**Próxima Revisión**: Tras implementar logging en todos los componentes CORE
