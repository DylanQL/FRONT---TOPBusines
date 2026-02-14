# SEIDOR SWAPI - Frontend React Application

<div align="center">

⭐ **Aplicación Frontend para consumir SWAPI (Star Wars API)** ⭐

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-purple.svg)](https://vitejs.dev/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Deploy](#-deploy)

---

## 🚀 Descripción

Esta aplicación React + TypeScript permite explorar personajes de Star Wars mediante el consumo de la API backend SEIDOR SWAPI. Los usuarios pueden buscar personajes, visualizar información detallada y guardar sus favoritos.

### Características principales:
- ✅ Búsqueda avanzada por nombre o ID
- ✅ Carga completa de todos los personajes (9 páginas de SWAPI)
- ✅ Sistema de favoritos con persistencia en MySQL
- ✅ Paginación en favoritos
- ✅ Bordes de tarjetas por género (azul: male, rosa: female, amarillo: otros)
- ✅ Manejo robusto de estados: loading, error, empty state
- ✅ TypeScript para type safety
- ✅ Arquitectura escalable y mantenible

---

## ✨ Características

### Funcionalidades implementadas:

1. **Búsqueda Global**
   - Búsqueda por nombre (búsqueda parcial)
   - Búsqueda por ID de SWAPI
   - Filtrado en tiempo real

2. **Gestión de Favoritos**
   - Agregar personajes a favoritos con un clic
   - Ver listado paginado de favoritos
   - Los personajes favoritos no aparecen en la búsqueda

3. **UI/UX**
   - Bordes de color según género del personaje
   - Diseño responsive (mobile, tablet, desktop)
   - Iconos y feedback visual claro
   - Tabs para alternar entre búsqueda y favoritos

4. **Estados de la aplicación**
   - Loading spinner durante carga
   - Mensajes de error con opción de reintentar
   - Empty states cuando no hay resultados

---

## 🛠 Tecnologías

- **React 18** - Biblioteca principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool (más rápido que Create React App)
- **Axios** - Cliente HTTP para consumir API
- **CSS3** - Estilos personalizados
- **Vitest** - Framework de testing (configurado)
- **React Testing Library** - Testing de componentes

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.x
- **npm** >= 9.x o **yarn** >= 1.22
- **Backend SEIDOR SWAPI** ejecutándose en `http://localhost:3000`

---

## 💻 Instalación

### 1. Clonar el repositorio (o navegar a la carpeta del proyecto)

```bash
cd "/home/spikemm/Descargas/FRONT - SEIDOR"
```

### 2. Instalar dependencias

```bash
npm install
```

O con yarn:

```bash
yarn install
```

---

## ⚙️ Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto (puedes copiar `.env.example`):

```bash
cp .env.example .env
```

Contenido del archivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

> **Nota**: Asegúrate de que el backend esté corriendo en el puerto 3000, o ajusta la URL según corresponda.

---

## 🚀 Ejecución

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### Build para producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`.

### Preview del build

```bash
npm run preview
```

---

## 🧪 Testing

### Ejecutar tests

```bash
npm run test
```

### Ejecutar tests en modo watch

```bash
npm run test -- --watch
```

### Coverage de tests

```bash
npm run test -- --coverage
```

---

## 📁 Estructura del Proyecto

```
FRONT - SEIDOR/
├── index.html                  # Entrada HTML
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración TypeScript
├── vite.config.ts             # Configuración Vite
├── .env.example               # Ejemplo de variables de entorno
├── .gitignore                 # Archivos ignorados por Git
├── README.md                  # Este archivo
│
└── src/
    ├── main.tsx               # Entrada de la aplicación
    ├── App.tsx                # Componente principal
    │
    ├── types/
    │   └── index.ts           # Tipos TypeScript (interfaces, types)
    │
    ├── services/
    │   └── api.ts             # Capa de servicios API (axios)
    │
    ├── hooks/
    │   ├── useCharacters.ts   # Hook para manejar personajes
    │   └── useFavorites.ts    # Hook para manejar favoritos
    │
    ├── components/
    │   ├── LoadingSpinner.tsx
    │   ├── ErrorMessage.tsx
    │   ├── EmptyState.tsx
    │   ├── Pagination.tsx
    │   ├── SearchBar.tsx
    │   ├── CharacterCard.tsx
    │   ├── CharacterList.tsx
    │   └── FavoritesList.tsx
    │
    └── styles/
        └── index.css          # Estilos globales y componentes
```

---

## 🎯 Funcionalidades Principales

### 1. Búsqueda de Personajes

- Al cargar la app, se obtienen **todos los personajes** de las 9 páginas de SWAPI
- Dos modos de búsqueda:
  - **Por nombre**: búsqueda parcial (ej: "luke" encuentra "Luke Skywalker")
  - **Por ID**: búsqueda exacta del ID de SWAPI (1-87)
- Los personajes ya agregados a favoritos **no se muestran** en la búsqueda
- **Paginación**: 10 personajes por página (coincide con SWAPI) - total de 9 páginas

### 2. Agregar a Favoritos

- Botón de corazón (🤍) en cada tarjeta de personaje
- Al hacer clic:
  - Se envía `POST /api/favorites` con el `character_id`
  - El personaje desaparece de la lista de búsqueda
  - Aparece en la sección "Mis Favoritos"

### 3. Visualización de Favoritos

- Tab dedicado para ver favoritos
- Paginación configurada (10 por página, ajustable)
- Muestra:
  - Información completa del personaje
  - Fecha de cuando se agregó a favoritos
  - Indicador visual de favorito (❤️)

### 4. Paginación

- **Lista de personajes**: 10 personajes por página (9 páginas para 87 personajes)
- **Lista de favoritos**: 10 favoritos por página
- Navegación entre páginas con números
- Se reset automáticamente al cambiar filtros de búsqueda
- Indicadores visuales de página actual
- Coincide con la paginación de SWAPI

### 5. Bordes de Género

Los bordes de las tarjetas cambian según el género:

- **Male (masculino)**: Borde azul (`#3b82f6`)
- **Female (femenino)**: Borde rosa/fucsia (`#ec4899`)
- **Otros** (none, unknown, n/a): Borde amarillo (`#fbbf24`)

---

## 🧠 Decisiones Técnicas

### ¿Por qué Vite en lugar de Create React App?

- **Más rápido**: Hot Module Replacement (HMR) instantáneo
- **Mejor DX**: Tiempos de build reducidos
- **Moderno**: Usa ES modules nativos
- **Configuración simple**: Menos boilerplate

### Arquitectura de carpetas

Se utilizó una estructura por **feature/tipo**:
- `/services`: Lógica de comunicación con API
- `/hooks`: Custom hooks reutilizables
- `/components`: Componentes UI reutilizables
- `/types`: Definiciones TypeScript centralizadas

Esto facilita:
- 📦 **Escalabilidad**: Fácil agregar nuevas features
- 🧪 **Testing**: Componentes y lógica separados
- 🔍 **Mantenibilidad**: Código organizado y predecible

### Custom Hooks

Se crearon dos hooks principales:

1. **`useCharacters`**
   - Maneja la carga de todos los personajes
   - Filtra según búsqueda y favoritos
   - Retorna estados: loading, error, data

2. **`useFavorites`**
   - Gestiona favoritos paginados
   - Mantiene lista de IDs de favoritos para filtrado
   - Maneja agregar favoritos con estados

### Manejo de IDs

SWAPI no retorna IDs en el listado de personajes. Solución:
- Los personajes se cargan en orden (páginas 1-9)
- El índice del array + 1 = SWAPI ID
- Este ID se usa para agregar a favoritos

### Separación de responsabilidades

- **Componentes**: Solo renderizado y UI
- **Hooks**: Lógica de negocio y estado
- **Services**: Comunicación HTTP
- **Types**: Contratos de datos

---

## 🌐 Deploy

### Opciones de deploy recomendadas:

#### 1. Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

#### 2. Netlify

```bash
npm run build
# Subir carpeta dist/ a Netlify
```

#### 3. AWS S3 + CloudFront

```bash
npm run build
# Subir dist/ a S3
# Configurar CloudFront distribution
```

### Variables de entorno en producción

Asegúrate de configurar la variable:

```
VITE_API_BASE_URL=https://api.seidor.com
```

---

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Preview del build de producción |
| `npm run test` | Ejecuta tests con Vitest |
| `npm run lint` | Ejecuta ESLint |

---

## 🐛 Solución de Problemas

### El backend no está disponible

**Error**: `Network Error` o `502 Bad Gateway`

**Solución**:
1. Verifica que el backend esté corriendo: `http://localhost:3000/health`
2. Revisa el archivo `.env` y confirma la URL correcta
3. Verifica que el backend no tenga CORS habilitado incorrectamente

### Los personajes no se filtran correctamente

**Solución**:
- Espera a que termine la carga inicial (todos los personajes)
- Verifica que los favoritos se estén cargando correctamente
- Revisa la consola del navegador para errores

### Errores de TypeScript

```bash
# Limpiar cache y reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 👨‍💻 Autor

Desarrollado para **SEIDOR** - Prueba Técnica Frontend

---

## 📄 Licencia

Este proyecto es privado y fue creado con fines de evaluación técnica.

---

## 🙏 Agradecimientos

- [SWAPI](https://swapi.py4e.com/) - The Star Wars API
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

<div align="center">

⭐ **May the Force be with you!** ⭐

</div>
