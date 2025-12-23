/**
 * TypeScript interfaces for API responses
 */

// Health Check
export interface HealthResponse {
  status: string;
  version: string;
  database: string;
  redis: string;
  qdrant: string;
  timestamp: string;
}

// Book interfaces
export interface Book {
  id: number;
  title: string;
  author?: string;
  source: string;
  source_id?: string;
  description?: string;
  language?: string;
  publication_year?: number;
  hermetic_symbols: string[];
  elemental_energy: Record<string, number>;
  correspondences: string[];
  created_at: string;
}

export interface BookDetail extends Book {
  content: string;
}

// Search interfaces
export interface SearchResponse {
  results: Book[];
  total: number;
  query: string;
}

export interface SearchFiltersResponse {
  authors: string[];
  languages: string[];
  elements: string[];
  symbols: string[];
}

export interface SearchSuggestionsResponse {
  suggestions: string[];
}

// Semantic Analysis interfaces
export interface HermeticSymbol {
  symbol: string;
  category: string;
  count: number;
  positions: number[];
}

export interface Correspondence {
  symbol: string;
  category: string;
  correspondences: string[];
}

export interface SemanticAnalysisResponse {
  hermetic_symbols: HermeticSymbol[];
  elemental_energy: Record<string, number>;
  correspondences: Correspondence[];
  summary: string;
}

export interface SymbolsResponse {
  alchemical: string[];
  masonic: string[];
  kabbalistic: string[];
}

export interface ElementsResponse {
  [element: string]: string[];
}

// Synthesis interfaces
export interface SynthesisResponse {
  content: string;
  synthesis_type: string;
  model_used: string;
}

export interface TransformResponse {
  original: string;
  transformed: string;
  transformation_type: string;
}

export interface GenerateResponse {
  content: string;
  theme: string;
  style: string;
}

// State Sync interfaces
export interface Session {
  user_id: number;
  device_info: string;
  created_at: string;
  last_activity: string;
  state: Record<string, any>;
}

export interface SessionResponse {
  session_token: string;
  message: string;
}

export interface SessionStateResponse {
  message: string;
}

export interface SyncResponse {
  message: string;
  devices_updated: number;
}

export interface Event {
  type: string;
  data: Record<string, any>;
  timestamp: string;
}

export interface EventsResponse {
  events: Event[];
}

export interface UserSessionsResponse {
  sessions: Array<Session & { token: string }>;
}
