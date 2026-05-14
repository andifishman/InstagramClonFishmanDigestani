# Instagram Clone — Trabajo Práctico React

Clon de Instagram construido con React que consume imágenes reales de cats desde una API externa.

---

## Instalación y ejecución

```bash
# 1. Entrar a la carpeta del proyecto
cd instagramclon

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Header/          → Barra superior: logo, buscador, botones
│   ├── Sidebar/         → Panel lateral: perfil y navegación
│   ├── Stories/         → Fila de historias circulares
│   ├── Feed/            → Grid masonry de publicaciones
│   ├── Post/            → Tarjeta individual de publicación
│   ├── PostModal/       → Modal con detalle del post
│   └── Profile/         → Vista de perfil del usuario
│
├── services/
│   └── catApi.js        → Llamadas HTTP a The Cat API con Axios
│
├── data/
│   └── userData.js      → Datos simulados del usuario, captions y comentarios
│
├── App.jsx              → Componente raíz: estados globales y navegación
├── App.css              → Layout principal (flex: sidebar + main)
├── index.css            → Estilos base globales
└── main.jsx             → Punto de entrada de la aplicación
```

---

## Componentes

### `Header`
Barra fija en la parte superior. Muestra el logo de Instagram, una barra de búsqueda y los iconos de acción (configuración, cámara, mensajes). Incluye el botón **"New Post"** con gradiente rosa.

**Props:** `onNavigate` — función para cambiar de vista.

---

### `Sidebar`
Panel lateral izquierdo. Muestra la foto de perfil con borde gradiente, el nombre del usuario, sus estadísticas, y el menú de navegación (Home, Explore, Reels, iGTV, Notification). El ítem activo tiene un borde rosa a la izquierda.

**Props:** `userData`, `currentView`, `onNavigate`

---

### `Stories`
Fila horizontal de círculos con fotos de cats. Usa los primeros 8 posts del feed como avatares de historias. Tiene scroll horizontal oculto.

**Props:** `catPosts`

---

### `Feed`
Contenedor del área principal. Renderiza `Stories` y el grid masonry de `Post`. Muestra un spinner mientras se cargan los datos y un mensaje de error si la API falla.

**Props:** `catPosts`, `isLoading`, `onLike`, `onOpenPost`

---

### `Post`
Tarjeta individual de publicación en el grid. Muestra la imagen del cat (rotada -3°), el avatar y username del usuario, y los botones de like, comentar y compartir.

**Props:** `post`, `onLike`, `onOpenPost`

---

### `PostModal`
Modal que se abre al hacer clic en un post. Muestra:
- Imagen ampliada (columna izquierda)
- Username, fecha, caption, comentarios simulados (columna derecha)
- Botones de like, comentar, compartir
- Contador de likes
- Input para agregar comentarios (solo visual)

Se cierra al hacer clic en el fondo oscuro o en el botón X.

**Props:** `post`, `onClose`, `onLike`

---

### `Profile`
Vista de perfil sin login. Muestra la foto grande con borde gradiente, el nombre con verificación, bio, estadísticas (posts/followers/likes) y un grid cuadrado de 3 columnas con todos los posts. Al hacer hover en una imagen aparece el contador de likes.

**Props:** `userData`, `catPosts`, `onOpenPost`

---

## Props más importantes

| Componente | Prop        | Tipo     | Descripción                              |
|------------|-------------|----------|------------------------------------------|
| App        | —           | —        | Maneja todos los estados globales        |
| Header     | onNavigate  | función  | Cambia entre feed y profile              |
| Sidebar    | userData    | objeto   | Datos del usuario (nombre, foto, etc.)   |
| Sidebar    | currentView | string   | Vista activa para resaltar nav ítem      |
| Feed       | catPosts    | array    | Posts con imágenes de cats               |
| Feed       | isLoading   | boolean  | Muestra spinner mientras carga           |
| Post       | post        | objeto   | Datos de la publicación                  |
| Post       | onLike      | función  | Da o quita like al post                  |
| PostModal  | post        | objeto   | Post seleccionado para mostrar           |
| PostModal  | onClose     | función  | Cierra el modal                          |

---

## Hooks utilizados

### `useState`
Se usa en `App.jsx` para manejar:
- `catPosts` — array de publicaciones con imágenes de cats
- `currentView` — vista activa: `'feed'` o `'profile'`
- `selectedPost` — post clickeado para el modal
- `isModalOpen` — si el modal está visible
- `isLoading` — si la API está cargando

En `PostModal.jsx` para:
- `newComment` — texto del input de comentario

### `useEffect`
Se usa en `App.jsx` con un array vacío `[]` para:
- Ejecutarse **una sola vez** al montar el componente
- Llamar a la API de cats y cargar los posts
- Transformar la respuesta en objetos de post con datos simulados

---

## API utilizada

**The Cat API** — [https://api.thecatapi.com](https://api.thecatapi.com)

Es una API pública y gratuita que devuelve imágenes reales de cats.

### Endpoint usado
```
GET https://api.thecatapi.com/v1/images/search?limit=15&size=med
```

### Respuesta de ejemplo
```json
[
  {
    "id": "abc123",
    "url": "https://cdn2.thecatapi.com/images/abc123.jpg",
    "width": 600,
    "height": 400
  }
]
```

### Cómo se usa con Axios
```js
// services/catApi.js
const response = await axios.get(CAT_API_BASE_URL, {
  params: { limit: 15, size: 'med' }
})
return response.data // Array de imágenes
```

---

## Diseño

El diseño replica el Figma de referencia con:
- Fondo oscuro navy (`#080d1a`)
- Sidebar con perfil y navegación a la izquierda
- Header fijo con logo de Instagram, buscador y botón "New Post"
- Stories con bordes gradiente estilo Instagram
- Grid masonry de publicaciones (CSS columns)
- Modal de dos columnas para ver cada post
- **Todas las imágenes rotadas -3 grados** (`transform: rotate(-3deg)`)

---

## Estados utilizados

| Estado       | Tipo    | Dónde    | Para qué                                    |
|--------------|---------|----------|---------------------------------------------|
| catPosts     | array   | App.jsx  | Guarda todos los posts del feed             |
| currentView  | string  | App.jsx  | Controla qué vista se muestra               |
| selectedPost | objeto  | App.jsx  | El post clickeado para el modal             |
| isModalOpen  | boolean | App.jsx  | Si el modal está abierto                    |
| isLoading    | boolean | App.jsx  | Muestra spinner mientras carga la API       |
| newComment   | string  | Modal    | Texto del input de comentarios              |

---

## Funcionalidades implementadas

- Consumo de imágenes de cats desde API con Axios
- Grid masonry de publicaciones dinámicas
- Sistema de likes con contador
- Modal de detalle con imagen, caption, comentarios simulados
- Navegación entre Feed y Perfil
- Perfil emulado sin login
- Stories horizontales con scroll
- Imágenes rotadas -3 grados con efecto hover que las endereza
- Spinner de carga mientras se obtienen los datos
- Diseño dark mode responsivo

---

## Tecnologías

- **React** — librería de UI
- **Vite** — bundler y servidor de desarrollo
- **Axios** — cliente HTTP para la API
- **CSS puro** — sin frameworks de estilos
- **The Cat API** — API de imágenes de cats
