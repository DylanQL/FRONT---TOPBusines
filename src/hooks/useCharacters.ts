import { useState, useEffect, useCallback } from 'react';
import { charactersApi, handleApiError } from '../services/api';
import type { Character, SearchFilters } from '../types';

interface UseCharactersReturn {
  characters: Character[];
  filteredCharacters: Character[];
  loading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  reloadCharacters: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage all characters from SWAPI
 * Loads all 9 pages on mount for global search capability
 */
export const useCharacters = (favoriteIds: number[]): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    type: 'name',
    query: '',
  });

  const loadAllCharacters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allCharacters = await charactersApi.getAllCharacters();
      setCharacters(allCharacters);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Load all characters on mount
  useEffect(() => {
    loadAllCharacters();
  }, [loadAllCharacters]);

  // Filter characters based on search and exclude favorites
  useEffect(() => {
    let result = [...characters];

    // Exclude favorites (we need to match by name since SWAPI characters don't have IDs in the response)
    // We'll use index + 1 as the SWAPI ID (this is how SWAPI works)
    if (favoriteIds.length > 0) {
      result = result.filter((_, index) => {
        const swapiId = index + 1;
        return !favoriteIds.includes(swapiId);
      });
    }

    // Apply search filters
    if (searchFilters.query.trim()) {
      const query = searchFilters.query.toLowerCase().trim();
      
      if (searchFilters.type === 'name') {
        result = result.filter((char) =>
          char.name.toLowerCase().includes(query)
        );
      } else if (searchFilters.type === 'id') {
        const searchId = parseInt(query, 10);
        if (!isNaN(searchId)) {
          result = result.filter((_, index) => {
            const swapiId = index + 1;
            return swapiId === searchId;
          });
        } else {
          result = [];
        }
      }
    }

    setFilteredCharacters(result);
  }, [characters, searchFilters, favoriteIds]);

  return {
    characters,
    filteredCharacters,
    loading,
    error,
    searchFilters,
    setSearchFilters,
    reloadCharacters: loadAllCharacters,
  };
};
