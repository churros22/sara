
import { useState, useEffect } from "react";

/**
 * Interface for the saved state of each device
 */
interface DeviceState {
  lastVisited: string; // Last timestamp when visited
  scrollPosition: number; // Last scroll position
  contentCache?: any; // Cached content (if applicable)
}

/**
 * Custom hook for managing device states
 * Handles persistence, caching, and state management for desktop devices
 */
export function useDeviceState(deviceId: string) {
  const [state, setState] = useState<DeviceState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    try {
      const savedState = localStorage.getItem(`device_${deviceId}`);
      if (savedState) {
        setState(JSON.parse(savedState));
      } else {
        // Initialize with default state if none exists
        setState({
          lastVisited: "",
          scrollPosition: 0,
        });
      }
    } catch (error) {
      console.error(`Error loading state for device ${deviceId}:`, error);
      // Initialize with default state on error
      setState({
        lastVisited: "",
        scrollPosition: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, [deviceId]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state && !isLoading) {
      try {
        localStorage.setItem(`device_${deviceId}`, JSON.stringify(state));
      } catch (error) {
        console.error(`Error saving state for device ${deviceId}:`, error);
      }
    }
  }, [state, deviceId, isLoading]);

  /**
   * Update device state with new values
   * @param updates Partial updates to apply to device state
   */
  const updateState = (updates: Partial<DeviceState>) => {
    setState(prev => {
      if (!prev) return updates as DeviceState;
      return { ...prev, ...updates };
    });
  };

  /**
   * Record a visit to this device
   * Updates the lastVisited timestamp
   */
  const recordVisit = () => {
    updateState({
      lastVisited: new Date().toISOString(),
    });
  };

  /**
   * Save the current scroll position
   * @param position Scroll position to save
   */
  const saveScrollPosition = (position: number) => {
    updateState({
      scrollPosition: position,
    });
  };

  /**
   * Cache content for this device
   * @param content Content to cache
   */
  const cacheContent = (content: any) => {
    updateState({
      contentCache: content,
    });
  };

  /**
   * Clear the cached content
   */
  const clearCache = () => {
    updateState({
      contentCache: undefined,
    });
  };

  return {
    state,
    isLoading,
    recordVisit,
    saveScrollPosition,
    cacheContent,
    clearCache
  };
}
