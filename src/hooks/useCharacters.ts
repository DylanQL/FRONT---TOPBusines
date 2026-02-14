import { useState, useEffect, useCallback, useMemo } from 'react';
import { charactersApi, handleApiError } from '../services/api';
import type { Character, SearchFilters } from '../types';

interface UseCharactersReturn {
  characters: Character[];
  filteredCharacters: Character[];
  paginatedCharacters: Character[];
  loading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  reloadCharacters: () => Promise<void>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  setPage: (page: number) => void;
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
  const [page, setPage] = useState(1);
  const pageSize = 10; // 10 characters per page (matches SWAPI pagination)
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

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [searchFilters]);

  // Calculate pagination
  const pagination = useMemo(() => {
    const total = filteredCharacters.length;
    const totalPages = Math.ceil(total / pageSize);
    return {
      page,
      pageSize,
      total,
      totalPages,
    };
  }, [filteredCharacters.length, page, pageSize]);

  // Get paginated characters
  const paginatedCharacters = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCharacters.slice(startIndex, endIndex);
  }, [filteredCharacters, page, pageSize]);

  return {
    characters,
    filteredCharacters,
    paginatedCharacters,
    loading,
    error,
    searchFilters,
    setSearchFilters,
    reloadCharacters: loadAllCharacters,
    pagination,
    setPage,
  };
};
