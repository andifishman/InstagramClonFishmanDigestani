// Sidebar.jsx — Barra lateral izquierda
// Este componente muestra:
//   1. Foto de perfil del usuario
//   2. Nombre y @handle
//   3. Estadísticas (seguidores y likes)
//   4. Menú de navegación (Home, Explore, Reels, iGTV, Notification)
//
// Props que recibe:
//   userData    — objeto con los datos del usuario (nombre, foto, etc.)
//   currentView — string con la vista activa ('feed' o 'profile')
//   onNavigate  — función para cambiar la vista

import './Sidebar.css'

// ─────────────────────────────────────────────
// Componente Sidebar
// Props:
//   userData (objeto)     — datos del perfil del usuario
//   currentView (string)  — vista activa para resaltar el ítem correcto
//   onNavigate (función)  — función del padre para cambiar de vista
// ─────────────────────────────────────────────
function Sidebar({ userData, currentView, onNavigate }) {

  // Definimos los ítems de navegación como un array de objetos
  // Esto nos permite renderizarlos dinámicamente con .map()
  // en vez de escribir cada ítem manualmente
  const navItems = [
    {
      // id: identificador único para usar como key en el .map()
      id: 'feed',
      // label: texto que se muestra en el menú
      label: 'Home',
      // icon: componente SVG del ícono correspondiente
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      ),
    },
    {
      id: 'reels',
      label: 'Reels',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
          <line x1="7" y1="2" x2="7" y2="22"/>
          <line x1="17" y1="2" x2="17" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="2" y1="7" x2="7" y2="7"/>
          <line x1="2" y1="17" x2="7" y2="17"/>
          <line x1="17" y1="17" x2="22" y2="17"/>
          <line x1="17" y1="7" x2="22" y2="7"/>
        </svg>
      ),
    },
    {
      id: 'igtv',
      label: 'iGTV',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
    },
    {
      id: 'notifications',
      label: 'Notification',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
    },
  ]

  return (
    // sidebar: contenedor fijo en el lado izquierdo de la pantalla
    <aside className="sidebar">

      {/* ── Sección de perfil ── */}
      <div className="sidebar__profile">

        {/* Foto de perfil con borde gradiente (estilo story de Instagram)
            Al hacer clic va a la vista de perfil */}
        <button
          className="sidebar__profile-photo-wrapper"
          onClick={() => onNavigate('profile')}
          title="Ver perfil"
        >
          <img
            src={userData.profileImage}
            alt={`Foto de perfil de ${userData.name}`}
            className="sidebar__profile-photo"
            // onError: si la imagen falla, usamos un placeholder de color sólido
            onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=5' }}
          />
        </button>

        {/* Nombre del usuario */}
        <h2 className="sidebar__name">{userData.name}</h2>

        {/* Handle (@usuario) */}
        <p className="sidebar__username">@{userData.username}</p>

        {/* Estadísticas: seguidores y likes */}
        <div className="sidebar__stats">
          <div className="sidebar__stat">
            {/* Ícono de persona para "seguidores" */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>{userData.followers}</span>
          </div>

          <div className="sidebar__stat">
            {/* Ícono de corazón para "likes" */}
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78
                7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{userData.likes}</span>
          </div>
        </div>
      </div>

      {/* Línea divisoria entre perfil y navegación */}
      <div className="sidebar__divider" />

      {/* ── Menú de navegación ── */}
      <nav className="sidebar__nav">
        {/* Renderizamos cada ítem del array navItems dinámicamente
            key={item.id} es obligatorio en React para listas renderizadas */}
        {navItems.map((item) => (
          <button
            key={item.id}
            // Clases dinámicas: si el ítem es 'feed' y la vista es 'feed', está activo
            // También marcamos 'profile' como activo si currentView es 'profile'
            className={`sidebar__nav-item ${
              currentView === item.id ||
              (item.id === 'feed' && currentView === 'feed') ||
              (item.id === 'profile' && currentView === 'profile')
                ? 'sidebar__nav-item--active'
                : ''
            }`}
            // onClick: llama a onNavigate solo para 'feed' y 'profile'
            // Los otros ítems no tienen vista implementada (solo visual)
            onClick={() => {
              if (item.id === 'feed') onNavigate('feed')
              else if (item.id === 'profile') onNavigate('profile')
              // Explore, Reels, iGTV y Notification son solo visuales
            }}
          >
            {/* Ícono SVG del ítem */}
            <span className="sidebar__nav-icon">{item.icon}</span>
            {/* Texto del ítem */}
            <span className="sidebar__nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar
