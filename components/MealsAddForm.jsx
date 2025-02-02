'use client';
import { useState } from 'react';
import addMeals from '@/app/actions/addMeals';
import { debounce } from 'lodash';

export default function MealAddForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce the submit handler to prevent multiple rapid submissions
  const debouncedSubmit = debounce(async (formData) => {
    try {
      setIsSubmitting(true);
      await addMeals(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, 500); // 500ms delay

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await debouncedSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl text-center font-semibold mb-6">Add New Meal</h2>

      {/* Basic Meal Info */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Meal Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Chicken Rice Bowl"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cuisine" className="block text-gray-700 font-bold mb-2">
          Cuisine Type
        </label>
        <select
          id="cuisine"
          name="cuisine"
          className="border rounded w-full py-2 px-3"
          required
        >
          <option value="">Select Cuisine Type</option>
          <option value="Asian Cuisine">Asian Cuisine</option>
          <option value="Italian Cuisine">Italian Cuisine</option>
          <option value="Western Cuisine">Western Cuisine</option>
          <option value="Local Delights">Local Delights</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="3"
          placeholder="Describe your meal"
          required
        ></textarea>
      </div>

      {/* Availability Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Meal Availability
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="available"
            name="available"
            defaultChecked={true}
            className="mr-2"
          />
          <label htmlFor="available">Available for Sale</label>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Uncheck if this meal is temporarily unavailable
        </p>
      </div>

      {/* Pricing and Portion */}
      <div className="mb-4 bg-green-50 p-4 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Pricing & Portion
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="originalPrice"> Price (Rp)</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              step="0.01"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label htmlFor="discountPercentage">Discount (%)</label>
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              min="0"
              max="100"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label htmlFor="price">Final Price (Rp)</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label htmlFor="portionSize">Portion Size</label>
            <select
              id="portionSize"
              name="portionSize"
              className="border rounded w-full py-2 px-3"
              required
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Family">Family Size</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="timeRemaining">Time Remaining</label>
          <input
            type="number"
            id="timeRemaining"
            name="timeRemaining"
            placeholder="eg. 30 mins"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
      </div>

      {/* New Stock and Orders Section */}
      <div className="mb-4 bg-blue-50 p-4 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Stock and Order Information
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              min="0"
              className="border rounded w-full py-2 px-3"
              placeholder="Available stock quantity"
              required
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Enter the current stock quantity and total orders for this meal.
        </p>
      </div>

      {/* Features */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Features</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            'Halal Certified',
            'Eco-Friendly Packaging',
            'Contactless Pickup',
            'Fresh Ingredients',
            'Last Minute Deal',
            'Quick Pickup',
            'Best Value',
            'Spice Level Adjustable',
            'Utensils Included',
            'Nutritional Info',
            'Food Waste Prevention',
          ].map((feature) => (
            <div key={feature} className="flex items-center">
              <input
                type="checkbox"
                id={`feature_${feature}`}
                name="features"
                value={feature}
                className="mr-2"
              />
              <label htmlFor={`feature_${feature}`}>{feature}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mb-4 bg-green-50 p-4 rounded">
        <label className="block text-gray-700 font-bold mb-2">
          Restaurant Information
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            id="restaurant_name"
            name="restaurant.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Restaurant Name"
            required
          />
          <input
            type="text"
            id="restaurant_address"
            name="restaurant.address"
            className="border rounded w-full py-2 px-3"
            placeholder="Address"
            required
          />
          <input
            type="text"
            id="restaurant_city"
            name="restaurant.city"
            className="border rounded w-full py-2 px-3"
            placeholder="City"
            required
          />
          <input
            type="text"
            id="restaurant_state"
            name="restaurant.state"
            className="border rounded w-full py-2 px-3"
            placeholder="State"
            required
          />
          <input
            type="email"
            id="restaurant_email"
            name="restaurant.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email Address"
            required
          />
          <input
            type="tel"
            id="restaurant_phone"
            name="restaurant.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Meal Images
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Upload at least one image of your meal. The first image will be used
          as the profile image, and the second image will be used as the
          background image.
        </p>
      </div>

      <div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline relative"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="opacity-0">Add Meal</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            'Add Meal'
          )}
        </button>
      </div>
    </form>
  );
}
