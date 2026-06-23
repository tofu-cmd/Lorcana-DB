import { useEffect, useState } from 'react';
import { getMockCards } from '@/lib/mockData';

export interface LorcanaCard {
  id?: string;
  Name: string;
  Image: string;
  Rarity: string;
  Franchise: string;
  InkColor?: string;
  Cost?: number;
  Power?: number;
  Type?: string;
  Ability?: string;
  [key: string]: any;
}

interface UseLorcanaCardsOptions {
  pageSize?: number;
  page?: number;
  search?: string;
}

interface UseLorcanaCardsResult {
  cards: LorcanaCard[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const API_BASE = 'https://api.lorcana-api.com';

export function useLorcanaCards(options: UseLorcanaCardsOptions = {}): UseLorcanaCardsResult {
  const { pageSize = 30, page = 1, search } = options;
  const [cards, setCards] = useState<LorcanaCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);

      try {
        let url: string;

        if (search) {
          const encodedQuery = encodeURIComponent(`name~${search}`);
          url = `${API_BASE}/cards/fetch?search=${encodedQuery}&pagesize=${pageSize}&page=${page}`;
        } else {
          url = `${API_BASE}/cards/all?pagesize=${pageSize}&page=${page}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const cardArray = Array.isArray(data) ? data : [];

        setCards(cardArray);

        // Estimate total pages based on response length
        if (cardArray.length < pageSize) {
          setTotalPages(page);
        } else {
          setTotalPages(Math.max(totalPages, page + 1));
        }
      } catch (err) {
        // Fallback to mock data on API failure
        console.warn('API unavailable, using mock data:', err);
        const mockCards = getMockCards(pageSize, page);
        setCards(mockCards);
        setTotalPages(Math.ceil(100 / pageSize));
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [pageSize, page, search]);

  return {
    cards,
    loading,
    error,
    totalPages,
    currentPage: page,
  };
}
