// App.jsx — Componente raíz de la aplicación
// Este es el componente principal que:
//   1. Controla qué vista se muestra (feed o perfil)
//   2. Llama a la API para obtener las imágenes de cats al iniciar
//   3. Guarda todas las publicaciones en el estado
//   4. Maneja los likes, el modal y la navegación
//   5. Distribuye los datos a los componentes hijos mediante props

import { useState, useEffect } from 'react'

// Importamos todos los componentes que necesitamos
import Header   from './components/Header/Header.jsx'
import Sidebar  from './components/Sidebar/Sidebar.jsx'
import Feed     from './components/Feed/Feed.jsx'
import Profile  from './components/Profile/Profile.jsx'
import PostModal from './components/PostModal/PostModal.jsx'

// Importamos el servicio de la API de cats
import { fetchCatImages } from './services/catApi.js'

// Importamos los datos simulados del usuario y los textos de posts
import { userData, mockUsernames, catCaptions, getRandomDate } from './data/userData.js'

// Importamos los estilos del layout principal
import './App.css'

// ─────────────────────────────────────────────
// Componente App
// Es el "cerebro" de la aplicación: maneja los estados
// globales y coordina todos los componentes hijos.
// ─────────────────────────────────────────────
function App() {

  // ── Estados (useState) ──────────────────────────────────────────────

  // currentView: controla qué sección se muestra en el área principal
  // Puede ser 'feed' (inicio con posts) o 'profile' (perfil del usuario)
  const [currentView, setCurrentView] = useState('feed')

  // catPosts: array con todos los posts/publicaciones que se muestran en el feed
  // Cada post es un objeto con imagen, likes, usuario, etc.
  const [catPosts, setCatPosts] = useState([])

  // selectedPost: guarda el post que el usuario clickeó para verlo en el modal
  // Cuando no hay ningún post seleccionado, su valor es null
  const [selectedPost, setSelectedPost] = useState(null)

  // isModalOpen: booleano que controla si el modal está visible o no
  // true = modal abierto, false = modal cerrado
  const [isModalOpen, setIsModalOpen] = useState(false)

  // isLoading: booleano que indica si se están cargando los datos de la API
  // Mientras es true, mostramos un indicador de carga
  const [isLoading, setIsLoading] = useState(true)

  // ── useEffect para cargar los posts al iniciar ──────────────────────
  // useEffect con array vacío [] se ejecuta UNA SOLA VEZ cuando el
  // componente se monta en el DOM. Es el lugar correcto para llamar a la API.
  useEffect(() => {

    // Definimos una función async dentro del useEffect porque
    // useEffect no puede ser directamente async
    const loadCatPosts = async () => {
      try {
        // Activamos el indicador de carga antes de la petición
        setIsLoading(true)

        // Llamamos al servicio que usa Axios para pedir 15 imágenes de cats
        const catImages = await fetchCatImages(15)

        // Transformamos el array de imágenes de la API en un array de "posts"
        // Cada imagen se convierte en un objeto post con datos adicionales simulados
        const formattedCatPosts = catImages.map((catData, index) => ({
          // id: identificador único que viene de la API
          id: catData.id,

          // imageUrl: la URL de la imagen del cat que nos da la API
          imageUrl: catData.url,

          // username: nombre de usuario simulado, rotamos la lista con módulo (%)
          username: mockUsernames[index % mockUsernames.length],

          // likes: número aleatorio entre 100 y 5100 para simular likes reales
          likes: Math.floor(Math.random() * 5000) + 100,

          // liked: estado inicial del botón de like (false = no likeado todavía)
          liked: false,

          // caption: texto del post, también rotamos la lista de captions
          caption: catCaptions[index % catCaptions.length],

          // date: fecha simulada relativa (ej: "2h", "1d")
          date: getRandomDate(),

          // comments: por ahora vacío, los comentarios los importa el modal
          comments: [],
        }))

        // Guardamos los posts formateados en el estado
        setCatPosts(formattedCatPosts)

      } catch (error) {
        // Si la petición falla (sin internet, API caída, etc.), lo mostramos en consola
        console.error('Error al obtener imágenes de cats:', error)
      } finally {
        // finally siempre se ejecuta, haya error o no
        // Desactivamos el indicador de carga
        setIsLoading(false)
      }
    }

    // Llamamos a la función que definimos arriba
    loadCatPosts()

  }, []) // El [] vacío garantiza que este efecto solo se ejecute al montar el componente

  // ── Funciones manejadoras de eventos ───────────────────────────────

  // handleLike: alterna el estado de like de un post
  // Recibe el id del post que el usuario clickeó
  const handleLike = (postId) => {
    // Usamos la forma funcional de setCatPosts para basarnos en el estado anterior
    setCatPosts(prevPosts =>
      // map() recorre todos los posts y devuelve un nuevo array
      prevPosts.map(post => {
        // Si el post coincide con el id clickeado, lo modificamos
        if (post.id === postId) {
          return {
            ...post,                           // Copiamos todas las propiedades del post
            liked: !post.liked,               // Invertimos el estado de like
            likes: post.liked                 // Ajustamos el contador:
              ? post.likes - 1               //   si ya estaba likeado, restamos 1
              : post.likes + 1,              //   si no estaba likeado, sumamos 1
          }
        }
        // Si no coincide, devolvemos el post sin cambios
        return post
      })
    )
  }

  // handleOpenModal: abre el modal con el post seleccionado
  // Recibe el objeto post completo
  const handleOpenModal = (post) => {
    setSelectedPost(post)   // Guardamos qué post se seleccionó
    setIsModalOpen(true)    // Mostramos el modal
  }

  // handleCloseModal: cierra el modal y limpia el post seleccionado
  const handleCloseModal = () => {
    setIsModalOpen(false)   // Ocultamos el modal
    setSelectedPost(null)   // Limpiamos el post seleccionado
  }

  // handleNavigate: cambia la vista actual entre 'feed' y 'profile'
  // El Sidebar y el Header llaman a esta función cuando el usuario
  // hace clic en los ítems de navegación
  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  // ── Renderizado del componente ──────────────────────────────────────
  // JSX: mezcla de HTML y JavaScript que React convierte al DOM
  return (
    <div className="app">

      {/* Header: barra superior con logo, buscador y botones
          Le pasamos la función de navegación para el botón de perfil */}
      <Header onNavigate={handleNavigate} />

      {/* app__layout: contenedor flex que divide sidebar y contenido principal */}
      <div className="app__layout">

        {/* Sidebar: barra lateral izquierda con perfil y navegación
            Le pasamos: los datos del usuario, la vista actual y la función de navegación */}
        <Sidebar
          userData={userData}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        {/* app__main: área principal de contenido (a la derecha del sidebar) */}
        <main className="app__main">

          {/* Renderizado condicional: según currentView mostramos Feed o Profile
              El operador ternario ? : funciona como un if/else en JSX */}
          {currentView === 'feed' ? (
            // Vista Feed: muestra stories y grid de posts de cats
            <Feed
              catPosts={catPosts}         // Array de posts con imágenes de cats
              isLoading={isLoading}       // Para mostrar spinner mientras carga
              onLike={handleLike}         // Función para dar like a un post
              onOpenPost={handleOpenModal} // Función para abrir el modal
            />
          ) : (
            // Vista Profile: muestra el perfil del usuario con su grid de fotos
            <Profile
              userData={userData}          // Datos del usuario (nombre, bio, etc.)
              catPosts={catPosts}          // Los mismos posts se muestran en el perfil
              onOpenPost={handleOpenModal} // También puede abrir el modal desde el perfil
            />
          )}
        </main>
      </div>

      {/* PostModal: se renderiza SOLO si isModalOpen es true Y hay un post seleccionado
          El operador && hace que el componente aparezca o desaparezca del DOM */}
      {isModalOpen && selectedPost && (
        <PostModal
          post={selectedPost}    // El post que el usuario clickeó
          onClose={handleCloseModal} // Función para cerrar el modal
          onLike={handleLike}    // Función para dar like desde el modal
        />
      )}

    </div>
  )
}

export default App
