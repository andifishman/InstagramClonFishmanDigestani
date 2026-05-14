import { useState, useEffect } from 'react'
import type { Post } from './types.ts'

import Header    from './components/Header/Header.tsx'
import Sidebar   from './components/Sidebar/Sidebar.tsx'
import Feed      from './components/Feed/Feed.tsx'
import Profile   from './components/Profile/Profile.tsx'
import PostModal from './components/PostModal/PostModal.tsx'

import { fetchCatImages } from './services/catApi.ts'
import { userData, mockUsernames, catCaptions, getRandomDate } from './data/userData.ts'
import './App.css'

function App() {

  const [currentView, setCurrentView] = useState<string>('feed')
  const [catPosts, setCatPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // [] vacío: el efecto se ejecuta una sola vez al montar el componente
  useEffect(() => {

    // useEffect no puede ser directamente async, por eso definimos la función adentro
    const loadCatPosts = async (): Promise<void> => {
      try {
        setIsLoading(true)

        const catImages = await fetchCatImages(15)

        // Transformamos cada imagen de la API en un objeto post con datos simulados
        const formattedCatPosts: Post[] = catImages.map((catData, index: number) => ({
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

  const handleLike = (postId: string): void => {
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

  const handleOpenModal = (post: Post): void => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  const handleNavigate = (view: string): void => {
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
