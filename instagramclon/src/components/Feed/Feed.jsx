import Stories from '../Stories/Stories.jsx'
import Post    from '../Post/Post.jsx'
import './Feed.css'

function Feed({ catPosts, isLoading, onLike, onOpenPost }) {

  if (isLoading) {
    return (
      <div className="feed__loading">
        <div className="feed__spinner"></div>
        <p className="feed__loading-text">Loading cat posts...</p>
      </div>
    )
  }

  return (
    <div className="feed__container">

      <Stories catPosts={catPosts} />

      <h2 className="feed__trending-title">TRENDING</h2>

      <div className="feed__grid">
        {catPosts.map((post) => (
          // key={post.id} es obligatorio para listas renderizadas con .map()
          <Post
            key={post.id}
            post={post}
            onLike={onLike}
            onOpenPost={onOpenPost}
          />
        ))}
      </div>

      {!isLoading && catPosts.length === 0 && (
        <div className="feed__empty">
          <p>No se pudieron cargar los posts. Verificá tu conexión a internet.</p>
        </div>
      )}

    </div>
  )
}

export default Feed
