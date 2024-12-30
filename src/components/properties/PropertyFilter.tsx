import React from 'react';
import { FilterProps } from '../../types';

export default function PropertyFilter({ onFilter }: { onFilter: (filters: FilterProps) => void }) {
  const [filters, setFilters] = React.useState<FilterProps>({
    type: '',
    location: '',
    priceRange: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid md:grid-cols-3 gap-4">
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Type de bien</option>
          <option value="apartment">Appartement</option>
          <option value="villa">Villa</option>
          <option value="traditional">Maison traditionnelle</option>
        </select>

        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Quartier</option>
          <option value="medina">Médina</option>
          <option value="malabata">Malabata</option>
          <option value="centre">Centre-ville</option>
        </select>

        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Prix</option>
          <option value="0-100">0-100€</option>
          <option value="100-200">100-200€</option>
          <option value="200+">200€+</option>
        </select>
      </div>
    </div>
  );
}