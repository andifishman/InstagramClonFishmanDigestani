// main.jsx — Punto de entrada de la aplicación React
// Este es el archivo que Vite usa para iniciar todo.
// Aquí se monta el componente principal App en el DOM.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'       // Estilos globales
import App from './App.jsx' // Componente principal

// createRoot: selecciona el elemento con id="root" del index.html
// y lo prepara para que React lo controle
// StrictMode activa advertencias adicionales de React en desarrollo
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
