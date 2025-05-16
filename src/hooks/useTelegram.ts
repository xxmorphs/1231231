import { useEffect, useState } from 'react';

// Расширяем глобальный объект Window, чтобы TypeScript знал о Telegram.WebApp
declare global {
  interface Window {
    Telegram: any; // Используем 'any' для простоты, можно типизировать точнее
  }
}

export function useTelegram() {
  const [tg, setTg] = useState<any>(null); // Состояние для хранения объекта Telegram WebApp
  const [user, setUser] = useState<any>(null); // Состояние для данных пользователя
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [themeParams, setThemeParams] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      setTg(webApp);
      webApp.ready(); // Сообщаем Telegram, что приложение готово

      // Устанавливаем пользователя, если он есть
      if (webApp.initDataUnsafe?.user) {
        setUser(webApp.initDataUnsafe.user);
      }

      // Начальные значения
      setIsExpanded(webApp.isExpanded);
      setViewportHeight(webApp.viewportStableHeight); // Используем viewportStableHeight для начальной высоты
      setThemeParams(webApp.themeParams);

      // Обработчики событий
      const onViewportChanged = () => {
        setIsExpanded(webApp.isExpanded);
        setViewportHeight(webApp.viewportStableHeight); // Обновляем высоту при изменении
      };

      const onThemeChanged = () => {
        setThemeParams(webApp.themeParams);
      };

      webApp.onEvent('viewportChanged', onViewportChanged);
      webApp.onEvent('themeChanged', onThemeChanged);

      // Очистка при размонтировании компонента
      return () => {
        webApp.offEvent('viewportChanged', onViewportChanged);
        webApp.offEvent('themeChanged', onThemeChanged);
      };
    } else {
      console.warn('Telegram WebApp SDK not found.');
    }
  }, []);

  const onClose = () => {
    if (tg) {
      tg.close();
    }
  };

  const onToggleButton = () => {
    if (tg) {
      if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
      } else {
        tg.MainButton.show();
      }
    }
  };

  const setBackgroundColor = (color: string) => {
    if (tg && tg.setBackgroundColor) {
      tg.setBackgroundColor(color);
    }
  };

  const setHeaderColor = (color: string) => {
    if (tg && tg.setHeaderColor) {
      tg.setHeaderColor(color);
    }
  };

  return {
    tg,
    user,
    queryId: tg?.initDataUnsafe?.query_id,
    onClose,
    onToggleButton,
    isExpanded,
    viewportHeight,
    themeParams,
    setBackgroundColor,
    setHeaderColor,
  };
}