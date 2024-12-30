import React from 'react';
import BookingsTable from '../../../components/admin/bookings/BookingsTable';
import { useBookings } from '../../../hooks/useBookings';
import { Loader } from 'lucide-react';

export default function BookingsList() {
  const { bookings, loading, error, updateBookingStatus } = useBookings();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="text-gray-600">Manage your property bookings</p>
      </div>
      
      <BookingsTable
        bookings={bookings}
        onStatusChange={updateBookingStatus}
      />
    </div>
  );
}