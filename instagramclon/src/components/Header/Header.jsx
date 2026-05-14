// Header.jsx — Barra superior de navegación
// Este componente muestra la parte superior fija de la página:
//   - Logo de Instagram (izquierda)
//   - Barra de búsqueda (centro)
//   - Iconos de acción: configuración, cámara, mensajes (derecha)
//   - Botón "New Post" con gradiente rosa (derecha)
//
// Recibe por props:
//   onNavigate: función del padre (App) para cambiar entre vistas

import './Header.css'

// ─────────────────────────────────────────────
// Componente Header
// Props:
//   onNavigate (función) — cambia la vista activa en App
// ─────────────────────────────────────────────
function Header({ onNavigate }) {
  return (
    // header__container: barra fija en la parte superior de la pantalla
    <header className="header__container">

      {/* ── Columna izquierda: Logo ── */}
      <div className="header__left">
        {/* Logo de Instagram en texto + ícono
            Al hacer clic navega al feed (vista 'feed') */}
        <button
          className="header__logo"
          onClick={() => onNavigate('feed')}
        >
          {/* Ícono SVG de la cámara de Instagram (estilizado) */}
          <svg className="header__logo-icon" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"
              stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4"
              stroke="currentColor" strokeWidth="2"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
          </svg>
          {/* Nombre de la app */}
          <span className="header__logo-text">Instagram</span>
        </button>
      </div>

      {/* ── Columna central: Barra de búsqueda ── */}
      <div className="header__center">
        <div className="header__search">
          {/* Ícono de lupa para la búsqueda */}
          <svg className="header__search-icon" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>

          {/* Input de búsqueda: solo visual, no tiene funcionalidad real
              (el proyecto no requiere búsqueda funcional) */}
          <input
            type="text"
            placeholder="Username, hashtag and story search"
            className="header__search-input"
          />
        </div>
      </div>

      {/* ── Columna derecha: Iconos y botón New Post ── */}
      <div className="header__right">

        {/* Ícono de configuración (engranaje) */}
        <button className="header__icon-btn" title="Settings">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06
              a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09
              A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83
              l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09
              A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83
              l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09
              a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83
              l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09
              a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        {/* Ícono de cámara */}
        <button className="header__icon-btn" title="Camera">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        </button>

        {/* Ícono de mensajes directos (avión de papel) */}
        <button className="header__icon-btn" title="Direct Messages">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>

        {/* Botón "New Post" con gradiente rosa
            Simula el botón para crear una nueva publicación */}
        <button className="header__new-post-btn">
          {/* Ícono + */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </button>

      </div>
    </header>
  )
}

export default Header
