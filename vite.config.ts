import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/auth'],
          'pdf': ['pdf-lib'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});