import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    allowedHosts: ['stage.kaylielabs.store', 'localhost', '127.0.0.1'],
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
  base: '/',
  build: {
    assetsDir: 'assets',
  },
});
