/**
 * API client for El Fuego del Conocimiento Real backend
 * Handles all HTTP requests to the FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Health Check
export const health = {
  check: async () => fetchApi('/health'),
};

// Search API
export const search = {
  searchBooks: async (query: string, filters?: Record<string, any>, limit = 20) =>
    fetchApi('/api/search/search', {
      method: 'POST',
      body: JSON.stringify({ query, filters, limit }),
    }),
  
  getSuggestions: async (query: string, limit = 5) =>
    fetchApi(`/api/search/suggestions?query=${encodeURIComponent(query)}&limit=${limit}`),
  
  getFilters: async () =>
    fetchApi('/api/search/filters'),
};

// Semantic Analysis API
export const semantic = {
  analyzeText: async (
    text: string,
    options = {
      analyze_symbols: true,
      analyze_energy: true,
      analyze_correspondences: true,
    }
  ) =>
    fetchApi('/api/semantic/analyze', {
      method: 'POST',
      body: JSON.stringify({ text, ...options }),
    }),
  
  listSymbols: async () =>
    fetchApi('/api/semantic/symbols'),
  
  listElements: async () =>
    fetchApi('/api/semantic/elements'),
};

// Synthesis API
export const synthesis = {
  synthesize: async (
    sourceBookIds: number[],
    synthesisType: 'fusion' | 'transformation' | 'generation',
    prompt?: string,
    model?: string
  ) =>
    fetchApi('/api/synthesis/synthesize', {
      method: 'POST',
      body: JSON.stringify({
        source_book_ids: sourceBookIds,
        synthesis_type: synthesisType,
        prompt,
        model,
      }),
    }),
  
  transformText: async (
    text: string,
    transformationType: 'modernize' | 'archaize' | 'simplify' | 'amplify' | 'poetic'
  ) =>
    fetchApi('/api/synthesis/transform', {
      method: 'POST',
      body: JSON.stringify({ text, transformation_type: transformationType }),
    }),
  
  generateText: async (
    theme: string,
    style: 'alchemical' | 'masonic' | 'kabbalistic' = 'alchemical'
  ) =>
    fetchApi('/api/synthesis/generate', {
      method: 'POST',
      body: JSON.stringify({ theme, style }),
    }),
};

// State Sync API
export const stateSync = {
  createSession: async (userId: number, deviceInfo?: string) =>
    fetchApi('/api/sync/sessions', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, device_info: deviceInfo }),
    }),
  
  getSession: async (sessionToken: string) =>
    fetchApi(`/api/sync/sessions/${sessionToken}`),
  
  updateState: async (sessionToken: string, stateUpdates: Record<string, any>) =>
    fetchApi(`/api/sync/sessions/${sessionToken}/state`, {
      method: 'PUT',
      body: JSON.stringify(stateUpdates),
    }),
  
  syncAcrossDevices: async (sessionToken: string, stateUpdates: Record<string, any>) =>
    fetchApi(`/api/sync/sessions/${sessionToken}/sync`, {
      method: 'POST',
      body: JSON.stringify(stateUpdates),
    }),
  
  deleteSession: async (sessionToken: string) =>
    fetchApi(`/api/sync/sessions/${sessionToken}`, {
      method: 'DELETE',
    }),
  
  recordEvent: async (
    sessionToken: string,
    eventType: string,
    eventData: Record<string, any>
  ) =>
    fetchApi(`/api/sync/sessions/${sessionToken}/events`, {
      method: 'POST',
      body: JSON.stringify({ event_type: eventType, event_data: eventData }),
    }),
  
  getEvents: async (sessionToken: string, limit?: number) => {
    const params = limit ? `?limit=${limit}` : '';
    return fetchApi(`/api/sync/sessions/${sessionToken}/events${params}`);
  },
  
  getUserSessions: async (userId: number) =>
    fetchApi(`/api/sync/users/${userId}/sessions`),
};

export default {
  health,
  search,
  semantic,
  synthesis,
  stateSync,
};
