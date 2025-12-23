/**
 * 🔥 Event Schema - El Fuego del Conocimiento Real
 * 
 * Contrato de eventos del sistema para comunicación entre componentes.
 * Todos los eventos deben extender BaseEvent para garantizar trazabilidad.
 * 
 * Principio: Si un componente no sabe qué eventos consume,
 *            no pertenece al núcleo (CORE).
 */

// ============================================================================
// BASE EVENT INTERFACE
// ============================================================================

/**
 * Todos los eventos del sistema heredan de esta interfaz base.
 * Garantiza timestamp, duración y nivel de confianza.
 */
export interface BaseEvent {
  /** Unix timestamp en milisegundos */
  timestamp: number;
  
  /** Duración del evento en milisegundos (opcional) */
  duration?: number;
  
  /** Nivel de confianza/certeza del evento (0-1) */
  confidence: number;
  
  /** Datos específicos del evento */
  payload: unknown;
}

// ============================================================================
// TEXT & ANALYSIS EVENTS
// ============================================================================

/**
 * Evento disparado cuando un texto es analizado semánticamente
 */
export interface TextAnalysisEvent extends BaseEvent {
  type: 'text_analysis';
  payload: {
    /** ID del libro o texto analizado */
    bookId: string;
    
    /** Palabras clave extraídas */
    keywords: string[];
    
    /** Símbolos herméticos detectados */
    symbols: string[];
    
    /** Nivel de energía detectado en el texto */
    energy: 'low' | 'medium' | 'high';
    
    /** Categorías identificadas */
    categories?: string[];
    
    /** Metadatos adicionales */
    metadata?: Record<string, unknown>;
  };
}

/**
 * Evento disparado cuando se solicita análisis de un texto
 */
export interface AnalysisRequestEvent extends BaseEvent {
  type: 'analysis_request';
  payload: {
    /** ID del libro a analizar */
    bookId: string;
    
    /** Texto a analizar (puede ser fragmento) */
    text: string;
    
    /** Tipo de análisis solicitado */
    analysisType: 'semantic' | 'symbolic' | 'energy' | 'full';
  };
}

/**
 * Evento emitido cuando se genera una síntesis de textos
 */
export interface SynthesisEvent extends BaseEvent {
  type: 'synthesis';
  payload: {
    /** IDs de los textos fuente */
    sourceIds: string[];
    
    /** Texto resultante de la síntesis */
    synthesizedText: string;
    
    /** Método de síntesis usado */
    method: 'fusion' | 'transformation' | 'extraction';
    
    /** Parámetros utilizados */
    parameters?: Record<string, unknown>;
  };
}

// ============================================================================
// USER PROGRESS & INTERACTION EVENTS
// ============================================================================

/**
 * Evento de progreso del usuario en el sistema de grados
 */
export interface UserProgressEvent extends BaseEvent {
  type: 'user_progress';
  payload: {
    /** ID del usuario */
    userId: string;
    
    /** Grado actual (1-33) */
    grade: number;
    
    /** Cámara elemental */
    chamber: 'silence' | 'light' | 'fire' | 'air' | 'ether';
    
    /** Tipo de acción realizada */
    actionType: 'read' | 'write' | 'fuse' | 'meditate';
    
    /** Puntos de experiencia ganados */
    experienceGained?: number;
    
    /** Nueva habilidad desbloqueada */
    unlockedAbility?: string;
  };
}

/**
 * Evento de interacción del usuario con el sistema
 */
export interface UserInteractionEvent extends BaseEvent {
  type: 'user_interaction';
  payload: {
    /** ID del usuario */
    userId: string;
    
    /** Tipo de interacción */
    interactionType: 'click' | 'search' | 'bookmark' | 'annotate' | 'share';
    
    /** Componente donde ocurrió la interacción */
    component: string;
    
    /** ID del recurso interactuado (libro, texto, etc.) */
    resourceId?: string;
    
    /** Datos adicionales de la interacción */
    data?: Record<string, unknown>;
  };
}

// ============================================================================
// SEMANTIC SEARCH EVENTS
// ============================================================================

/**
 * Evento de búsqueda semántica
 */
export interface SemanticSearchEvent extends BaseEvent {
  type: 'semantic_search';
  payload: {
    /** Query de búsqueda */
    query: string;
    
    /** Resultados encontrados */
    results: Array<{
      /** ID del recurso */
      bookId: string;
      
      /** Score de similitud (0-1) */
      score: number;
      
      /** Fragmento relevante */
      snippet?: string;
    }>;
    
    /** Tiempo de ejecución de la búsqueda (ms) */
    executionTime?: number;
    
    /** Filtros aplicados */
    filters?: {
      author?: string;
      language?: string;
      category?: string;
      dateRange?: [string, string];
    };
  };
}

// ============================================================================
// CHAMBER & VISUALIZATION EVENTS
// ============================================================================

/**
 * Evento de entrada a una cámara elemental
 */
