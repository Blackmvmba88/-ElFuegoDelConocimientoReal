/**
 * React hooks for interacting with the backend API
 */
import { useState, useCallback } from 'react';
import apiClient from './api-client';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic hook for API calls
 */
export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (apiCall: () => Promise<{ data?: T; error?: string }>) => {
      setState({ data: null, loading: true, error: null });

      const response = await apiCall();

      if (response.error) {
        setState({ data: null, loading: false, error: response.error });
      } else {
        setState({ data: response.data || null, loading: false, error: null });
      }

      return response;
    },
    []
  );

  return { ...state, execute };
}

/**
 * Hook for semantic text analysis
 */
export function useSemanticAnalysis() {
  const { data, loading, error, execute } = useApi<any>();

  const analyzeText = useCallback(
    async (text: string) => {
      return execute(() => apiClient.semantic.analyzeText(text));
    },
    [execute]
  );

  return { analysis: data, loading, error, analyzeText };
}

/**
 * Hook for book search
 */
export function useBookSearch() {
  const { data, loading, error, execute } = useApi<any>();

  const searchBooks = useCallback(
    async (query: string, filters?: Record<string, any>) => {
      return execute(() => apiClient.search.searchBooks(query, filters));
    },
    [execute]
  );

  return { results: data, loading, error, searchBooks };
}

/**
 * Hook for text synthesis
 */
export function useTextSynthesis() {
  const { data, loading, error, execute } = useApi<any>();

  const synthesize = useCallback(
    async (
      sourceBookIds: number[],
      synthesisType: 'fusion' | 'transformation' | 'generation',
      prompt?: string
    ) => {
      return execute(() =>
        apiClient.synthesis.synthesize(sourceBookIds, synthesisType, prompt)
      );
    },
    [execute]
  );

  const transformText = useCallback(
    async (
      text: string,
      transformationType: 'modernize' | 'archaize' | 'simplify' | 'amplify' | 'poetic'
    ) => {
      return execute(() =>
        apiClient.synthesis.transformText(text, transformationType)
      );
    },
    [execute]
  );

  const generateText = useCallback(
    async (
      theme: string,
      style: 'alchemical' | 'masonic' | 'kabbalistic' = 'alchemical'
    ) => {
      return execute(() => apiClient.synthesis.generateText(theme, style));
    },
    [execute]
  );

  return { result: data, loading, error, synthesize, transformText, generateText };
}

/**
 * Hook for state synchronization
 */
export function useStateSync(userId: number) {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const { data, loading, error, execute } = useApi<any>();

  const createSession = useCallback(
    async (deviceInfo?: string) => {
      const response = await execute(() =>
        apiClient.stateSync.createSession(userId, deviceInfo)
      );
      if (response.data?.session_token) {
        setSessionToken(response.data.session_token);
        // Store in localStorage for persistence
        localStorage.setItem('sessionToken', response.data.session_token);
      }
      return response;
    },
    [userId, execute]
  );

  const updateState = useCallback(
    async (stateUpdates: Record<string, any>) => {
      if (!sessionToken) return { error: 'No session token' };
      return execute(() =>
        apiClient.stateSync.updateState(sessionToken, stateUpdates)
      );
    },
    [sessionToken, execute]
  );

  const syncAcrossDevices = useCallback(
    async (stateUpdates: Record<string, any>) => {
      if (!sessionToken) return { error: 'No session token' };
      return execute(() =>
        apiClient.stateSync.syncAcrossDevices(sessionToken, stateUpdates)
      );
    },
    [sessionToken, execute]
  );

  const recordEvent = useCallback(
    async (eventType: string, eventData: Record<string, any>) => {
      if (!sessionToken) return { error: 'No session token' };
      return execute(() =>
        apiClient.stateSync.recordEvent(sessionToken, eventType, eventData)
      );
    },
    [sessionToken, execute]
  );

  return {
    sessionToken,
    data,
    loading,
    error,
    createSession,
    updateState,
    syncAcrossDevices,
    recordEvent,
  };
}

/**
 * Hook for checking backend health
 */
export function useHealthCheck() {
  const { data, loading, error, execute } = useApi<any>();

  const checkHealth = useCallback(async () => {
    return execute(() => apiClient.health.check());
  }, [execute]);

  return { health: data, loading, error, checkHealth };
}
