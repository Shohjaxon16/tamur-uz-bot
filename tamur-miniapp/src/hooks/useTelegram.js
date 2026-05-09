import { useEffect } from 'react';

const tg = window.Telegram?.WebApp;

export function useTelegram() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onClose = () => tg?.close();

  const showMainButton = (text, onClick) => {
    if (!tg) return;
    tg.MainButton.text = text;
    tg.MainButton.color = '#C8A96E';
    tg.MainButton.textColor = '#111111';
    tg.MainButton.show();
    tg.MainButton.onClick(onClick);
  };

  const hideMainButton = () => tg?.MainButton.hide();

  const haptic = (type = 'light') => {
    tg?.HapticFeedback.impactOccurred(type);
  };

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    onClose,
    showMainButton,
    hideMainButton,
    haptic,
    colorScheme: tg?.colorScheme || 'dark'
  };
}
