import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Shaders are imported as raw strings via `?raw` (no extra plugin needed).
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          post: ['@react-three/postprocessing', 'postprocessing'],
          motion: ['framer-motion', 'gsap'],
        },
      },
    },
  },
});
