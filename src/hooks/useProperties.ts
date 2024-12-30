import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property } from '../types';
import { supabase } from '../lib/supabase';

export function useProperties() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('properties')
          .select('*');

        // Apply filters from URL
        const type = searchParams.get('type');
        const location = searchParams.get('location');
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');

        if (type) {
          query = query.eq('type', type);
        }
        
        if (location) {
          query = query.ilike('location', `%${location}%`);
        }

        // Handle date filtering
        if (checkIn && checkOut) {
          query = query.eq('available', true);
        }

        const { data, error: fetchError } = await query;
        
        if (fetchError) throw fetchError;
        setProperties(data || []);
        
      } catch (err) {
        setError('Error loading properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  return { properties, loading, error };
}