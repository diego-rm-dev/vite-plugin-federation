import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: 'remote1',
    filename: 'remoteEntry.js',
    exposes: {
      './App': './src/App.tsx',
    },
    shared: ['react', 'react-dom'],
  })
  ],
  build: {
    target: 'esnext',
    minify: false
  },
  server: {
    port: 3001,
  },
})
