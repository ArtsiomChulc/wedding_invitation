import { useEffect, useState } from 'react';
import type { GoogleGuest } from '../types';

export const useGuest = () => {
  const [guest, setGuest] = useState<GoogleGuest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');

    // Если в URL нет ?id=, отключаем загрузку и показываем дефолтный текст
    if (!idParam) {
      setLoading(false);
      return;
    }

    const STEIN_API_URL =
      'https://api.steinhq.com/v1/storages/6af0bb5b92b1163e976018e3/guests';

    fetch(`${STEIN_API_URL}?search=${JSON.stringify({ id: idParam })}`)
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then((data: GoogleGuest[]) => {
        if (data && data.length > 0) {
          setGuest(data[0]); // Сохраняем найденного гостя
        }
      })
      .catch((err) => console.error('Не удалось загрузить гостя:', err))
      .finally(() => setLoading(false));
  }, []);

  return { guest, loading };
};
