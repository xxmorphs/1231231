// src/hooks/useTelegram.ts
import { useEffect, useState, useCallback } from 'react';

// ВАЖНО: Этот код требует, чтобы пакет @types/telegram-web-app был установлен
// и корректно распознавался вашим TypeScript окружением.
//
// Если TypeScript жалуется на "TelegramWebApp", выполните в терминале:
// 1. npm install @types/telegram-web-app
//    (или yarn add @types/telegram-web-app)
// 2. В VS Code: Ctrl+Shift+P -> "TypeScript: Restart TS server"
// 3. Перезапустите ваш сервер разработки.

declare global {
  // Это расширяет глобальный интерфейс Window, чтобы TypeScript знал о свойстве Telegram.
  // Тип TelegramWebApp.WebAppRoot берется из @types/telegram-web-app.
  interface Window {
    Telegram: TelegramWebApp.WebAppRoot;
  }
}

export function useTelegram() {
  // Состояние для хранения объекта Telegram WebApp SDK
  const [tg, setTg] = useState<TelegramWebApp.WebApp | null>(null);
  // Состояние для хранения данных пользователя Telegram
  const [user, setUser] = useState<TelegramWebApp.WebAppUser | null>(null);
  // Состояние для хранения "сырых" данных инициализации
  const [initDataUnsafe, setInitDataUnsafe] = useState<TelegramWebApp.WebAppInitData | null>(null);
  // Состояние: развернуто ли приложение на весь экран
  const [isExpanded, setIsExpanded] = useState<boolean | undefined>(undefined);
  // Состояние: высота видимой области приложения
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(undefined);
  // Состояние: параметры темы Telegram
  const [themeParams, setThemeParams] = useState<TelegramWebApp.ThemeParams | null>(null);

  useEffect(() => {
    // Убеждаемся, что код выполняется в браузере и Telegram SDK доступен
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const webAppInstance = window.Telegram.WebApp;
      setTg(webAppInstance);

      // Сообщаем Telegram, что приложение готово к отображению (критически важно!)
      webAppInstance.ready();

      // Получаем и сохраняем данные инициализации
      if (webAppInstance.initDataUnsafe) {
        setInitDataUnsafe(webAppInstance.initDataUnsafe);
        // Извлекаем данные пользователя, если они есть
        if (webAppInstance.initDataUnsafe.user) {
          setUser(webAppInstance.initDataUnsafe.user);
        }
      }

      // Устанавливаем начальные значения для состояний, связанных с UI Telegram
      setIsExpanded(webAppInstance.isExpanded);
      setViewportHeight(webAppInstance.viewportStableHeight); // viewportStableHeight обычно предпочтительнее для начальной высоты
      setThemeParams(webAppInstance.themeParams);

      // Обработчики событий от Telegram SDK
      const handleViewportChanged = () => {
        setIsExpanded(webAppInstance.isExpanded);
        setViewportHeight(webAppInstance.viewportStableHeight);
      };

      const handleThemeChanged = () => {
        setThemeParams(webAppInstance.themeParams);
      };

      // Подписываемся на события
      webAppInstance.onEvent('viewportChanged', handleViewportChanged);
      webAppInstance.onEvent('themeChanged', handleThemeChanged);

      // Функция очистки: отписываемся от событий при размонтировании компонента
      return () => {
        webAppInstance.offEvent('viewportChanged', handleViewportChanged);
        webAppInstance.offEvent('themeChanged', handleThemeChanged);
      };
    }
    // Если SDK не найден (например, при разработке в обычном браузере), ничего не делаем.
    // Можно добавить console.warn, если нужно отслеживать такие случаи.
  }, []); // Пустой массив зависимостей означает, что useEffect выполнится один раз после монтирования

  // Функция для закрытия Telegram Mini App
  const onClose = useCallback(() => {
    tg?.close();
  }, [tg]);

  // Пример функции для управления главной кнопкой Telegram
  const onToggleButton = useCallback(() => {
    if (tg?.MainButton) {
      if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
      } else {
        // Перед показом кнопку обычно нужно настроить:
        // tg.MainButton.setText("МОЙ ТЕКСТ");
        // tg.MainButton.onClick(() => { /* какое-то действие */ tg.MainButton.hide(); });
        tg.MainButton.show();
      }
    }
  }, [tg]);

  // Функция для установки цвета фона приложения через Telegram SDK
  const setTgBackgroundColor = useCallback((color: string) => {
    if (tg?.setBackgroundColor) {
      try {
        tg.setBackgroundColor(color);
      } catch (error) {
        console.error("Failed to set Telegram background color:", error);
      }
    }
  }, [tg]);

  // Функция для установки цвета хедера приложения через Telegram SDK
  // colorKey должен быть одним из валидных ключей (например, 'bg_color', 'secondary_bg_color')
  const setTgHeaderColor = useCallback((colorKey: TelegramWebApp.HeaderColorKey) => {
    if (tg?.setHeaderColor) {
      try {
        tg.setHeaderColor(colorKey);
      } catch (error) {
        console.error("Failed to set Telegram header color:", error);
      }
    }
  }, [tg]);

  // Возвращаем объект с данными и функциями для использования в компонентах
  return {
    tg, // Сам объект Telegram.WebApp для прямого доступа, если нужно
    webApp: tg, // Альтернативное имя для tg, для удобства
    user, // Данные пользователя
    initDataUnsafe, // "Сырые" данные инициализации
    queryId: initDataUnsafe?.query_id, // ID текущего запроса (если есть)
    onClose, // Функция закрытия приложения
    onToggleButton, // Пример функции для главной кнопки
    isExpanded, // Флаг: развернуто ли приложение
    viewportHeight, // Высота видимой области
    themeParams, // Параметры темы
    setBackgroundColor: setTgBackgroundColor, // Установить цвет фона
    setHeaderColor: setTgHeaderColor, // Установить цвет хедера
  };
}