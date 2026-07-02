import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the built asset URLs work whether the site is served from
  // a domain root (Netlify) or a project subpath (GitHub Pages,
  // e.g. /football-game/). Safe here because the app has no client-side router.
  base: './',
  plugins: [react(), tailwindcss()],
})
