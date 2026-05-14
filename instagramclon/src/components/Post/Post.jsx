import './Post.css'

function Post({ post, onLike, onOpenPost }) {
  return (
    <div className="post__card">

      <div className="post__image-wrapper" onClick={() => onOpenPost(post)}>
        <img
          src={post.imageUrl}
          alt={`Publicación de ${post.username}`}
          className="post__image"
          onError={(e) => { e.target.src = 'https://placecats.com/300/300' }}
        />
      </div>

      <div className="post__footer">

        <div className="post__user">
          <div className="post__avatar">
            {/* charAt(0).toUpperCase() usa la primera letra del username como avatar de texto */}
            {post.username.charAt(0).toUpperCase()}
          </div>
          <span className="post__username">@{post.username}</span>
        </div>

        <div className="post__actions">

          <button
            className={`post__action-btn ${post.liked ? 'post__action-btn--liked' : ''}`}
            onClick={(e) => {
              e.stopPropagation() // Evita que el clic se propague al wrapper y abra el modal
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

          <button
            className="post__action-btn"
            onClick={(e) => {
              e.stopPropagation()
              onOpenPost(post)
            }}
            title="Comentar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>

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
