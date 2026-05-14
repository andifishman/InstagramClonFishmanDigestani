import type { Post } from '../../types.ts'
import { mockComments } from '../../data/userData.ts'
import './PostModal.css'

interface PostModalProps {
  post: Post
  onClose: () => void
  onLike: (postId: string) => void
}

function PostModal({ post, onClose, onLike }: PostModalProps) {

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Si e.target === e.currentTarget, el clic fue en el backdrop y no en el modal
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal__backdrop" onClick={handleBackdropClick}>

      <div className="modal__container">

        <div className="modal__image-side">
          <img
            src={post.imageUrl}
            alt={`Post de ${post.username}`}
            className="modal__image"
            onError={(e) => { e.currentTarget.src = 'https://placecats.com/600/600' }}
          />
        </div>

        <div className="modal__info-side">

          <div className="modal__header">
            <div className="modal__user">
              <div className="modal__user-avatar">
                {post.username.charAt(0).toUpperCase()}
              </div>
              <div className="modal__user-info">
                <span className="modal__username">@{post.username}</span>
                <span className="modal__date">{post.date} ago</span>
              </div>
            </div>

            <button className="modal__close-btn" onClick={onClose} title="Cerrar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="modal__divider" />

          <div className="modal__content-scroll">

            <div className="modal__caption">
              <span className="modal__caption-user">@{post.username}</span>
              <span className="modal__caption-text"> {post.caption}</span>
            </div>

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

          <div className="modal__divider" />

          <div className="modal__actions">
            <div className="modal__action-buttons">

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

              <button className="modal__action-btn" title="Comentar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>

              <button className="modal__action-btn" title="Compartir">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>

            <p className="modal__likes-count">
              {post.likes.toLocaleString()} likes
            </p>
          </div>

          <div className="modal__divider" />

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
