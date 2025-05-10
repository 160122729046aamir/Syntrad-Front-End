import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../getApiUrl';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postCode: '',
    country: '',
  });
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    if (!paypalLoaded) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=sb&currency=USD`;
      script.addEventListener('load', () => setPaypalLoaded(true));
      document.body.appendChild(script);
    }
  }, [paypalLoaded]);

  useEffect(() => {
    if (paypalLoaded && paypalRef.current && !orderPlaced && !paypalRef.current.hasChildNodes()) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: getCartTotal().toFixed(2) } }]
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          // Place order in backend
          const res = await fetch(getApiUrl('/api/orders/checkout'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: cartItems.map(item => ({ product: item.id, quantity: item.quantity, price: item.price })),
              shippingAddress: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                city: formData.city,
                postCode: formData.postCode,
                country: formData.country,
                phone: formData.phone,
                email: formData.email
              },
              totalAmount: getCartTotal(),
              userEmail: formData.email
            })
          });
          const dataRes = await res.json();
          if (dataRes.order && dataRes.order._id) {
            setOrderId(dataRes.order._id);
            // Mark as paid
            await fetch(getApiUrl(`/api/orders/${dataRes.order._id}/paypal`), { method: 'PATCH' });
            setOrderPlaced(true);
            clearCart();
          }
        }
      }).render(paypalRef.current);
    }
  }, [paypalLoaded, cartItems, formData, getCartTotal, orderPlaced, clearCart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we'll integrate PayPal payment processing
    console.log('Order submitted:', { items: cartItems, total: getCartTotal(), ...formData });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-red-900/20 to-black border border-red-900/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Checkout Details</h2>
              <form onSubmit={e => e.preventDefault()} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Post Code
                    </label>
                    <input
                      type="text"
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  {!orderPlaced ? (
                    <div ref={paypalRef} className="mb-4" />
                  ) : (
                    <div className="text-green-500 text-center font-bold py-4">Order placed and payment successful! Confirmation sent to your email.</div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-red-900/20 to-black border border-red-900/20 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain bg-gradient-to-br from-black to-red-900/20 rounded-lg p-1"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-red-500">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-red-500">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;