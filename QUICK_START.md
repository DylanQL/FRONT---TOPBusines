# ⚡ GUÍA DE INICIO RÁPIDO

Esta guía te ayudará a poner en marcha la aplicación en menos de 5 minutos.

## 📋 Pre-requisitos

✅ Node.js >= 18.x instalado  
✅ Backend SEIDOR SWAPI corriendo en `http://localhost:3000`

## 🚀 Pasos de Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Verifica que el contenido sea:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 3. Iniciar la aplicación

```bash
npm run dev
```

### 4. Abrir en el navegador

Navega a: **http://localhost:5173**

---

## ✅ Verificación

### Verifica que el backend esté funcionando

Abre en tu navegador: http://localhost:3000/health

Deberías ver:
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "..."
}
```

### Verifica que puedas ver personajes

1. Ve a la tab "🔍 Buscar Personajes"
2. Espera a que carguen todos los personajes (puede tardar unos segundos)
3. Deberías ver una lista de personajes de Star Wars con paginación (10 por página, 9 páginas totales)
4. Usa los botones de paginación para navegar entre páginas (verás páginas 1-9)

### Verifica que puedas agregar favoritos

1. Haz clic en el corazón blanco (🤍) de cualquier personaje
2. El personaje debería desaparecer de la lista de búsqueda
3. Ve a la tab "❤️ Mis Favoritos"
4. Deberías ver el personaje agregado con un corazón rojo

### Verifica que puedas eliminar favoritos

1. En la tab "❤️ Mis Favoritos"
2. Haz clic en el corazón rojo (❤️) de cualquier personaje favorito
3. El personaje debería desaparecer de favoritos
4. Regresa a "Buscar Personajes" y el personaje debería aparecer nuevamente

---

## 🎨 Características Visuales

### Bordes de Género

Los bordes de las tarjetas cambian según el género:

- 🔵 **Azul**: Personajes masculinos (male)
- 💖 **Rosa**: Personajes femeninos (female)
- 💛 **Amarillo**: Otros (unknown, n/a, none)

---

## 🔍 Cómo Usar la Búsqueda

### Buscar por Nombre

1. Selecciona "Buscar por Nombre"
2. Escribe cualquier parte del nombre (ej: "luke", "vader", "leia")
3. Los resultados se filtran en tiempo real

### Buscar por ID

1. Selecciona "Buscar por ID"
2. Escribe el número de ID de SWAPI (1-87)
3. Se mostrará solo ese personaje

---

## 🐛 Problemas Comunes

### ❌ Error: "Network Error"

**Causa**: El backend no está corriendo o la URL es incorrecta.

**Solución**:
```bash
# Verifica que el backend esté corriendo
curl http://localhost:3000/health

# Si no funciona, inicia el backend
```

### ❌ La página está en blanco

**Causa**: Puede haber un error en la consola del navegador.

**Solución**:
1. Abre Chrome DevTools (F12)
2. Ve a la tab "Console"
3. Verifica si hay errores en rojo
4. Reporta el error si persiste

### ❌ Los personajes no se cargan

**Causa**: El backend puede estar caído o SWAPI puede estar lento.

**Solución**:
1. Espera unos segundos (cargar 9 páginas toma tiempo)
2. Si sigue sin funcionar, recarga la página (F5)
3. Verifica la conexión del backend

---

## 📚 Próximos Pasos

- Lee el [README.md](./README.md) completo para documentación detallada
- Explora el código en `src/` para entender la arquitectura
- Ejecuta los tests: `npm run test`
- Genera un build de producción: `npm run build`

---

## 💡 Tips

- **Recarga automática**: Vite recarga automáticamente al editar código
- **TypeScript**: Usa VS Code para aprovechar el autocompletado
- **DevTools**: Instala React DevTools para debugging
- **Favoritos**: Los favoritos se guardan en la base de datos MySQL

---

<div align="center">

**¿Listo? ¡Que la Fuerza te acompañe!** 🚀

</div>
