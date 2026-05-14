// Stories.jsx — Sección de historias (Stories)
// Muestra una fila horizontal de circles con imágenes de cats.
// Cada "story" simula la historia de un usuario diferente.
// Las imágenes se muestran en círculos con un borde de gradiente colorido.
//
// Props que recibe:
//   catPosts — array de posts con imágenes de cats para usar como avatares de stories

import './Stories.css'

// ─────────────────────────────────────────────
// Componente Stories
// Props:
//   catPosts (array) — posts de cats, usamos los primeros 8 como stories
// ─────────────────────────────────────────────
function Stories({ catPosts }) {

  // Tomamos solo los primeros 8 posts para las stories
  // Si hay menos de 8 posts (mientras carga), mostramos los disponibles
  const storyItems = catPosts.slice(0, 8)

  return (
    // stories__section: sección completa de stories
    <section className="stories__section">

      {/* Título de la sección */}
      <h2 className="stories__title">STORIES</h2>

      {/* Contenedor con scroll horizontal para las stories */}
      <div className="stories__container">

        {/* Renderizamos cada story dinámicamente con .map()
            key={story.id} es necesario para que React identifique cada elemento */}
        {storyItems.map((story) => (
          <div key={story.id} className="story__item">

            {/* Wrapper con borde gradiente: crea el efecto característico de las stories */}
            <div className="story__ring">
              <img
                src={story.imageUrl}
                alt={`Story de ${story.username}`}
                className="story__image"
                // onError: si la imagen falla, mostramos un placeholder
                onError={(e) => { e.target.src = 'https://i.pravatar.cc/60?img=1' }}
              />
            </div>

            {/* Username debajo del círculo */}
            <p className="story__username">@{story.username}</p>
          </div>
        ))}

        {/* Flecha de "más stories" (solo visual) */}
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
