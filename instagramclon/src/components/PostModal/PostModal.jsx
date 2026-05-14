// PostModal.jsx — Modal de publicación individual
// Este componente se renderiza cuando el usuario hace clic en un post.
// Muestra una vista expandida con:
//   - Imagen grande del cat (lado izquierdo)
//   - Información del post (lado derecho):
//       * Usuario, fecha, caption
//       * Comentarios simulados
//       * Botones de like, comentar, compartir
//       * Input para agregar comentario (solo visual)
//
// Por qué existe un modal separado:
//   Ver una publicación completa necesita mucho espacio y datos que
//   el Post card no tiene. Separarlo mantiene Post simple y liviano.
//
// Props que recibe:
//   post    — objeto con todos los datos del post
//   onClose — función para cerrar el modal
//   onLike  — función para dar/quitar like

import { mockComments } from '../../data/userData.js'
import './PostModal.css'

// ─────────────────────────────────────────────
// Componente PostModal
// Props:
//   post (objeto)     — datos del post seleccionado
//   onClose (función) — cierra el modal (limpia selectedPost en App)
//   onLike (función)  — actualiza el like en el array de posts de App
// ─────────────────────────────────────────────
function PostModal({ post, onClose, onLike }) {

  // Función que maneja el clic en el backdrop (área oscura alrededor del modal)
  // Si el usuario hace clic fuera del modal, lo cerramos
  const handleBackdropClick = (e) => {
    // e.target es el elemento que recibió el clic
    // e.currentTarget es el backdrop mismo
    // Si coinciden, el clic fue en el backdrop y no en el contenido del modal
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    // modal__backdrop: capa oscura semitransparente detrás del modal
    // Al hacer clic aquí se cierra el modal
    <div className="modal__backdrop" onClick={handleBackdropClick}>

      {/* modal__container: caja del modal (dividida en dos columnas) */}
      <div className="modal__container">

        {/* ── Columna izquierda: Imagen ── */}
        <div className="modal__image-side">
          <img
            src={post.imageUrl}
            alt={`Post de ${post.username}`}
            className="modal__image"
            onError={(e) => { e.target.src = 'https://placecats.com/600/600' }}
          />
        </div>

        {/* ── Columna derecha: Información del post ── */}
        <div className="modal__info-side">

          {/* Header del modal: avatar, username, fecha y botón de cierre */}
          <div className="modal__header">
            <div className="modal__user">
              {/* Avatar circular con la primera letra del username */}
              <div className="modal__user-avatar">
                {post.username.charAt(0).toUpperCase()}
              </div>
              <div className="modal__user-info">
                <span className="modal__username">@{post.username}</span>
                <span className="modal__date">{post.date} ago</span>
              </div>
            </div>

            {/* Botón X para cerrar el modal */}
            <button className="modal__close-btn" onClick={onClose} title="Cerrar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Línea divisoria */}
          <div className="modal__divider" />

          {/* Área de comentarios + caption con scroll */}
          <div className="modal__content-scroll">

            {/* Caption del post (texto de la publicación) */}
            <div className="modal__caption">
              <span className="modal__caption-user">@{post.username}</span>
              <span className="modal__caption-text"> {post.caption}</span>
            </div>

            {/* Lista de comentarios simulados
                Siempre mostramos los mismos mockComments (es una simulación) */}
            <div className="modal__comments">
              {mockComments.map((comment) => (
                // key={comment.id} identifica cada comentario para React
                <div key={comment.id} className="modal__comment">
                  <span className="modal__comment-user">@{comment.username}</span>
                  <span className="modal__comment-text"> {comment.text}</span>
                  <span className="modal__comment-time">{comment.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Línea divisoria antes de los botones */}
          <div className="modal__divider" />

          {/* Área de acciones: like, comentar, compartir + contador de likes */}
          <div className="modal__actions">
            <div className="modal__action-buttons">

              {/* Botón de like: cambia de color si está likeado */}
              <button
                className={`modal__action-btn ${post.liked ? 'modal__action-btn--liked' : ''}`}
                onClick={() => onLike(post.id)}
                title="Me gusta"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  fill={post.liked ? 'currentColor' : 'none'}
                  stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78
                    7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              {/* Botón de comentar (solo visual) */}
              <button className="modal__action-btn" title="Comentar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>

              {/* Botón de compartir (solo visual) */}
              <button className="modal__action-btn" title="Compartir">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>

            {/* Contador de likes */}
            <p className="modal__likes-count">
              {post.likes.toLocaleString()} likes
            </p>
          </div>

          {/* Línea divisoria antes del input */}
          <div className="modal__divider" />

          {/* Input para agregar un comentario (solo visual, no tiene funcionalidad real) */}
          <div className="modal__add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              className="modal__comment-input"
            />
            <button className="modal__post-btn">Post</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PostModal
