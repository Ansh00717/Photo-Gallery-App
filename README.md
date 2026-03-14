# React Photo Gallery App

A responsive **Photo Gallery Web Application** built with **React, Vite, and Tailwind CSS**.
The application fetches images from a public API, displays them in a responsive grid, allows real-time search filtering by author name, and lets users mark photos as favourites.

---

# Features

• Fetches 30 photos from the Picsum Photos API
• Displays images in a responsive grid layout
• Real-time search filtering by author name
• Favourite toggle functionality using a heart icon
• Favourite photos persist after page refresh using localStorage
• Clean and minimal responsive UI
• Optimized image loading with lazy loading

---

# Tech Stack

**Frontend**

• React (Functional Components + Hooks)
• Vite
• Tailwind CSS
• TypeScript

**React Hooks Used**

• useState
• useEffect
• useReducer
• useCallback
• useMemo

---

# Project Structure

```
src
│
├── components
│   ├── PhotoCard.tsx
│   └── SearchBar.tsx
│
├── hooks
│   └── useFetchPhotos.ts
│
├── reducers
│   └── favouritesReducer.ts
│
├── App.tsx
├── main.tsx
├── index.css
└── types.ts
```

---

# Core Implementation

### Custom Hook

The project uses a custom hook:

`useFetchPhotos`

It handles:

• API fetching
• loading state
• error handling

---

### State Management

Favourites are managed using **useReducer** to demonstrate structured state management.

The reducer handles toggling photos as favourites.

---

### Performance Optimization

React performance hooks were used:

• **useCallback** – memoizes the search handler
• **useMemo** – memoizes filtered photos list

These prevent unnecessary recalculations and improve rendering performance.

---

### Persistence

Favourite photos persist across page refresh using **localStorage**.

---

# Installation

Clone the repository

```
git clone https://github.com/yourusername/photo-gallery-app.git
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Open in browser

```
http://localhost:5173
```

---

# Build for Production

```
npm run build
```

---

# Deployment

The project is deployed using **Netlify**.

---

# Assignment Requirements Implemented

✔ React + Vite setup
✔ Tailwind CSS styling
✔ Fetch photos from API
✔ Responsive photo grid
✔ Search filter by author
✔ Favourite photos using useReducer
✔ Persist favourites with localStorage
✔ Custom hook for data fetching
✔ useCallback and useMemo for optimization
