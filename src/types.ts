export interface Game {
  id: string;
  title: string;
  subtitle: string;
  category: 'Matematika' | 'Bahasa' | 'Coding' | 'Sains';
  age: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
  color: string;
  gradient: string;
  iconName: string;
  description: string;
  features: string[];
  bannerUrl?: string;
}

export interface CartItem {
  game: Game;
  quantity: number;
}

export interface PromoCode {
  code: string;
  title: string;
  discountPercent?: number;
  fixedDiscount?: number;
  minSpend?: number;
  description: string;
}

export interface CashbackItem {
  orderId: string;
  date: string;
  amount: number;
}

export interface OrderState {
  parentName: string;
  email: string;
  whatsapp: string;
  childName: string;
  childAge: string;
  paymentMethod: 'qris' | 'ewallet' | 'va';
  ewalletProvider: 'gopay' | 'ovo' | 'dana' | 'shopeepay';
  vaBank: 'bca' | 'mandiri' | 'bni' | 'bri';
  appliedPromo: string;
  useCashbackWallet: boolean;
  orderId: string;
  childPin: string;
  paidAt: string;
  bundleAddonSelected: boolean;
}
