import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: 'host',
    remotes: {
      remote1: {
        type: 'module',
        name: 'remote1',
        entry: 'http://localhost:3001/remoteEntry.js',
      },
      remote2: {
        type: 'module',
        name: 'remote2',
        entry: 'http://localhost:3002/remoteEntry.js',
      },
    },
    shared: ['react', 'react-dom'],
  }),
  ],
  build: {
    target: 'esnext',
    minify: false
  },
  server: {
    port: 3000,
  },
});