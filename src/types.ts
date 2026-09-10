export type ParfaitCategory = 'all' | 'bestsellers' | 'berries' | 'tropical' | 'crunch';

export interface SizeOption {
  id: string;
  name: string;
  volume: string;
  priceOffset: number;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  icon?: string;
}

export interface ParfaitProduct {
  id: string;
  name: string;
  subtitle: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  category: ParfaitCategory;
  isBestSeller?: boolean;
  image: string;
  description: string;
  ingredients: string[];
  calories: string;
  badge?: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  productImage: string;
  size: SizeOption;
  yogurtType: string;
  toppings: ToppingOption[];
  specialNotes?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type OrderStatus = 'received' | 'preparing' | 'dispatched' | 'delivered';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  deliveryNotes?: string;
  deliveryTime: 'immediate' | 'scheduled';
  scheduledTime?: string;
}

export interface OrderPayment {
  method: 'bank_transfer' | 'delivery' | 'card';
  status: 'paid' | 'pending_verification';
  reference: string;
  bankName?: string;
  accountNumber?: string;
}

export interface CustomerProfile {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  area?: string;
  savedAt?: string;
}

export interface Order {
  orderId: string; // e.g. FN-7842
  dispatchCode?: string; // Optional legacy or fallback code
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: OrderCustomer;
  payment: OrderPayment;
  status: OrderStatus;
  reviewSubmitted: boolean;
  reviewToken: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  location?: string;
  parfaitName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  orderId?: string;
}
