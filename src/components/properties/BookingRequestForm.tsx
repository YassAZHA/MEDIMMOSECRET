import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { sendBookingRequest } from '../../services/email';
import { formatDate } from '../../utils/format';
import { useBookingRequestForm } from '../../hooks/useBookingRequestForm';

interface BookingRequestFormProps {
  propertyId: string;
  propertyTitle: string;
  selectedDates: [Date | null, Date | null];
}

export default function BookingRequestForm({ 
  propertyId,
  propertyTitle,
  selectedDates 
}: BookingRequestFormProps) {
  const {
    formData,
    loading,
    success,
    error,
    handleSubmit,
    handleChange
  } = useBookingRequestForm({
    propertyId,
    propertyTitle,
    selectedDates
  });

  const [startDate, endDate] = selectedDates;

  if (success) {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-center">
        <h3 className="text-green-800 font-semibold mb-2">
          Demande envoyée avec succès !
        </h3>
        <p className="text-green-700">
          Nous avons bien reçu votre demande de réservation. Notre équipe vous contactera dans les plus brefs délais.
        </p>
      </div>
    );
  }

  if (!startDate || !endDate) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <p className="text-gray-600">
          Veuillez sélectionner vos dates de séjour dans le calendrier ci-dessus
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Dates sélectionnées:</p>
        <p className="font-medium">
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom complet *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (optionnel)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="animate-spin h-5 w-5" />
            Envoi en cours...
          </>
        ) : (
          'Envoyer ma demande'
        )}
      </button>
    </form>
  );
}