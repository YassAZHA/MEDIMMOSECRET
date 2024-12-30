export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'villa' | 'traditional';
  location: string;
  price: number;
  images: string[];
  features: string[];
  available: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface FilterProps {
  type: string;
  location: string;
  priceRange: string;
}

export type Language = 'fr' | 'en';