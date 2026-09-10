import { ParfaitProduct, SizeOption, ToppingOption } from '../types';

import heroParfaitImg from '../assets/images/Homepage.jpg';
import mangoBlissImg from '../assets/images/mango_bliss_1788947639820.jpg';
import berryCrunchImg from '../assets/images/berry_crunch_1788947660509.jpg';
import tropicalMixImg from '../assets/images/tropical_mix_1788947685171.jpg';
import brandStoryImg from '../assets/images/brand_story_1788947702546.jpg';

export { brandStoryImg, heroParfaitImg };

export const SIZES: SizeOption[] = [
  { id: 'regular', name: 'Regular', volume: '350ml', priceOffset: 0 },
  { id: 'large', name: 'Large', volume: '500ml', priceOffset: 1000 },
  { id: 'jumbo', name: 'Jumbo Feast', volume: '750ml', priceOffset: 2000 },
];

export const YOGURT_BASES = [
  { id: 'sweetened', name: 'Sweetened Greek Yogurt', desc: 'Lightly sweetened, silky smooth & creamy' },
  { id: 'unsweetened', name: 'Pure Unsweetened Greek', desc: 'Zero added sugar, rich in clean protein' },
];

export const TOPPINGS: ToppingOption[] = [
  { id: 'fresh-apple', name: 'Fresh Apple', price: 400, icon: '🍏' },
  { id: 'toasted-coconut-flakes', name: 'Toasted Coconut Flakes', price: 400, icon: '🥥' },
  { id: 'roasted-almond', name: 'Roasted Almond', price: 500, icon: '🥜' },
  { id: 'fresh-strawberries', name: 'Fresh Strawberries', price: 600, icon: '🍓' },
  { id: 'granola', name: 'Granola', price: 500, icon: '🥣' },
  { id: 'cashew', name: 'Cashew', price: 500, icon: '🌰' },
];

export const PRODUCTS: ParfaitProduct[] = [
  {
    id: 'classic-fruity-nest',
    name: 'Classic Fruity Nest',
    subtitle: 'Strawberries, Blueberries, Kiwi & Honey Granola',
    basePrice: 4500,
    rating: 5.0,
    reviewCount: 148,
    category: 'bestsellers',
    isBestSeller: true,
    badge: 'Signature',
    image: heroParfaitImg,
    description:
      'Our quintessential parfait masterpiece. Thick Greek yogurt layered between crisp golden oat granola, sliced sweet strawberries, plump blueberries, and tangy kiwi slices, lightly drizzled with pure honey.',
    ingredients: ['Greek Yogurt', 'Fresh Strawberries', 'Blueberries', 'Kiwi', 'Artisanal Granola', 'Wildflower Honey'],
    calories: '380 kcal',
  },
  {
    id: 'mango-bliss',
    name: 'Mango Bliss',
    subtitle: 'Sun-ripened Mango Chunks & Toasted Coconut',
    basePrice: 4000,
    rating: 4.9,
    reviewCount: 92,
    category: 'tropical',
    isBestSeller: true,
    badge: 'Customer Favorite',
    image: mangoBlissImg,
    description:
      'A tropical escape in every spoonful. Luscious, sun-ripened Nigerian mango chunks layered with velvety Greek yogurt, toasted crunchy coconut flakes, slow-baked granola, and a touch of fresh mango puree.',
    ingredients: ['Greek Yogurt', 'Ripe Mango Cubes', 'Toasted Coconut', 'Honey-baked Granola', 'Mango Puree Swirl'],
    calories: '360 kcal',
  },
  {
    id: 'berry-crunch',
    name: 'Berry Crunch',
    subtitle: 'Triple Berry Explosion with Double Granola',
    basePrice: 4500,
    rating: 5.0,
    reviewCount: 116,
    category: 'berries',
    isBestSeller: true,
    badge: 'High Antioxidant',
    image: berryCrunchImg,
    description:
      'Packed with superfood vitality. A generous trio of succulent strawberries, juicy raspberries, and crisp blueberries crowned with a double layer of toasted cinnamon oat clusters.',
    ingredients: ['Greek Yogurt', 'Strawberries', 'Raspberries', 'Blueberries', 'Double Oat Clusters', 'Chia Seeds'],
    calories: '390 kcal',
  },
  {
    id: 'tropical-mix',
    name: 'Tropical Mix',
    subtitle: 'Kiwi, Pineapple, Mango & Chia Seeds',
    basePrice: 4000,
    rating: 4.8,
    reviewCount: 79,
    category: 'tropical',
    isBestSeller: true,
    badge: 'Fresh & Vibrant',
    image: tropicalMixImg,
    description:
      'The ultimate refreshing blend of tropical delights. Fresh green kiwi wheels, sweet golden pineapple dices, juicy mango, and super-nutrient chia seeds nestled on rich Greek yogurt and crisp granola.',
    ingredients: ['Greek Yogurt', 'Fresh Kiwi', 'Sweet Pineapple', 'Ripe Mango', 'Organic Chia Seeds', 'Granola'],
    calories: '350 kcal',
  },
  {
    id: 'honey-almond-crunch',
    name: 'Honey Almond Granola',
    subtitle: 'Roasted Almond Slivers, Chia & Double Honey Clusters',
    basePrice: 4200,
    rating: 4.9,
    reviewCount: 64,
    category: 'crunch',
    isBestSeller: false,
    badge: 'High Fiber',
    image: heroParfaitImg,
    description:
      'For true granola fanatics. Double golden baked oats, slow-roasted California almonds, toasted sesame, chia seeds, and raw wildflower honey over thick probiotic Greek yogurt.',
    ingredients: ['Greek Yogurt', 'Roasted Almonds', 'Honey Baked Granola', 'Wildflower Honey', 'Organic Chia'],
    calories: '410 kcal',
  },
  {
    id: 'strawberry-vanilla-dream',
    name: 'Strawberry Vanilla Dream',
    subtitle: 'Sweetened Vanilla Greek, Farm Strawberries & Kiwi',
    basePrice: 4300,
    rating: 5.0,
    reviewCount: 88,
    category: 'berries',
    isBestSeller: false,
    badge: 'Chef Choice',
    image: berryCrunchImg,
    description:
      'Velvety Madagascar vanilla infused Greek yogurt generously topped with fresh juicy strawberries, sweet kiwi slices, and crispy oat crumble.',
    ingredients: ['Vanilla Greek Yogurt', 'Fresh Strawberries', 'Kiwi Slices', 'Crunchy Granola', 'Mint Leaf'],
    calories: '375 kcal',
  },
];

export interface MenuCategory {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  count: number;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'all',
    name: 'All Parfaits',
    shortDesc: 'Browse our full handcrafted menu',
    icon: '✨',
    count: 6,
  },
  {
    id: 'bestsellers',
    name: 'Signature Classics',
    shortDesc: 'Our original top-rated creations',
    icon: '👑',
    count: 2,
  },
  {
    id: 'berries',
    name: 'Berry Loaded',
    shortDesc: 'Antioxidant packed with triple berries',
    icon: '🍓',
    count: 2,
  },
  {
    id: 'tropical',
    name: 'Tropical Paradise',
    shortDesc: 'Sweet Nigerian mango, pineapple & kiwi',
    icon: '🥭',
    count: 2,
  },
  {
    id: 'crunch',
    name: 'Granola & Crunch',
    shortDesc: 'Double baked clusters & roasted nuts',
    icon: '🥣',
    count: 1,
  },
];

