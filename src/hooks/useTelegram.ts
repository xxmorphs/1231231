// src/hooks/useTelegram.ts
import { useEffect, useState, useCallback } from 'react';
// НЕ НУЖНО: import { type WebApp } from '@twa-dev/sdk';

// Ваш src/global.d.ts УЖЕ ДОЛЖЕН объявлять window.Telegram.WebApp
// Примерно так (имя TwaDevWebApp здесь для примера, чтобы показать, что тип берется из global.d.ts):
// import { WebApp as TwaDevWebApp } from '@twa-dev/sdk';
// declare global {
//   interface Window {
//     Telegram: {
//       WebApp: TwaDevWebApp;
//     };
//   }
// }

// Мы будем полагаться на тип из window.Telegram.WebApp
type ActualWebApp = Window['Telegram']['WebApp']; // Получаем тип WebApp из глобального объявления
type InitDataUnsafe = NonNullable<ActualWebApp['initDataUnsafe']>;
type User = NonNullable<InitDataUnsafe['user']>;
type ThemeParams = ActualWebApp['themeParams'];

export function useTelegram() {
  const [webApp, setWebApp] = useState<ActualWebApp | null>(null); // Используем ActualWebApp
  const [user, setUser] = useState<User | null>(null);
  const [initDataUnsafe, setInitDataUnsafe] = useState<InitDataUnsafe | null>(null);
  const [themeParams, setThemeParams] = useState<ThemeParams | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean | undefined>(undefined);
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const appInstance = window.Telegram.WebApp; // appInstance теперь будет типа ActualWebApp
      setWebApp(appInstance);

      // ... (остальной код useEffect остается прежним) ...
      // Проверка и вызов ready()
      if (typeof appInstance.isReady === 'function' && !appInstance.isReady()) {
          appInstance.ready();
      } else if (typeof appInstance.ready === 'function' && typeof appInstance.isReady === 'undefined') {
          appInstance.ready();
      }

      if (appInstance.initDataUnsafe) {
        setInitDataUnsafe(appInstance.initDataUnsafe);
        if (appInstance.initDataUnsafe.user) {
          setUser(appInstance.initDataUnsafe.user);
        }
      }

      setThemeParams(appInstance.themeParams);
      setIsExpanded(appInstance.isExpanded);
      setViewportHeight(appInstance.viewportStableHeight);

      const handleViewportChanged = () => {
        setIsExpanded(appInstance.isExpanded);
        setViewportHeight(appInstance.viewportStableHeight);
      };
      const handleThemeChanged = () => {
        setThemeParams(appInstance.themeParams);
      };

      if (typeof appInstance.onEvent === 'function' && typeof appInstance.offEvent === 'function') {
        appInstance.onEvent('viewportChanged', handleViewportChanged);
        appInstance.onEvent('themeChanged', handleThemeChanged);

        return () => {
          appInstance.offEvent('viewportChanged', handleViewportChanged);
          appInstance.offEvent('themeChanged', handleThemeChanged);
        };
      } else {
        console.warn('@twa-dev/sdk: onEvent/offEvent methods not found on WebApp instance. Event handling might be different.');
      }
    }
  }, []);

  const onClose = useCallback(() => {
    webApp?.close();
  }, [webApp]);

  const onToggleButton = useCallback(() => {
    if (webApp?.MainButton) {
      const mb = webApp.MainButton;
      if (mb.isVisible) {
        mb.hide();
      } else {
        mb.show();
      }
    }
  }, [webApp]);

  const setAppBackgroundColor = useCallback((color: string) => {
    webApp?.setBackgroundColor(color);
  }, [webApp]);

  // Шаг 2: Исправление setAppHeaderColor
  const setAppHeaderColor = useCallback((colorKey: string /* или более конкретный тип, если известен */) => {
    if (webApp?.setHeaderColor) {
        try {
            // Пытаемся найти подходящий тип для colorKey в @twa-dev/sdk
            // Если документация говорит, что это просто строка (HEX или 'bg_color'), то string подойдет.
            // Если есть специфичный union type для ключей, его нужно использовать.
            // Пока оставим string, но без 'as any'. TypeScript подскажет, если тип не совпадает.
            webApp.setHeaderColor(colorKey);
        } catch (e) {
            console.error("Error setting header color with @twa-dev/sdk", e);
        }
    }
  }, [webApp]);

  return {
    webApp,
    user,
    themeParams,
    initDataUnsafe,
    queryId: initDataUnsafe?.query_id,
    onClose,
    onToggleButton,
    isExpanded,
    viewportHeight,
    setBackgroundColor: setAppBackgroundColor,
    setHeaderColor: setAppHeaderColor,
  };
}