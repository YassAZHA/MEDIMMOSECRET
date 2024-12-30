export interface PropertyFormData {
  title: string;
  type: string;
  description: string;
  location: string;
  address: string;
  features: string[];
  images: string[];
  price: string;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface PropertyFormErrors {
  title?: string;
  type?: string;
  description?: string;
  location?: string;
  address?: string;
  features?: string;
  images?: string;
  price?: string;
}

export interface PropertyFormProps {
  formData: PropertyFormData;
  errors: PropertyFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}