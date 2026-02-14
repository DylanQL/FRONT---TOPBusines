export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface CharacterWithId extends Character {
  id: number;
  swapi_id: number;
  created_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface FavoritesResponse {
  success: true;
  data: CharacterWithId[];
  pagination: PaginationInfo;
}

export interface AddFavoriteRequest {
  character_id: number;
}

export type SearchType = 'name' | 'id';

export interface SearchFilters {
  type: SearchType;
  query: string;
}
