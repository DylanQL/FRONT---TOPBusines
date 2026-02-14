import React from 'react';
import type { SearchType } from '../types';

interface SearchBarProps {
  searchType: SearchType;
  searchQuery: string;
  onSearchTypeChange: (type: SearchType) => void;
  onSearchQueryChange: (query: string) => void;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchType,
  searchQuery,
  onSearchTypeChange,
  onSearchQueryChange,
  disabled = false,
}) => {
  return (
    <div className="search-bar">
      <div className="search-type-selector">
        <label>
          <input
            type="radio"
            value="name"
            checked={searchType === 'name'}
            onChange={(e) => onSearchTypeChange(e.target.value as SearchType)}
            disabled={disabled}
          />
          Buscar por Nombre
        </label>
        <label>
          <input
            type="radio"
            value="id"
            checked={searchType === 'id'}
            onChange={(e) => onSearchTypeChange(e.target.value as SearchType)}
            disabled={disabled}
          />
          Buscar por ID
        </label>
      </div>

      <div className="search-input-container">
        <input
          type={searchType === 'id' ? 'number' : 'text'}
          placeholder={
            searchType === 'name'
              ? 'Escribe el nombre del personaje...'
              : 'Escribe el ID del personaje...'
          }
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          disabled={disabled}
          className="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchQueryChange('')}
            className="clear-button"
            disabled={disabled}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
