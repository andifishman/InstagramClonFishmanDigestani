// Post.jsx — Tarjeta de publicación individual
// Este componente representa una sola publicación en el grid del feed.
// Muestra: imagen del cat (rotada 3°), usuario, botones de acción.
// Es un componente "presentacional": recibe datos y los muestra.
//
// Props que recibe:
//   post        — objeto con todos los datos del post (imagen, likes, username, etc.)
//   onLike      — función del padre para dar/quitar like
//   onOpenPost  — función del padre para abrir el modal con este post

import './Post.css'

// ─────────────────────────────────────────────
// Componente Post
// Props:
//   post (objeto)       — datos del post: id, imageUrl, username, likes, liked, etc.
//   onLike (función)    — llama al padre para cambiar el estado del like
//   onOpenPost (función)— llama al padre para abrir el modal
// ─────────────────────────────────────────────
function Post({ post, onLike, onOpenPost }) {
  return (
    // post__card: tarjeta completa del post con fondo oscuro y bordes redondeados
    <div className="post__card">

      {/* ── Imagen del post ── */}
      {/* Al hacer clic en la imagen, abrimos el modal con este post */}
      <div
        className="post__image-wrapper"
        onClick={() => onOpenPost(post)}
      >
        <img
          src={post.imageUrl}
          alt={`Publicación de ${post.username}`}
          className="post__image"
          // onError: imagen de respaldo si la URL falla
          onError={(e) => {
            e.target.src = 'https://placecats.com/300/300'
          }}
        />
      </div>

      {/* ── Barra inferior del post: usuario y acciones ── */}
      <div className="post__footer">

        {/* Izquierda: avatar pequeño y username */}
        <div className="post__user">
          {/* Avatar circular pequeño del usuario del post */}
          <div className="post__avatar">
            {/* Usamos la primera letra del username como avatar de texto */}
            {post.username.charAt(0).toUpperCase()}
          </div>
          <span className="post__username">@{post.username}</span>
        </div>

        {/* Derecha: botones de acción (like, comentario, compartir) */}
        <div className="post__actions">

          {/* Botón de like: cambia de color cuando está activo (liked=true)
              Llama a onLike con el id del post */}
          <button
            className={`post__action-btn ${post.liked ? 'post__action-btn--liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation() // Evita que el clic propague al wrapper de la imagen
              onLike(post.id)
            }}
            title="Me gusta"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              fill={post.liked ? 'currentColor' : 'none'}
              stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78
                l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Botón de comentario: abre el modal al hacer clic */}
          <button
            className="post__action-btn"
            onClick={(e) => {
              e.stopPropagation()
              onOpenPost(post) // Abrimos el modal para ver los comentarios
            }}
            title="Comentar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>

          {/* Botón de compartir (solo visual) */}
          <button className="post__action-btn" title="Compartir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>

        </div>
      </div>
    </div>
  )
}

export default Post
