import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/background/background.js',
          dest: ''
        },
        {
          src: 'src/offscreen/',
          dest: ''
        },
        {
          src: 'src/assets',
          dest: ''
        }
      ]
    })
  ],
  build: {
    outDir: 'dist'
  }
});