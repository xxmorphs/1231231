// src/global.d.ts
import { WebApp } from '@twa-dev/sdk';

declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}
export {}; // Это делает файл модулем