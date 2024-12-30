import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks/useProperty';
import { MapPin, Euro, Check, Loader } from 'lucide-react';
import PropertyCalendar from '../components/properties/PropertyCalendar';
import BookingRequestForm from '../components/properties/BookingRequestForm';

export default function PropertyDetails() {
  const { id } = useParams();
  const { property, loading, error } = useProperty(id);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || 'Property not found'}</p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Images Gallery */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="col-span-2 md:col-span-1">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {property.images.slice(1, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-[195px] object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Property Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-display">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">{property.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 font-display">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 font-display">Calendrier des disponibilités</h2>
              <PropertyCalendar 
                propertyId={property.id}
                onDateChange={setSelectedDates}
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-2xl font-bold text-primary">
                  <Euro className="h-6 w-6 mr-1" />
                  <span>{property.price}</span>
                </div>
                <span className="text-gray-600">/ nuit</span>
              </div>
              <BookingRequestForm 
                propertyId={property.id}
                propertyTitle={property.title}
                selectedDates={selectedDates}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}