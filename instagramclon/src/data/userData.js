export const userData = {
  id: 1,
  name: "Uğur Mercan",
  username: "ugur_mercan0",
  bio: "Cat lover 🐱 | Frontend Developer | Sharing cat moments daily ✨",
  profileImage: "https://i.pravatar.cc/150?img=12",
  followers: "121K",
  likes: "900K",
  postsCount: 47,
  website: "ugurmercan.dev",
}

export const mockUsernames = [
  "whiskers_cat",
  "fluffy_paws_42",
  "mittens_world",
  "nyan_cat_official",
  "purring_vibes",
  "cat_daily_pics",
  "meow_moments_co",
  "tabby_adventures",
  "persian_dreams",
  "siamese_tales",
  "ragdoll_life_hq",
  "maine_coon_fan",
  "bengal_cat_spots",
  "scottish_fold_fan",
  "black_cat_magic",
]

export const catCaptions = [
  "Just found the perfect sunbeam ☀️ #catlife #sleepy",
  "Monday mood activated 😸 #cats #mondays",
  "They said I couldn't fit in this box... they were wrong 📦 #catsofinstagram",
  "When the food bowl is empty at 3am 🍽️ #hungry #catproblems",
  "Professional napper at your service 💤 #napping #blessed",
  "I see you brought groceries... for ME 🛍️ #spoiledcat",
  "Excuse me, this is MY keyboard now ⌨️ #workfromhome",
  "Judging your life choices since forever 👀 #judgycat",
  "This is my window and my view 🌆 #citycat #vibes",
  "Fur coat, don't care 🐾 #fluffy #catlover",
  "I didn't choose the floof life, the floof life chose me 💫",
  "Error 404: Personal space not found 🔍 #clingycat",
  "CEO of doing absolutely nothing all day 📊 #boss",
  "The dramatic pause before knocking everything off 😈 #chaos",
  "Helping with yoga since always 🧘 #yogacat #namaste",
]

export const mockComments = [
  { id: 1, username: "cat_lover_99",       text: "This is absolutely adorable! 😻",           time: "2h" },
  { id: 2, username: "meow_master_x",      text: "I need this cat in my life right now 🐾",   time: "3h" },
  { id: 3, username: "furry_friends_club", text: "Look at those beautiful eyes! 💕",           time: "5h" },
  { id: 4, username: "kitty_queen_21",     text: "This made my whole day so much better 🌟",  time: "6h" },
  { id: 5, username: "purrfect_life_co",   text: "Cutest thing I've seen all week! 🥰",        time: "8h" },
]

export const getRandomDate = () => {
  const timeOptions = ["1h", "2h", "3h", "5h", "8h", "12h", "1d", "2d", "3d"]
  // Math.floor + Math.random() para obtener un índice entero dentro del rango del array
  return timeOptions[Math.floor(Math.random() * timeOptions.length)]
}
