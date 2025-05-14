import { useEffect } from 'react';

const tg = window.Telegram.WebApp; // Теперь должно работать благодаря global.d.ts

export function useTelegram() {
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return {
    onClose,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  };
}