import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-hot-toast';
import { Plus, ShoppingCart, Search, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '../getApiUrl';
import { Helmet } from "react-helmet-async";

const categories = [
  {
    name: 'Coffee Machine Parts',
    subcategories: ['Grinders', 'Boilers', 'Group Heads'],
    icon: '☕'
  },
  {
    name: 'Catering Parts',
    subcategories: ['Ovens', 'Dishwashers', 'Fryers'],
    icon: '🍳'
  },
  {
    name: 'HiFi Parts',
    subcategories: ['Speakers', 'Amplifiers', 'Cables'],
    icon: '🎵'
  },
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addToCart, cartCount } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(getApiUrl('/api/products'));
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#1F2937',
        color: '#fff',
        border: '1px solid #374151',
      },
      iconTheme: {
        primary: '#EF4444',
        secondary: '#fff',
      },
    });
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSearchQuery('');
  };

  return (
    <>
  <Helmet>
    <title>Shop Equipment Parts | Syntrad</title>
    <meta
      name="description"
      content="Browse and purchase spare parts for coffee machines, catering equipment, and HiFi systems. High-quality components available across the UK."
    />
    <meta
      name="keywords"
      content="Syntrad shop, equipment parts, coffee machine parts, catering equipment, HiFi parts, grinders, boilers, amplifiers"
    />
    <meta name="robots" content="index, follow" />
    
    <meta property="og:title" content="Shop Equipment Parts | Syntrad" />
    <meta
      property="og:description"
      content="Find reliable parts for your commercial and home equipment. Buy coffee machine, catering, and HiFi system parts online at Syntrad."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.syntrad.com/shop" />
    <meta property="og:image" content="https://www.syntrad.com/assets/shop-cover.png" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Shop Equipment Parts | Syntrad" />
    <meta
      name="twitter:description"
      content="Shop commercial parts online for catering, HiFi, and coffee equipment. Quality and convenience with Syntrad."
    />
    <meta name="twitter:image" content="https://www.syntrad.com/assets/shop-cover.png" />
  </Helmet>

    <div className="min-h-screen bg-black">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
      >
        <Filter className="w-6 h-6" />
      </button>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || !window.matchMedia('(max-width: 768px)').matches) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed md:relative top-0 left-0 h-full w-80 md:w-64 bg-gradient-to-b from-red-900/20 to-black text-white p-6 border-r border-red-900/20 z-50 md:z-0 overflow-y-auto"
            >
              {window.matchMedia('(max-width: 768px)').matches && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              )}

              <h2 className="text-2xl font-bold text-red-600 mb-6">Categories</h2>
              
              <div className="space-y-6">
                {categories.map(cat => (
                  <div key={cat.name} className="space-y-2">
                    <button
                      className={`w-full text-left flex items-center gap-3 text-lg font-semibold transition-colors ${
                        selectedCategory === cat.name ? 'text-red-500' : 'text-white/90 hover:text-red-400'
                      }`}
                      onClick={() => {
                        setSelectedCategory(cat.name === selectedCategory ? '' : cat.name);
                        setSelectedSubcategory('');
                      }}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      {cat.name}
                    </button>
                    
                    <AnimatePresence>
                      {selectedCategory === cat.name && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-9 space-y-2"
                        >
                          {cat.subcategories.map(sub => (
                            <motion.li
                              key={sub}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <button
                                className={`text-sm transition-colors ${
                                  selectedSubcategory === sub
                                    ? 'text-red-500 font-medium'
                                    : 'text-white/70 hover:text-red-400'
                                }`}
                                onClick={() => setSelectedSubcategory(sub === selectedSubcategory ? '' : sub)}
                              >
                                {sub}
                              </button>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {(selectedCategory || selectedSubcategory || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="mt-6 w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 px-4 rounded-lg transition-colors border border-red-600/30 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {selectedSubcategory || selectedCategory || 'All Products'}
                </h1>
                <p className="text-gray-400">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full sm:w-64 px-4 py-2 pl-10 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>

                <Link 
                  to="/cart"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full text-center text-gray-400 py-12">Loading products...</div>
              ) : (
                <AnimatePresence>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group relative bg-gradient-to-b from-red-900/20 to-black border border-red-900/20 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300"
                      >
                        <div className="relative overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-48 object-contain p-4 bg-gradient-to-br from-black to-red-900/20 group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.stock < 10 && (
                            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                              Only {product.stock} left
                            </span>
                          )}
                        </div>

                        <div className="p-4">
                          <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
                            {product.name}
                          </h2>
                          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-red-500 font-bold text-lg">
                                ${product.price}
                              </span>
                              <span className="text-xs text-gray-400 ml-1">
                                /unit
                              </span>
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                            >
                              <Plus className="w-4 h-4" />
                              Add
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400 col-span-full text-center py-12"
                    >
                      No products found matching your criteria. Try adjusting your filters.
                    </motion.p>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default ShopPage;