export interface ChamberEnterEvent extends BaseEvent {
  type: 'chamber_enter';
  payload: {
    /** ID del usuario */
    userId: string;
    
    /** Cámara a la que entra */
    chamber: 'silence' | 'light' | 'fire' | 'air' | 'ether';
    
    /** Nivel de acceso del usuario */
    accessLevel: number;
    
    /** Es primera visita a esta cámara */
    isFirstVisit: boolean;
  };
}

/**
 * Evento de visualización energética (Llama Trina)
 */
export interface EnergyVisualizationEvent extends BaseEvent {
  type: 'energy_visualization';
  payload: {
    /** Tipo de energía visualizada */
    energyType: 'text' | 'user' | 'collective';
    
    /** Intensidad de la energía (0-1) */
    intensity: number;
    
    /** Color de la llama (hex) */
    color: string;
    
    /** Patrones detectados */
    patterns?: string[];
  };
}

// ============================================================================
// ERROR & SYSTEM EVENTS
// ============================================================================

/**
 * Evento de error en el sistema
 */
export interface ErrorEvent extends BaseEvent {
  type: 'error';
  payload: {
    /** Componente donde ocurrió el error */
    component: string;
    
    /** Mensaje de error */
    message: string;
    
    /** Código de error */
    code?: string;
    
    /** Stack trace (solo en desarrollo) */
    stack?: string;
    
    /** Contexto adicional */
    context?: Record<string, unknown>;
  };
}

/**
 * Evento de log del sistema
 */
export interface LogEvent extends BaseEvent {
  type: 'log';
  payload: {
    /** Nivel de log */
    level: 'debug' | 'info' | 'warn' | 'error';
    
    /** Componente que genera el log */
    component: string;
    
    /** Mensaje */
    message: string;
    
    /** Datos adicionales */
    data?: Record<string, unknown>;
  };
}

// ============================================================================
// SESSION & STATE SYNC EVENTS
// ============================================================================

/**
 * Evento de sincronización de sesión
 */
export interface SessionSyncEvent extends BaseEvent {
  type: 'session_sync';
  payload: {
    /** ID de la sesión */
    sessionId: string;
    
    /** Estado a sincronizar */
    state: Record<string, unknown>;
    
    /** Tipo de sincronización */
    syncType: 'push' | 'pull' | 'merge';
  };
}

/**
 * Evento de grabación de sesión (para replay/debugging)
 */
export interface SessionRecordEvent extends BaseEvent {
  type: 'session_record';
  payload: {
    /** ID de la sesión */
    sessionId: string;
    
    /** Eventos grabados */
    events: BaseEvent[];
    
    /** Modo de grabación */
    recordMode: 'full' | 'interactions_only' | 'critical_path';
  };
}

// ============================================================================
// UNION TYPE - ALL EVENTS
// ============================================================================

/**
 * Union type de todos los eventos del sistema.
 * Útil para type guards y event handlers tipados.
 */
export type SystemEvent =
  | TextAnalysisEvent
  | AnalysisRequestEvent
  | SynthesisEvent
  | UserProgressEvent
  | UserInteractionEvent
  | SemanticSearchEvent
  | ChamberEnterEvent
  | EnergyVisualizationEvent
  | ErrorEvent
  | LogEvent
  | SessionSyncEvent
  | SessionRecordEvent;

// ============================================================================
// EVENT VALIDATORS
// ============================================================================

/**
 * Valida que un evento tenga la estructura base correcta
 */
export function isValidBaseEvent(event: unknown): event is BaseEvent {
  if (typeof event !== 'object' || event === null) return false;
  
  const e = event as Record<string, unknown>;
  
  return (
    typeof e.timestamp === 'number' &&
    typeof e.confidence === 'number' &&
    e.confidence >= 0 &&
    e.confidence <= 1 &&
    'payload' in e
  );
}

/**
 * Crea un evento con valores base garantizados
 */
export function createEvent<T extends SystemEvent>(
  type: T['type'],
  payload: T['payload'],
  options?: {
    confidence?: number;
    duration?: number;
  }
): T {
  return {
    type,
    timestamp: Date.now(),
    confidence: options?.confidence ?? 1.0,
    duration: options?.duration,
    payload,
  } as unknown as T;
}

// ============================================================================
// EVENT BUS INTERFACE (Future Implementation)
// ============================================================================

/**
 * Interfaz para el bus de eventos (a implementar en Fase 2)
 */
export interface EventBus {
  /** Publicar un evento */
  publish<T extends SystemEvent>(event: T): void;
  
  /** Suscribirse a un tipo de evento */
  subscribe<T extends SystemEvent['type']>(
    eventType: T,
    handler: (event: Extract<SystemEvent, { type: T }>) => void
  ): () => void;
  
  /** Obtener historial de eventos (para replay) */
  getHistory(filters?: {
    types?: SystemEvent['type'][];
    fromTimestamp?: number;
    toTimestamp?: number;
  }): SystemEvent[];
}
