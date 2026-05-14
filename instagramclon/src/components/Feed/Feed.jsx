// Feed.jsx — Área principal del feed (inicio)
// Este componente organiza y muestra:
//   1. La sección de Stories (historias)
//   2. El título "TRENDING"
//   3. El grid de publicaciones estilo masonry
//
// Recibe todos los posts de App y los distribuye a los componentes hijos.
//
// Props que recibe:
//   catPosts   — array de posts con imágenes de cats
//   isLoading  — booleano: true mientras se cargan los datos de la API
//   onLike     — función para dar/quitar like a un post
//   onOpenPost — función para abrir el modal de un post

import Stories from '../Stories/Stories.jsx'
import Post    from '../Post/Post.jsx'
import './Feed.css'

// ─────────────────────────────────────────────
// Componente Feed
// Props:
//   catPosts (array)    — todos los posts con imágenes de cats
//   isLoading (boolean) — indica si se están cargando los datos
//   onLike (función)    — pasa el like hacia arriba a App
//   onOpenPost (función)— pasa el open modal hacia arriba a App
// ─────────────────────────────────────────────
function Feed({ catPosts, isLoading, onLike, onOpenPost }) {

  // ── Renderizado de carga ───────────────────────────────────────────
  // Si todavía se están cargando los datos, mostramos un spinner
  if (isLoading) {
    return (
      <div className="feed__loading">
        {/* Spinner animado (solo CSS, sin librerías) */}
        <div className="feed__spinner"></div>
        <p className="feed__loading-text">Loading cat posts...</p>
      </div>
    )
  }

  // ── Renderizado normal ─────────────────────────────────────────────
  return (
    <div className="feed__container">

      {/* Sección de Stories: pasamos todos los posts, Stories toma los primeros 8 */}
      <Stories catPosts={catPosts} />

      {/* Título de la sección trending */}
      <h2 className="feed__trending-title">TRENDING</h2>

      {/* Grid de publicaciones estilo masonry (columnas CSS)
          Cada Post es una tarjeta con imagen y acciones */}
      <div className="feed__grid">
        {catPosts.map((post) => (
          // Post recibe el objeto post completo y las funciones del padre
          // key={post.id} es obligatorio para listas en React
          <Post
            key={post.id}
            post={post}
            onLike={onLike}
            onOpenPost={onOpenPost}
          />
        ))}
      </div>

      {/* Si no hay posts y ya terminó de cargar, mostramos un mensaje */}
      {!isLoading && catPosts.length === 0 && (
        <div className="feed__empty">
          <p>No se pudieron cargar los posts. Verificá tu conexión a internet.</p>
        </div>
      )}

    </div>
  )
}

export default Feed
