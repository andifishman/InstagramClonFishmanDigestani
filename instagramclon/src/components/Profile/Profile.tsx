import type { UserData, Post } from '../../types.ts'
import './Profile.css'

interface ProfileProps {
  userData: UserData
  catPosts: Post[]
  onOpenPost: (post: Post) => void
}

function Profile({ userData, catPosts, onOpenPost }: ProfileProps) {
  return (
    <div className="profile__container">

      <div className="profile__header">

        <div className="profile__photo-wrapper">
          <img
            src={userData.profileImage}
            alt={`Foto de perfil de ${userData.name}`}
            className="profile__photo"
            onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/150?img=12' }}
          />
        </div>

        <div className="profile__info">

          <div className="profile__info-row">
            <h1 className="profile__name">{userData.name}</h1>
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

          <p className="profile__handle">@{userData.username}</p>

          <button className="profile__edit-btn">Edit Profile</button>

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

          <p className="profile__bio">{userData.bio}</p>
          <p className="profile__website">🔗 {userData.website}</p>
        </div>
      </div>

      <div className="profile__divider" />

      <h3 className="profile__posts-title">PUBLICACIONES</h3>

      <div className="profile__grid">
        {catPosts.map((post) => (
          <div
            key={post.id}
            className="profile__grid-item"
            onClick={() => onOpenPost(post)}
          >
            <img
              src={post.imageUrl}
              alt={`Publicación de ${userData.username}`}
              className="profile__grid-image"
              onError={(e) => { e.currentTarget.src = 'https://placecats.com/300/300' }}
            />
            <div className="profile__grid-overlay">
              <span className="profile__grid-likes">
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
