import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyForm from '../../../components/admin/properties/PropertyForm';
import { useProperty } from '../../../hooks/useProperty';

export default function EditProperty() {
  const { id } = useParams();
  const { property, loading, error } = useProperty(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Property</h1>
      <PropertyForm initialData={property} mode="edit" />
    </div>
  );
}