import React from 'react';
import { Send } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';

export default function ContactForm() {
  const { formData, errors, handleChange, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-200 focus:border-[#9DC44D] focus:ring-1 focus:ring-[#9DC44D]"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-200 focus:border-[#9DC44D] focus:ring-1 focus:ring-[#9DC44D]"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-200 focus:border-[#9DC44D] focus:ring-1 focus:ring-[#9DC44D]"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#9DC44D] text-white px-6 py-3 rounded hover:bg-[#8BB43D] transition-colors flex items-center justify-center gap-2"
        >
          <Send className="h-5 w-5" />
          <span>Envoyer</span>
        </button>
      </div>
    </form>
  );
}