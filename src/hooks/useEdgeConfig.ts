import { useState, useEffect } from 'react';

// Consolidated config interface to reduce API calls
interface AppConfig {
  audio: {
    autoPlay: boolean;
  };
  features: {
    snowEnabled: boolean;
    waypointsEnabled: boolean;
  };
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const CACHE_KEY = 'edge-config-cache';

interface CacheData {
  timestamp: number;
  data: AppConfig;
}

function getCache(): CacheData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data = JSON.parse(cached) as CacheData;
    if (Date.now() - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
}

export function useEdgeConfig() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        // Check cache first
        const cached = getCache();
        if (cached) {
          setConfig(cached.data);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }

        const data = await response.json();
        
        // Cache the response
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data
        }));

        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Load defaults if fetch fails
        setConfig({
          audio: { autoPlay: true },
          features: {
            snowEnabled: true,
            waypointsEnabled: true
          }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return {
    config,
    loading,
    error
  };
}
