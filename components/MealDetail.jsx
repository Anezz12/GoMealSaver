import Image from 'next/image';
import {
  FaClock,
  FaUtensils,
  FaStore,
  FaMapMarkerAlt,
  FaTimes,
  FaBoxOpen,
  FaShoppingCart,
} from 'react-icons/fa';
import MealMap from './MealMap';

export default function MealDetail({ meal }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - Image and Map */}
        <div className="space-y-6">
          {/* Image Section */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={meal.image[0]}
              alt={meal.name}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* Availability Tag */}
            {meal.available ? (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide">
                Available Now
              </div>
            ) : (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2">
                <FaTimes /> Sold Out
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Restaurant Location
              </h3>
            </div>
            <div className="h-64 md:h-80 border-b">
              <MealMap meal={meal} />
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="flex-grow">
                <p className="font-medium text-gray-700">
                  {meal.restaurant.address}
                </p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                <FaMapMarkerAlt />
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Meal Details */}
        <div className="space-y-6">
          {/* Cuisine and Name */}
          <div>
            <p className="text-gray-500 uppercase tracking-wide text-sm">
              {meal.cuisine}
            </p>
            <h1 className="text-4xl font-bold text-gray-800 mt-2">
              {meal.name}
            </h1>
          </div>

          {/* Pricing with Discount */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-5 rounded-2xl text-center space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-xl font-bold text-sm">
              {meal.discountPercentage}% OFF
            </div>

            <div className="space-y-1">
              <div className="flex justify-center items-baseline space-x-3">
                <span className="text-3xl font-bold text-emerald-600">
                  Rp.{meal.price.toFixed(3)}
                </span>
                <span className="text-gray-400 line-through text-lg opacity-70">
                  Rp.{meal.originalPrice.toFixed(3)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Hemat Rp.{(meal.originalPrice - meal.price).toFixed(3)}
              </p>
            </div>

            {/* Checkout Button */}
            {meal.available && (
              <div className="mt-4">
                <a
                  href={`/meals/checkout/${meal._id}`}
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 font-semibold"
                >
                  <FaShoppingCart className="text-lg" />
                  Checkout Now
                </a>
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="flex space-x-6">
            <div className="flex items-center gap-2 text-blue-600">
              <FaClock className="text-lg" />
              <span className="font-medium">
                {meal.timeRemaining} mins left
              </span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <FaUtensils className="text-lg" />
              <span className="font-medium">{meal.portionSize} Portion</span>
            </div>
          </div>

          {/* Stock and Orders Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Stock Card */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-grow">
                  <p className="text-gray-500 text-xs sm:text-sm font-medium truncate">
                    Stock Quantity
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                    {meal.stockQuantity}
                  </p>
                </div>
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                  <FaBoxOpen className="text-base sm:text-xl text-blue-600" />
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-grow">
                  <p className="text-gray-500 text-xs sm:text-sm font-medium truncate">
                    Total Orders
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
                    {meal.totalOrders}
                  </p>
                </div>
                <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                  <FaShoppingCart className="text-base sm:text-xl text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div>
            {meal.available ? (
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Available for Order
              </div>
            ) : (
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Currently Unavailable
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{meal.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Features
            </h2>
            <div className="flex flex-wrap gap-2">
              {meal.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Restaurant Information */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Restaurant Information
            </h2>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <FaStore className="text-green-600 text-2xl" />
              <div>
                <p className="font-bold text-gray-800">
                  {meal.restaurant.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {meal.restaurant.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
