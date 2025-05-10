import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: 'Hifi Parts',
    detail: 'Starting from $. 12',
    imageUrl: 'assets/hifiPart.png',
  },
  {
    id: 2,
    name: 'Coffee Machines Parts',
    detail: 'Starting from $. 20',
    imageUrl: 'assets/coffePart.png',
  },
  {
    id: 3,
    name: 'Catering Part',
    detail: 'Starting from $. 18',
    imageUrl: 'assets/cateringPart.png',
  },
];

const StoreComponent = () => {
  const navigate = useNavigate(); // ✅ Correct: inside the component

  return (
    <div className="min-h-fit mt-10 bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-red-500">Our Store</h1>
          <button 
            onClick={() => navigate("/cart")} 
            className="flex items-center gap-2 bg-red-700 hover:bg-white text-white hover:text-black hover:shadow-lg hover:shadow-red-500/80 px-4 py-2 rounded-full text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            View Cart
          </button>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black rounded-xl overflow-hidden hover:shadow-lg transition group p-4 flex flex-col justify-between"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition"
              />
              <div>
                <h2 className="text-lg font-bold mb-1">{product.name}</h2>
                <p className="text-sm text-gray-400 mb-4">{product.detail}</p>
              </div>
              <button 
                onClick={() => navigate("/shop")}
                className="bg-red-700 hover:bg-black text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/80"
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreComponent;
