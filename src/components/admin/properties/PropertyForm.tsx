import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePropertyForm } from '../../../hooks/usePropertyForm';
import PropertyBasicInfo from './form-sections/PropertyBasicInfo';
import PropertyLocation from './form-sections/PropertyLocation';
import PropertyFeatures from './form-sections/PropertyFeatures';
import PropertyPricing from './form-sections/PropertyPricing';
import PropertyImages from './form-sections/PropertyImages';
import { Property } from '../../../types';
import { supabase } from '../../../lib/supabase';

interface PropertyFormProps {
  initialData?: Property;
  mode?: 'create' | 'edit';
}

export default function PropertyForm({ initialData, mode = 'create' }: PropertyFormProps) {
  const navigate = useNavigate();
  const { formData, errors, handleChange, setFormData } = usePropertyForm(initialData);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        available: formData.status === 'available'
      };

      const { error } = mode === 'create'
        ? await supabase.from('properties').insert([propertyData])
        : await supabase
            .from('properties')
            .update(propertyData)
            .eq('id', initialData?.id);

      if (error) throw error;
      
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <PropertyBasicInfo formData={formData} errors={errors} onChange={handleChange} />
      <PropertyLocation formData={formData} errors={errors} onChange={handleChange} />
      <PropertyImages formData={formData} errors={errors} onChange={handleChange} />
      <PropertyFeatures formData={formData} errors={errors} onChange={handleChange} />
      <PropertyPricing formData={formData} errors={errors} onChange={handleChange} />
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/admin/properties')}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create Property' : 'Update Property'}
        </button>
      </div>
    </form>
  );
}