export interface UserData {
  id: number
  name: string
  username: string
  bio: string
  profileImage: string
  followers: string
  likes: string
  postsCount: number
  website: string
}

export interface Comment {
  id: number
  username: string
  text: string
  time: string
}

export interface Post {
  id: string
  imageUrl: string
  username: string
  likes: number
  liked: boolean
  caption: string
  date: string
  comments: Comment[]
}
