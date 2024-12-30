import { useState } from 'react';
import { PropertyFormData, PropertyFormErrors } from '../types/property';
import { Property } from '../types';

const initialFormData: PropertyFormData = {
  title: '',
  type: '',
  description: '',
  location: '',
  address: '',
  features: [],
  images: [],
  price: '',
  status: 'available'
};

export function usePropertyForm(initialProperty?: Property) {
  const [formData, setFormData] = useState<PropertyFormData>(
    initialProperty 
      ? {
          ...initialProperty,
          price: initialProperty.price.toString(),
          status: initialProperty.available ? 'available' : 'occupied'
        }
      : initialFormData
  );
  const [errors, setErrors] = useState<PropertyFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: PropertyFormErrors = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.type) {
      newErrors.type = 'Property type is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.price || isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return { formData, errors, handleChange, setFormData, validateForm };
}