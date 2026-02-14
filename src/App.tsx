import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { CharacterList } from './components/CharacterList';
import { FavoritesList } from './components/FavoritesList';
import { useCharacters } from './hooks/useCharacters';
import { useFavorites } from './hooks/useFavorites';
import type { SearchType } from './types';
import './styles/index.css';

function App() {
  const [activeTab, setActiveTab] = useState<'characters' | 'favorites'>('characters');
  
  // Favorites hook (must be called first to get favoriteIds)
  const {
    favorites,
    loading: favoritesLoading,
    error: favoritesError,
    addFavorite,
    reloadFavorites,
    favoriteIds,
    pagination,
    setPage,
  } = useFavorites();

  // Characters hook (uses favoriteIds to filter out favorites)
  const {
    characters: allCharacters,
    filteredCharacters,
    loading: charactersLoading,
    error: charactersError,
    searchFilters,
    setSearchFilters,
    reloadCharacters,
  } = useCharacters(favoriteIds);

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchFilters({ ...searchFilters, type, query: '' });
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchFilters({ ...searchFilters, query });
  };

  const handleAddToFavorites = async (swapiId: number) => {
    try {
      await addFavorite(swapiId);
      // Reload characters to update the filtered list
      await reloadCharacters();
    } catch (error) {
      // Error is already handled in the hook
      console.error('Failed to add favorite:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>⭐ SEIDOR SWAPI - Star Wars Characters</h1>
        <p className="app-subtitle">Explora y guarda tus personajes favoritos de Star Wars</p>
      </header>

      <div className="app-tabs">
        <button
          className={`tab-button ${activeTab === 'characters' ? 'active' : ''}`}
          onClick={() => setActiveTab('characters')}
        >
          🔍 Buscar Personajes
          {filteredCharacters.length > 0 && (
            <span className="tab-badge">{filteredCharacters.length}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          ❤️ Mis Favoritos
          {pagination.total > 0 && (
            <span className="tab-badge">{pagination.total}</span>
          )}
        </button>
      </div>

      <main className="app-main">
        {activeTab === 'characters' && (
          <div className="characters-section">
            <SearchBar
              searchType={searchFilters.type}
              searchQuery={searchFilters.query}
              onSearchTypeChange={handleSearchTypeChange}
              onSearchQueryChange={handleSearchQueryChange}
              disabled={charactersLoading}
            />

            <div className="results-info">
              {!charactersLoading && (
                <p>
                  {searchFilters.query
                    ? `Mostrando ${filteredCharacters.length} resultado(s)`
                    : `Total de personajes disponibles: ${filteredCharacters.length}`}
                </p>
              )}
            </div>

            <CharacterList
              characters={filteredCharacters}
              allCharacters={allCharacters}
              loading={charactersLoading}
              error={charactersError}
              onAddToFavorites={handleAddToFavorites}
              onRetry={reloadCharacters}
            />
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-section">
            <FavoritesList
              favorites={favorites}
              loading={favoritesLoading}
              error={favoritesError}
              pagination={pagination}
              onPageChange={setPage}
              onRetry={reloadFavorites}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Powered by <a href="https://swapi.py4e.com" target="_blank" rel="noopener noreferrer">SWAPI</a> | 
          Developed for SEIDOR
        </p>
      </footer>
    </div>
  );
}

export default App;
