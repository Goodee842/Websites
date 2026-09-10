import { CustomerReview } from '../types';

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Fevo',
    location: 'Uyo',
    parfaitName: 'Classic Fruity Nest',
    rating: 5,
    date: 'Just now',
    comment:
      'The parfait was chilled to perfection! Thick Greek yogurt, extra crunchy granola, and fresh fruits. Picked it up from EFG Nwaniba road in minutes.',
    verified: true,
    orderId: 'FN-8201',
  },
  {
    id: 'rev-2',
    customerName: 'Emem Bassey',
    location: 'Uyo',
    parfaitName: 'Berry Crunch',
    rating: 5,
    date: 'Yesterday',
    comment:
      'Genuinely the best parfait in Uyo. Picked mine up at Metropolitan Supermarket Oron Road and the toasted coconut with fresh strawberries was sensational.',
    verified: true,
    orderId: 'FN-7934',
  },
  {
    id: 'rev-3',
    customerName: 'Idongesit Udoh',
    location: 'Uruan',
    parfaitName: 'Mango Bliss',
    rating: 5,
    date: '2 days ago',
    comment:
      'Mango Bliss is pure bliss! Not overly sweet, perfect balance of rich unsweetened yogurt and fresh mango cubes. Delivered fresh to campus.',
    verified: true,
    orderId: 'FN-7840',
  },
  {
    id: 'rev-4',
    customerName: 'Aniefiok Ekong',
    location: 'Itu',
    parfaitName: 'Tropical Mix',
    rating: 5,
    date: '4 days ago',
    comment:
      'Loved how neat and cold the packaging was from EFG Abak Road. Everyone in our office loved the roasted almonds and sliced green apples!',
    verified: true,
    orderId: 'FN-7512',
  },
  {
    id: 'rev-5',
    customerName: 'Kufre Daniel',
    location: 'Ibesikpo Asutan',
    parfaitName: 'Berry Crunch',
    rating: 5,
    date: '5 days ago',
    comment:
      'Super rich unsweetened Greek yogurt with generous cashew and crunchy granola. Fast pickup service!',
    verified: true,
    orderId: 'FN-7104',
  },
];

const REVIEWS_STORAGE_KEY = 'fruitynest_customer_reviews';

export function getStoredReviews(): CustomerReview[] {
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load stored reviews', e);
  }
  return INITIAL_REVIEWS;
}

export function saveNewReview(review: CustomerReview): CustomerReview[] {
  const current = getStoredReviews();
  const updated = [review, ...current];
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save review', e);
  }
  return updated;
}
