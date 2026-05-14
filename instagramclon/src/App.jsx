import { useState, useEffect } from 'react'

import Header    from './components/Header/Header.jsx'
import Sidebar   from './components/Sidebar/Sidebar.jsx'
import Feed      from './components/Feed/Feed.jsx'
import Profile   from './components/Profile/Profile.jsx'
import PostModal from './components/PostModal/PostModal.jsx'

import { fetchCatImages } from './services/catApi.js'
import { userData, mockUsernames, catCaptions, getRandomDate } from './data/userData.js'
import './App.css'

function App() {

  const [currentView, setCurrentView] = useState('feed')
  const [catPosts, setCatPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // [] vacío: el efecto se ejecuta una sola vez al montar el componente
  useEffect(() => {

    // useEffect no puede ser directamente async, por eso definimos la función adentro
    const loadCatPosts = async () => {
      try {
        setIsLoading(true)

        const catImages = await fetchCatImages(15)

        // Transformamos cada imagen de la API en un objeto post con datos simulados
        const formattedCatPosts = catImages.map((catData, index) => ({
          id: catData.id,
          imageUrl: catData.url,
          // Módulo (%) para rotar la lista y no repetir siempre el mismo nombre
          username: mockUsernames[index % mockUsernames.length],
          // Número aleatorio entre 100 y 5100
          likes: Math.floor(Math.random() * 5000) + 100,
          liked: false,
          caption: catCaptions[index % catCaptions.length],
          date: getRandomDate(),
          comments: [],
        }))

        setCatPosts(formattedCatPosts)

      } catch (error) {
        console.error('Error al obtener imágenes de cats:', error)
      } finally {
        // finally siempre se ejecuta, haya error o no
        setIsLoading(false)
      }
    }

    loadCatPosts()

  }, [])

  const handleLike = (postId) => {
    // Forma funcional de setCatPosts para usar siempre el estado más reciente
    setCatPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            // Si ya estaba likeado restamos 1, si no estaba sumamos 1
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      })
    )
  }

  const handleOpenModal = (post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  const handleNavigate = (view) => {
    setCurrentView(view)
  }

  return (
    <div className="app">

      <Header onNavigate={handleNavigate} />

      <div className="app__layout">

        <Sidebar
          userData={userData}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        <main className="app__main">

          {/* Ternario: muestra Feed o Profile según la vista activa */}
          {currentView === 'feed' ? (
            <Feed
              catPosts={catPosts}
              isLoading={isLoading}
              onLike={handleLike}
              onOpenPost={handleOpenModal}
            />
          ) : (
            <Profile
              userData={userData}
              catPosts={catPosts}
              onOpenPost={handleOpenModal}
            />
          )}
        </main>
      </div>

      {/* && hace que PostModal solo se monte si ambas condiciones son true */}
      {isModalOpen && selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={handleCloseModal}
          onLike={handleLike}
        />
      )}

    </div>
  )
}

export default App
