import React from 'react';
import { CharacterCard } from './CharacterCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { EmptyState } from './EmptyState';
import type { Character } from '../types';

interface CharacterListProps {
  characters: Character[];
  allCharacters: Character[]; // Needed to calculate correct character indices
  loading: boolean;
  error: string | null;
  onAddToFavorites: (swapiId: number) => Promise<void>;
  onRetry?: () => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  allCharacters,
  loading,
  error,
  onAddToFavorites,
  onRetry,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (characters.length === 0) {
    return <EmptyState message="No se encontraron personajes" icon="🔍" />;
  }

  return (
    <div className="character-list">
      {characters.map((character) => {
        // Find the original index in allCharacters to get correct SWAPI ID
        const characterIndex = allCharacters.findIndex((c) => c.name === character.name);
        
        return (
          <CharacterCard
            key={`${character.name}-${characterIndex}`}
            character={character}
            characterIndex={characterIndex}
            onAddToFavorites={onAddToFavorites}
            showFavoriteButton={true}
            isFavorite={false}
          />
        );
      })}
    </div>
  );
};
