import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingForm } from '../../../hooks/useBookingForm';
import { Property } from '../../../types/property';
import DatePicker from '../../common/DatePicker';
import { Loader } from 'lucide-react';
import ClientSelector from '../clients/ClientSelector';

interface BookingFormProps {
  properties: Property[];
  initialData?: any;
  mode?: 'create' | 'edit';
}

export default function BookingForm({ properties, initialData, mode = 'create' }: BookingFormProps) {
  const navigate = useNavigate();
  const { formData, errors, loading, handleChange, handleClientSelect, handleSubmit } = useBookingForm(initialData);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await handleSubmit()) {
      navigate('/admin/bookings');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Propriété
        </label>
        <select
          name="propertyId"
          value={formData.propertyId}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Sélectionner une propriété</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.title}
            </option>
          ))}
        </select>
        {errors.propertyId && (
          <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client
        </label>
        <ClientSelector
          onClientSelect={handleClientSelect}
          selectedClientId={formData.clientId}
        />
        {errors.clientId && (
          <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date d'arrivée
          </label>
          <DatePicker
            selected={formData.checkIn ? new Date(formData.checkIn) : null}
            onChange={(date) => handleChange({
              target: { name: 'checkIn', value: date?.toISOString().split('T')[0] }
            } as any)}
            minDate={new Date()}
            placeholderText="Sélectionner la date d'arrivée"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.checkIn && (
            <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de départ
          </label>
          <DatePicker
            selected={formData.checkOut ? new Date(formData.checkOut) : null}
            onChange={(date) => handleChange({
              target: { name: 'checkOut', value: date?.toISOString().split('T')[0] }
            } as any)}
            minDate={formData.checkIn ? new Date(formData.checkIn) : new Date()}
            placeholderText="Sélectionner la date de départ"
            className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.checkOut && (
            <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="waiting">En attente</option>
          <option value="confirmed">Confirmé</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status}</p>
        )}
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/admin/bookings')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <Loader className="animate-spin h-4 w-4" />}
          {mode === 'create' ? 'Créer la réservation' : 'Mettre à jour'}
        </button>
      </div>
    </form>
  );
}