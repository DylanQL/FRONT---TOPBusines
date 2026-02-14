import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import type { CharacterWithId, PaginationInfo } from '../types';

interface FavoritesListProps {
  favorites: CharacterWithId[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onDeleteFavorite: (id: number) => Promise<void>;
  onRetry?: () => void;
}

/**
 * Get border color based on gender
 */
const getGenderBorderColor = (gender: string): string => {
  const normalized = gender.toLowerCase();
  if (normalized === 'male') return '#3b82f6'; // Blue
  if (normalized === 'female') return '#ec4899'; // Pink/Fuchsia
  return '#fbbf24'; // Yellow for others
};

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  loading,
  error,
  pagination,
  onPageChange,
  onDeleteFavorite,
  onRetry,
}) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await onDeleteFavorite(id);
    } catch (error) {
      console.error('Error deleting favorite:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (favorites.length === 0) {
    return <EmptyState message="No tienes personajes favoritos aún" icon="❤️" />;
  }

  return (
    <div className="favorites-container">
      <div className="character-list">
        {favorites.map((favorite) => {
          const borderColor = getGenderBorderColor(favorite.gender);
          const isDeleting = deletingId === favorite.id;
          
          return (
            <div
              key={favorite.id}
              className="character-card"
              style={{
                borderColor: borderColor,
                borderWidth: '3px',
                borderStyle: 'solid',
                opacity: isDeleting ? 0.5 : 1,
              }}
            >
              <div className="character-card-header">
                <h3 className="character-name">{favorite.name}</h3>
                <button
                  onClick={() => handleDelete(favorite.id)}
                  disabled={isDeleting}
                  className="favorite-button favorite-button-active"
                  aria-label="Eliminar de favoritos"
                  title="Eliminar de favoritos"
                >
                  {isDeleting ? '⏳' : '❤️'}
                </button>
              </div>

              <div className="character-details">
                <div className="detail-row">
                  <span className="detail-label">ID SWAPI:</span>
                  <span className="detail-value">{favorite.swapi_id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Género:</span>
                  <span className="detail-value">{favorite.gender}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Altura:</span>
                  <span className="detail-value">{favorite.height} cm</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Masa:</span>
                  <span className="detail-value">{favorite.mass} kg</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Color de cabello:</span>
                  <span className="detail-value">{favorite.hair_color}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Color de piel:</span>
                  <span className="detail-value">{favorite.skin_color}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Color de ojos:</span>
                  <span className="detail-value">{favorite.eye_color}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Año de nacimiento:</span>
                  <span className="detail-value">{favorite.birth_year}</span>
                </div>
                {favorite.created_at && (
                  <div className="detail-row">
                    <span className="detail-label">Agregado:</span>
                    <span className="detail-value">
                      {new Date(favorite.created_at).toLocaleString('es-ES')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
        disabled={loading}
      />
    </div>
  );
};
