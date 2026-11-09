import { useEffect, useState } from 'react';
import type { GoogleGuest } from '../types';

export const useGuest = () => {
  const [guest, setGuest] = useState<GoogleGuest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');

    if (!idParam) {
      setLoading(false);
      return;
    }

    const STEIN_API_URL =
      'https://api.steinhq.com/v1/storages/6af0bb5b92b1163e976018e3/guests';

    fetch(STEIN_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: GoogleGuest[]) => {
        if (!Array.isArray(data)) return;

        const foundGuest = data.find(
          (item) =>
            item &&
            item.id &&
            String(item.id).trim().toLowerCase() ===
              String(idParam).trim().toLowerCase()
        );

        if (foundGuest) {
          setGuest(foundGuest);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { guest, loading };
};
