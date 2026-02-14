# 🤝 Guía de Contribución

Esta guía describe las mejores prácticas para contribuir al proyecto SEIDOR SWAPI Frontend.

## 📝 Principios de Desarrollo

### 1. **Separación de Responsabilidades**

Cada módulo debe tener una responsabilidad clara:

- **Components**: Solo renderizado UI
- **Hooks**: Lógica de negocio y estado
- **Services**: Comunicación HTTP
- **Types**: Definiciones de tipos

### 2. **TypeScript Strict**

- Evitar `any` - usar tipos específicos
- Definir interfaces para objetos complejos
- Usar tipos de retorno explícitos en funciones

### 3. **Componentes Reutilizables**

Crear componentes genéricos y reutilizables:

```tsx
// ✅ Bueno: Component reutilizable
<ErrorMessage message={error} onRetry={handleRetry} />

// ❌ Malo: Lógica hardcodeada
<div>Error al cargar personajes</div>
```

---

## 🏗 Estructura de Archivos

### Componentes

```tsx
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onAction}>Acción</button>
    </div>
  );
};
```

### Custom Hooks

```tsx
// src/hooks/useMyData.ts
import { useState, useEffect } from 'react';

interface UseMyDataReturn {
  data: MyData[];
  loading: boolean;
  error: string | null;
}

export const useMyData = (): UseMyDataReturn => {
  const [data, setData] = useState<MyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Lógica de carga
  }, []);

  return { data, loading, error };
};
```

### Services

```tsx
// src/services/myApi.ts
import api from './api';
import type { MyData } from '../types';

export const myApi = {
  getData: async (): Promise<MyData[]> => {
    const response = await api.get<MyData[]>('/endpoint');
    return response.data;
  },
};
```

---

## 🎨 Estilos

### Convenciones de CSS

1. **Clases con nombre descriptivo**

```css
/* ✅ Bueno */
.character-card { }
.search-input { }
.favorite-button { }

/* ❌ Malo */
.card { }
.input { }
.btn { }
```

2. **Variables CSS para colores**

```css
:root {
  --color-primary: #fbbf24;
  --color-secondary: #3b82f6;
}

.button {
  background-color: var(--color-primary);
}
```

3. **Mobile-first responsive**

```css
/* Mobile por defecto */
.grid {
  grid-template-columns: 1fr;
}

/* Desktop */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## ✅ Testing

### Patrón de Tests

```tsx
// src/components/__tests__/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" onAction={() => {}} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onAction when button is clicked', () => {
    const handleAction = vi.fn();
    render(<MyComponent title="Test" onAction={handleAction} />);
    
    screen.getByText('Acción').click();
    expect(handleAction).toHaveBeenCalledOnce();
  });
});
```

---

## 🔧 Herramientas de Desarrollo

### ESLint

Ejecutar antes de commit:
```bash
npm run lint
```

### TypeScript

Verificar tipos:
```bash
npx tsc --noEmit
```

### Tests

Ejecutar tests:
```bash
npm run test
```

---

## 📦 Commits

### Formato de Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar búsqueda por género
fix: corregir paginación en favoritos
docs: actualizar README con instrucciones
style: mejorar estilos de tarjetas
refactor: extraer lógica de búsqueda a hook
test: agregar tests para SearchBar
```

### Tipos de Commits

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Estilos (CSS)
- `refactor`: Refactorización de código
- `test`: Tests
- `chore`: Tareas de mantenimiento

---

## 🚀 Pull Requests

### Checklist antes de PR

- [ ] Código sigue las convenciones del proyecto
- [ ] Tests pasan (`npm run test`)
- [ ] ESLint no reporta errores (`npm run lint`)
- [ ] TypeScript compila sin errores
- [ ] Componentes son responsive
- [ ] Se agregaron tests para nuevo código
- [ ] Documentación actualizada

### Template de PR

```markdown
## Descripción
[Describe los cambios realizados]

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se probó?
[Describe los pasos para probar los cambios]

## Screenshots (si aplica)
[Agregar screenshots]
```

---

## 🎯 Mejores Prácticas

### 1. Performance

- Usar `React.memo` para componentes que no cambian frecuentemente
- Usar `useMemo` y `useCallback` cuando sea necesario
- Evitar renders innecesarios

### 2. Accesibilidad

- Usar etiquetas semánticas (`<button>`, `<nav>`, etc.)
- Agregar `aria-label` a elementos interactivos
- Asegurar contraste de colores adecuado

### 3. Manejo de Errores

- Siempre manejar errores de API
- Mostrar mensajes de error claros al usuario
- Proveer opción de reintentar

### 4. Loading States

- Mostrar spinners durante carga
- Deshabilitar botones durante operaciones async
- Dar feedback visual al usuario

---

## 📚 Recursos

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Testing Library](https://testing-library.com/react)

---

<div align="center">

**¡Gracias por contribuir!** 🙏

</div>
