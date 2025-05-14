import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr() // Добавляем плагин для SVG
  ],
  server: {
    host: '0.0.0.0', // Для доступа с мобильного в локальной сети
    port: 3000      // Можете выбрать другой порт
  }
});