import React, { useState } from 'react';
import type { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  characterIndex: number; // Index in the all-characters array (used to calculate SWAPI ID)
  onAddToFavorites: (swapiId: number) => Promise<void>;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
}

/**
 * Get border color based on gender
 */
const getGenderBorderColor = (gender: string): string => {
  const normalized = gender.toLowerCase();
  if (normalized === 'male') return '#3b82f6'; // Blue
  if (normalized === 'female') return '#ec4899'; // Pink/Fuchsia
  return '#fbbf24'; // Yellow for others (none, unknown, etc.)
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  characterIndex,
  onAddToFavorites,
  showFavoriteButton = true,
  isFavorite = false,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const swapiId = characterIndex + 1; // SWAPI IDs are 1-indexed
  const borderColor = getGenderBorderColor(character.gender);

  const handleAddToFavorites = async () => {
    setIsAdding(true);
    try {
      await onAddToFavorites(swapiId);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="character-card"
      style={{
        borderColor: borderColor,
        borderWidth: '3px',
        borderStyle: 'solid',
      }}
    >
      <div className="character-card-header">
        <h3 className="character-name">{character.name}</h3>
        {showFavoriteButton && !isFavorite && (
          <button
            onClick={handleAddToFavorites}
            disabled={isAdding}
            className="favorite-button"
            aria-label="Agregar a favoritos"
            title="Agregar a favoritos"
          >
            {isAdding ? '⏳' : '🤍'}
          </button>
        )}
        {isFavorite && (
          <span className="favorite-indicator" aria-label="Favorito">
            ❤️
          </span>
        )}
      </div>

      <div className="character-details">
        <div className="detail-row">
          <span className="detail-label">ID SWAPI:</span>
          <span className="detail-value">{swapiId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Género:</span>
          <span className="detail-value">{character.gender}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Altura:</span>
          <span className="detail-value">{character.height} cm</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Masa:</span>
          <span className="detail-value">{character.mass} kg</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Color de cabello:</span>
          <span className="detail-value">{character.hair_color}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Color de piel:</span>
          <span className="detail-value">{character.skin_color}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Color de ojos:</span>
          <span className="detail-value">{character.eye_color}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Año de nacimiento:</span>
          <span className="detail-value">{character.birth_year}</span>
        </div>
      </div>
    </div>
  );
};
