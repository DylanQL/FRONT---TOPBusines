import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';

describe('LoadingSpinner', () => {
  it('renders loading message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState message="No hay datos" />);
    expect(screen.getByText('No hay datos')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<EmptyState message="Test" icon="🎉" />);
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });
});

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Error de prueba" />);
    expect(screen.getByText('Error de prueba')).toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    const onRetry = () => {};
    render(<ErrorMessage message="Error" onRetry={onRetry} />);
    expect(screen.getByText('Reintentar')).toBeInTheDocument();
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByText('Reintentar')).not.toBeInTheDocument();
  });
});
