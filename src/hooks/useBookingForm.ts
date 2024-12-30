import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { formatISODate } from '../utils/date';
import { sendBookingRequestEmail } from '../services/email';

interface BookingFormData {
  propertyId: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: 'waiting' | 'confirmed';
  totalPrice: number;
}

interface BookingFormErrors {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  submit?: string;
}

export function useBookingForm(initialData: BookingFormData) {
  const [formData, setFormData] = useState<BookingFormData>(initialData);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: BookingFormErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Le nom est requis';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'L\'email n\'est pas valide';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Le téléphone est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return false;
      }

      setLoading(true);
      setErrors({});

      // Format dates to ISO format for database
      const checkIn = formatISODate(formData.checkIn);
      const checkOut = formatISODate(formData.checkOut);

      // Create booking in database
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          property_id: formData.propertyId,
          check_in: checkIn,
          check_out: checkOut,
          status: formData.status,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone,
          total_price: formData.totalPrice
        }]);

      if (bookingError) throw bookingError;

      // Send email notification
      await sendBookingRequestEmail(formData);

      return true;
    } catch (err) {
      console.error('Error creating booking:', err);
      setErrors(prev => ({
        ...prev,
        submit: 'Une erreur est survenue lors de la réservation'
      }));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof BookingFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  };
}