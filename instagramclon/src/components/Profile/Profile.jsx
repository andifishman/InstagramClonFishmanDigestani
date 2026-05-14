// Profile.jsx — Vista de perfil del usuario
// Este componente muestra el perfil emulado del usuario SIN login.
// Incluye:
//   - Foto de perfil con borde gradiente
//   - Nombre, @handle, bio
//   - Estadísticas: posts, seguidores, likes
//   - Botón "Edit Profile" (solo visual)
//   - Grid de publicaciones del usuario (mismos catPosts del feed)
//
// Por qué sin login:
//   El proyecto no tiene autenticación. Simulamos un perfil fijo
//   usando los datos de userData.js.
//
// Props que recibe:
//   userData   — objeto con los datos del perfil
//   catPosts   — array de posts para mostrar en el grid del perfil
//   onOpenPost — función para abrir el modal al hacer clic en un post

import './Profile.css'

// ─────────────────────────────────────────────
// Componente Profile
// Props:
//   userData (objeto)   — nombre, foto, bio, estadísticas, etc.
//   catPosts (array)    — publicaciones que se muestran en el grid del perfil
//   onOpenPost (función)— abre el modal al hacer clic en una imagen del perfil
// ─────────────────────────────────────────────
function Profile({ userData, catPosts, onOpenPost }) {
  return (
    <div className="profile__container">

      {/* ── Sección superior: Información del perfil ── */}
      <div className="profile__header">

        {/* Foto de perfil con borde gradiente */}
        <div className="profile__photo-wrapper">
          <img
            src={userData.profileImage}
            alt={`Foto de perfil de ${userData.name}`}
            className="profile__photo"
            onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=12' }}
          />
        </div>

        {/* Información a la derecha de la foto */}
        <div className="profile__info">

          {/* Fila 1: Username y botón de editar */}
          <div className="profile__info-row">
            <h1 className="profile__name">{userData.name}</h1>
            {/* Ícono de verificación azul */}
            <span className="profile__verified" title="Cuenta verificada">
              <svg viewBox="0 0 24 24" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

          {/* @handle del usuario */}
          <p className="profile__handle">@{userData.username}</p>

          {/* Botón Editar Perfil (solo visual) */}
          <button className="profile__edit-btn">Edit Profile</button>

          {/* Estadísticas: posts, seguidores, likes */}
          <div className="profile__stats">
            <div className="profile__stat">
              <span className="profile__stat-value">{userData.postsCount}</span>
              <span className="profile__stat-label">Posts</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-value">{userData.followers}</span>
              <span className="profile__stat-label">Followers</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-value">{userData.likes}</span>
              <span className="profile__stat-label">Likes</span>
            </div>
          </div>

          {/* Bio del usuario */}
          <p className="profile__bio">{userData.bio}</p>

          {/* Sitio web */}
          <p className="profile__website">🔗 {userData.website}</p>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="profile__divider" />

      {/* ── Grid de publicaciones del perfil ── */}
      <h3 className="profile__posts-title">PUBLICACIONES</h3>

      {/* Grid cuadrado estilo Instagram: 3 columnas iguales */}
      <div className="profile__grid">
        {catPosts.map((post) => (
          // Cada celda del grid es una imagen cuadrada
          <div
            key={post.id}
            className="profile__grid-item"
            onClick={() => onOpenPost(post)} // Abre el modal al hacer clic
          >
            <img
              src={post.imageUrl}
              alt={`Publicación de ${userData.username}`}
              className="profile__grid-image"
              onError={(e) => { e.target.src = 'https://placecats.com/300/300' }}
            />
            {/* Overlay con likes que aparece al hacer hover */}
            <div className="profile__grid-overlay">
              <span className="profile__grid-likes">
                {/* Ícono de corazón */}
                ♥ {post.likes.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Profile
