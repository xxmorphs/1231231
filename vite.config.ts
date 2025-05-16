
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // 1. Импортируйте плагин
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr() // 2. Добавьте плагин в массив plugins
  ],
  server: {
    host: '0.0.0.0', // Для доступа с мобильного в локальной сети
    port: 3000      // Можете выбрать другой порт
  }
}); // ... ваши другие настройки Vite, если есть


