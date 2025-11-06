// Shared demo data for the app
export const paintings = [
  {
    id: 1,
    title: "Sunset Over Mountains",
    image: "https://via.placeholder.com/600x320?text=Sunset+Over+Mountains",
    desc: "A serene sunset captured with oil on canvas.",
  },
  {
    id: 2,
    title: "Morning Dew",
    image: "https://via.placeholder.com/600x320?text=Morning+Dew",
    desc: "A delicate play of light and shadow.",
  },
  {
    id: 3,
    title: "Urban Rhythm",
    image: "https://via.placeholder.com/600x320?text=Urban+Rhythm",
    desc: "Abstract take on modern city life.",
  },
];

// Events use ISO date strings so Calendar component can match them
export const events = [
  { id: 1, title: "Art Expo 2025", date: "2025-10-12", location: "New Delhi", time: "10:00 AM" },
  { id: 2, title: "Modern Art Talk", date: "2025-10-20", location: "Mumbai", time: "04:00 PM" },
  { id: 3, title: "Painting Workshop", date: "2025-11-02", location: "Online", time: "11:00 AM" },
];

// Utility: initial demo users (only used when no users in localStorage)
export const demoUsers = [
  { name: "Admin User", email: "admin@example.com", password: "adminpass", role: "admin" },
  { name: "Artist One", email: "artist@example.com", password: "artistpass", role: "artist" },
  { name: "Visitor One", email: "visitor@example.com", password: "visitorpass", role: "visitor" },
];

// initial artworks (empty by default) - stored in localStorage under 'artworks'
export const demoArtworks = [
  // Example artwork structure:
  // { id: 1, title: 'My Painting', image: 'https://...', price: 120, description: '...', ownerEmail: 'artist@example.com' }
];
