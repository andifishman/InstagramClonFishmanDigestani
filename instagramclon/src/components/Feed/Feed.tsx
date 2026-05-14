import type { Post } from '../../types.ts'
import Stories from '../Stories/Stories.tsx'
import PostCard from '../Post/Post.tsx'
import './Feed.css'

interface FeedProps {
  catPosts: Post[]
  isLoading: boolean
  onLike: (postId: string) => void
  onOpenPost: (post: Post) => void
}

function Feed({ catPosts, isLoading, onLike, onOpenPost }: FeedProps) {

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
          <PostCard
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
