import { useEffect, useState } from 'react';
import type { GoogleGuest } from '../types';

export const useGuest = () => {
  const [guest, setGuest] = useState<GoogleGuest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');

    // Если параметра id нет в ссылке, просто выключаем лоадер
    if (!idParam) {
      setLoading(false);
      return;
    }

    // Тот самый URL из вашей панели Stein (обязательно с /guests на конце)
    const STEIN_API_URL =
      'https://api.steinhq.com/v1/storages/6af0bb5b92b1163e976018e3/guests';

    fetch(`${STEIN_API_URL}?search=${JSON.stringify({ id: idParam })}`)
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки данных с сервера');
        return res.json();
      })
      .then((data: GoogleGuest[]) => {
        // Проверяем, что нам вернулся массив и он не пустой
        if (data && data.length > 0) {
          setGuest(data[0]); // Сохраняем первого найденного гостя
        }
      })
      .catch((err) => {
        console.error('Ошибка в хуке useGuest:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { guest, loading };
};
