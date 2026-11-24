export interface CornerItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'glasshouse' | 'terrace' | 'lounge' | 'bar';
  image: string;
  description: string;
  ambiance: string;
  features: string[];
  vibeColor: string;
}

export type DietaryType = 'veg' | 'non-veg' | 'beverage' | 'sheesha';

export interface MenuItem {
  id: string;
  name: string;
  category:
    | 'kebabs'
    | 'continental'
    | 'burgers_sandwiches'
    | 'chinese'
    | 'indian_mains'
    | 'beverages'
    | 'desserts'
    | 'sheesha';
  price: string;
  dietary: DietaryType;
  description?: string;
  badge?: string;
  highlight?: boolean;
}

export interface MenuCardPage {
  id: string;
  pageNumber: number;
  title: string;
  category: string;
  image: string;
}

export interface ReservationPayload {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  cornerPreference: string;
  occasion: string;
  specialRequests?: string;
  selectedDishes?: string[];
}

export interface TakeawayPayload {
  name: string;
  phone: string;
  pickupTime: string;
  orderType: 'counter_takeaway';
  notes?: string;
  dishes: string[];
  totalAmount: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  quantity: number;
  dietary?: DietaryType;
  category?: string;
}

export interface DirectOrderPayload {
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: 'takeaway_counter' | 'dine_in_table';
  tableOrTime: string;
  specialInstructions?: string;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  totalAmount: number;
  orderTime: string;
  estimatedPrepTime: string;
}
