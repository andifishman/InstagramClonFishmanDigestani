import type { Post } from '../../types.ts'
import './Stories.css'

interface StoriesProps {
  catPosts: Post[]
}

function Stories({ catPosts }: StoriesProps) {

  // slice(0, 8) toma solo los primeros 8 posts para mostrar como stories
  const storyItems: Post[] = catPosts.slice(0, 8)

  return (
    <section className="stories__section">

      <h2 className="stories__title">STORIES</h2>

      <div className="stories__container">

        {storyItems.map((story) => (
          // key={story.id} es obligatorio en React para identificar elementos de una lista
          <div key={story.id} className="story__item">
            <div className="story__ring">
              <img
                src={story.imageUrl}
                alt={`Story de ${story.username}`}
                className="story__image"
                onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/60?img=1' }}
              />
            </div>
            <p className="story__username">@{story.username}</p>
          </div>
        ))}

        {storyItems.length > 0 && (
          <div className="story__more">
            <button className="story__more-btn" title="Ver más stories">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Stories
