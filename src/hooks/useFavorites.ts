import { useState, useEffect, useCallback } from 'react';
import { favoritesApi, handleApiError } from '../services/api';
import type { CharacterWithId } from '../types';

interface UseFavoritesReturn {
  favorites: CharacterWithId[];
  loading: boolean;
  error: string | null;
  addingFavorite: boolean;
  deletingFavorite: boolean;
  addFavorite: (characterId: number) => Promise<void>;
  deleteFavorite: (id: number) => Promise<void>;
  reloadFavorites: () => Promise<void>;
  favoriteIds: number[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  setPage: (page: number) => void;
}

/**
 * Custom hook to manage favorites
 */
export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<CharacterWithId[]>([]);
  const [allFavoriteIds, setAllFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingFavorite, setAddingFavorite] = useState(false);
  const [deletingFavorite, setDeletingFavorite] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  // Load all favorite IDs for filtering (used by useCharacters hook)
  const loadAllFavoriteIds = useCallback(async () => {
    try {
      const allFavs = await favoritesApi.getAllFavorites();
      const ids = allFavs.map((fav) => fav.swapi_id);
      setAllFavoriteIds(ids);
    } catch (err) {
      console.error('Error loading favorite IDs:', err);
    }
  }, []);

  // Load paginated favorites for display
  const loadFavorites = useCallback(async (currentPage: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await favoritesApi.getFavorites(currentPage, 10);
      setFavorites(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Load favorites on mount and when page changes
  useEffect(() => {
    loadFavorites(page);
  }, [page, loadFavorites]);

  // Load all favorite IDs on mount
  useEffect(() => {
    loadAllFavoriteIds();
  }, [loadAllFavoriteIds]);

  const addFavorite = async (characterId: number) => {
    try {
      setAddingFavorite(true);
      setError(null);
      await favoritesApi.addFavorite(characterId);
      
      // Reload favorites and IDs after adding
      await Promise.all([
        loadFavorites(page),
        loadAllFavoriteIds(),
      ]);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setAddingFavorite(false);
    }
  };

  const deleteFavorite = async (id: number) => {
    try {
      setDeletingFavorite(true);
      setError(null);
      await favoritesApi.deleteFavorite(id);
      
      // Reload favorites and IDs after deleting
      await Promise.all([
        loadFavorites(page),
        loadAllFavoriteIds(),
      ]);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setDeletingFavorite(false);
    }
  };

  const reloadFavorites = async () => {
    await Promise.all([
      loadFavorites(page),
      loadAllFavoriteIds(),
    ]);
  };

  return {
    favorites,
    loading,
    error,
    addingFavorite,
    deletingFavorite,
    addFavorite,
    deleteFavorite,
    reloadFavorites,
    favoriteIds: allFavoriteIds,
    pagination,
    setPage,
  };
};
