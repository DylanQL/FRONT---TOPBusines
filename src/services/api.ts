import axios, { AxiosError } from 'axios';
import type {
  ApiResponse,
  CharactersResponse,
  Character,
  FavoritesResponse,
  CharacterWithId,
  AddFavoriteRequest,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (axiosError.response?.data?.errors) {
      return axiosError.response.data.errors.map(e => e.message).join(', ');
    }
    return axiosError.message;
  }
  return 'Error desconocido';
};

// Characters API
export const charactersApi = {
  /**
   * Get characters from a specific page
   */
  getCharacters: async (page: number = 1): Promise<CharactersResponse> => {
    const response = await api.get<ApiResponse<CharactersResponse>>(`/api/characters`, {
      params: { page },
    });
    return response.data.data;
  },

  /**
   * Get all characters from all pages (1-9)
   */
  getAllCharacters: async (): Promise<Character[]> => {
    const allCharacters: Character[] = [];
    const totalPages = 9; // SWAPI has 9 pages

    // Fetch all pages in parallel for better performance
    const promises = Array.from({ length: totalPages }, (_, i) =>
      charactersApi.getCharacters(i + 1)
    );

    const results = await Promise.all(promises);
    results.forEach((result) => {
      allCharacters.push(...result.results);
    });

    return allCharacters;
  },

  /**
   * Get a specific character by ID
   */
  getCharacterById: async (id: number): Promise<Character> => {
    const response = await api.get<ApiResponse<Character>>(`/api/characters/${id}`);
    return response.data.data;
  },
};

// Favorites API
export const favoritesApi = {
  /**
   * Get paginated list of favorites
   */
  getFavorites: async (page: number = 1, pageSize: number = 10): Promise<FavoritesResponse> => {
    const response = await api.get<FavoritesResponse>(`/api/favorites`, {
      params: { page, pageSize },
    });
    return response.data;
  },

  /**
   * Get all favorites (all pages)
   */
  getAllFavorites: async (): Promise<CharacterWithId[]> => {
    const allFavorites: CharacterWithId[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await favoritesApi.getFavorites(page, 100); // Use large pageSize to minimize requests
      allFavorites.push(...response.data);
      
      hasMore = response.pagination.page < response.pagination.totalPages;
      page++;
    }

    return allFavorites;
  },

  /**
   * Add a character to favorites
   */
  addFavorite: async (characterId: number): Promise<CharacterWithId> => {
    const payload: AddFavoriteRequest = { character_id: characterId };
    const response = await api.post<ApiResponse<CharacterWithId>>(`/api/favorites`, payload);
    return response.data.data;
  },

  /**
   * Delete a character from favorites
   */
  deleteFavorite: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<{ message: string }>>(`/api/favorites/${id}`);
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<boolean> => {
    try {
      const response = await api.get<ApiResponse<{ message: string; timestamp: string }>>(
        '/health'
      );
      return response.data.success;
    } catch {
      return false;
    }
  },
};

export default api;
