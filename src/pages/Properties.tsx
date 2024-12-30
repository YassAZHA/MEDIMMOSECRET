import React from 'react';
import PropertyGrid from '../components/properties/PropertyGrid';
import { useProperties } from '../hooks/useProperties';
import SEO from '../components/seo/SEO';

export default function Properties() {
  const { properties, loading, error } = useProperties();

  return (
    <>
      <SEO 
        title="Nos Biens"
        description="Découvrez notre sélection de propriétés d'exception à Tanger"
      />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold font-display mb-8 text-center">
            Nos Biens d'Exception
          </h1>
          <PropertyGrid properties={properties} loading={loading} error={error} />
        </div>
      </div>
    </>
  );
}