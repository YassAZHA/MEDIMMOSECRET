import React from 'react';
import PropertyCard from '../PropertyCard';
import { Property } from '../../types';
import PropertySkeleton from './PropertySkeleton';

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

export default function PropertyGrid({ properties, loading, error }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <PropertySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun bien ne correspond à vos critères.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}