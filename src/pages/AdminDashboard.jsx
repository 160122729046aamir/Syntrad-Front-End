import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Package, Users, Check, X, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import toast from 'react-hot-toast';
import { getApiUrl } from '../getApiUrl';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [loading, setLoading] = useState(true);
  const [loadingAppointmentId, setLoadingAppointmentId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    activeAppointments: 0,
    pendingOrders: 0
  });
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    subcategory: '',
    stock: ''
  });
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/products'));
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setProducts([]);
    }
  };

  const handleProductInput = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setProductLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          stock: parseInt(productForm.stock)
        })
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to add product');
      }
      setProductForm({ name: '', description: '', price: '', image: '', category: '', subcategory: '', stock: '' });
      toast.success('Product added successfully!');
      await fetchProducts(); // Fetch latest products after adding
    } catch (err) {
      toast.error(err.message);
    } finally {
      setProductLoading(false);
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(getApiUrl('/api/appointments'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data.appointments);
      
      // Update stats
      const activeCount = data.appointments.filter(apt => 
        apt.status === 'pending' || apt.status === 'confirmed'
      ).length;
      
      setStats(prev => ({
        ...prev,
        activeAppointments: activeCount
      }));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
      setLoading(false);
    }
  };

  const handleStatusChange = async (type, id, newStatus) => {
    setLoadingAppointmentId(id); // Set loading for this appointment
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(getApiUrl(`/api/appointments/${id}/status`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }

      const data = await response.json();
      
      // Update local state
      if (type === 'appointments') {
        setAppointments(prev => prev.map(apt => 
          apt._id === id ? { ...apt, status: newStatus } : apt
        ));
        
        // Update stats
        const activeCount = appointments.filter(apt => 
          apt._id !== id ? (apt.status === 'pending' || apt.status === 'confirmed') 
          : (newStatus === 'pending' || newStatus === 'confirmed')
        ).length;
        
        setStats(prev => ({
          ...prev,
          activeAppointments: activeCount
        }));

        toast.success('Appointment status updated successfully');
      }
      setLoadingAppointmentId(null); // Reset loading
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update appointment status');
      setLoadingAppointmentId(null); // Reset loading on error
    }
  };

  // Calculate appointment statistics for pie chart
  const appointmentData = [
    { 
      name: 'Completed', 
      value: appointments.filter(apt => apt.status === 'completed').length 
    },
    { 
      name: 'Pending', 
      value: appointments.filter(apt => apt.status === 'pending').length 
    },
    { 
      name: 'Confirmed', 
      value: appointments.filter(apt => apt.status === 'confirmed').length 
    },
    { 
      name: 'Cancelled', 
      value: appointments.filter(apt => apt.status === 'cancelled').length 
    }
  ];

  const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'];

  // Fetch orders for admin
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/orders'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      toast.error(err.message);
      setOrders([]);
    }
  };

  const handleOrderUpdate = async (orderId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl(`/api/orders/${orderId}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update order');
      toast.success('Order updated!');
      fetchOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Prevent background scroll when edit modal is open
  useEffect(() => {
    if (editProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [editProduct]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-red-100">Manage appointments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Appointments</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeAppointments}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`${
                  activeTab === 'appointments'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Package className="mr-2 h-5 w-5" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`${
                  activeTab === 'products'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Package className="mr-2 h-5 w-5" />
                Products
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="mt-8">
            {activeTab === 'appointments' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Appointments List */}
                <div className="lg:col-span-2">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {loading ? (
                      <div className="p-4 text-center text-gray-500">Loading appointments...</div>
                    ) : appointments.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No appointments found</div>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                          <li key={appointment._id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {appointment.name}
                                  </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  <p>{new Date(appointment.date).toLocaleDateString()}</p>
                                  <span className="mx-2">•</span>
                                  <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                  <p>{appointment.time}</p>
                                  <span className="mx-2">•</span>
                                  <p>{appointment.service}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                  appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {appointment.status}
                                </span>
                                <div className="flex space-x-2">
                                  {loadingAppointmentId === appointment._id ? (
                                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                  ) : (
                                    <>
                                      {appointment.status === 'pending' && (
                                        <>
                                          <button
                                            onClick={() => handleStatusChange('appointments', appointment._id, 'confirmed')}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Confirm Appointment"
                                          >
                                            <Check className="h-5 w-5" />
                                          </button>
                                          <button
                                            onClick={() => handleStatusChange('appointments', appointment._id, 'cancelled')}
                                            className="text-red-600 hover:text-red-900"
                                            title="Cancel Appointment"
                                          >
                                            <X className="h-5 w-5" />
                                          </button>
                                        </>
                                      )}
                                      {appointment.status === 'confirmed' && (
                                        <button
                                          onClick={() => handleStatusChange('appointments', appointment._id, 'completed')}
                                          className="text-green-600 hover:text-green-900"
                                          title="Mark as Completed"
                                        >
                                          <Check className="h-5 w-5" />
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Appointments Chart */}
                <div className="lg:col-span-1">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointments Overview</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={appointmentData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {appointmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <div className="grid grid-cols-2 gap-2">
                        {appointmentData.map((entry, index) => (
                          <div key={entry.name} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">All Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-gray-500">No orders found.</div>
                  ) : (
                    <div className="w-full overflow-x-auto">
                      <table className="min-w-full text-sm text-gray-900">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 text-left">Order #</th>
                            <th className="p-2 text-left">User</th>
                            <th className="p-2 text-left">Items</th>
                            <th className="p-2 text-left">Total</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Payment</th>
                            <th className="p-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order._id} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-mono">{order.orderNumber}</td>
                              <td className="p-2">{order.user?.name || order.user?.email || 'N/A'}</td>
                              <td className="p-2">
                                <ul>
                                  {order.items.map(item => (
                                    <li key={item._id}>{item.product?.name || 'Product'} x{item.quantity}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="p-2 font-semibold">${order.totalAmount.toFixed(2)}</td>
                              <td className="p-2">
                                <select
                                  value={order.status}
                                  onChange={e => handleOrderUpdate(order._id, { status: e.target.value })}
                                  className="bg-gray-100 border rounded px-2 py-1"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="p-2">
                                <select
                                  value={order.paymentStatus}
                                  onChange={e => handleOrderUpdate(order._id, { paymentStatus: e.target.value })}
                                  className="bg-gray-100 border rounded px-2 py-1"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="completed">Completed</option>
                                  <option value="failed">Failed</option>
                                  <option value="refunded">Refunded</option>
                                </select>
                              </td>
                              <td className="p-2">
                                <button
                                  onClick={() => handleOrderUpdate(order._id, { paymentStatus: 'refunded' })}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                                  disabled={order.paymentStatus === 'refunded'}
                                >
                                  Refund
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleProductSubmit} className="bg-white border border-red-700/40 rounded-2xl shadow-2xl p-0 mb-10">
                  <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-t-2xl px-8 py-6 flex items-center gap-3">
                    <span className="text-2xl text-red-600">➕</span>
                    <h2 className="text-2xl font-bold text-white tracking-wide">Add New Product</h2>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-red-700 mb-2">Name</label>
                      <input name="name" value={productForm.name} onChange={handleProductInput} required placeholder="Product Name" className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-700 mb-2">Price</label>
                      <input name="price" value={productForm.price} onChange={handleProductInput} required placeholder="Price" type="number" min="0" step="0.01" className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-700 mb-2">Image URL</label>
                      <input name="image" value={productForm.image} onChange={handleProductInput} required placeholder="Image URL" className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-700 mb-2">Stock</label>
                      <input name="stock" value={productForm.stock} onChange={handleProductInput} required placeholder="Stock" type="number" min="0" className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-700 mb-2">Category</label>
                      <div className="relative">
                        <select name="category" value={productForm.category} onChange={handleProductInput} required className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none text-base transition-all">
                          <option value="" className="bg-white text-gray-900">Select Category</option>
                          <option value="Coffee Machine Parts" className="bg-white text-gray-900">Coffee Machine Parts</option>
                          <option value="Catering Parts" className="bg-white text-gray-900">Catering Parts</option>
                          <option value="HiFi Parts" className="bg-white text-gray-900">HiFi Parts</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400">▼</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-red-700 mb-2">Subcategory</label>
                      <input name="subcategory" value={productForm.subcategory} onChange={handleProductInput} required placeholder="Subcategory" className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base transition-all" />
                    </div>
                  </div>
                  <div className="px-8 pb-8">
                    <label className="block text-sm font-semibold text-red-700 mb-2">Description</label>
                    <textarea name="description" value={productForm.description} onChange={handleProductInput} required placeholder="Description" className="w-full px-4 py-3 bg-white border border-red-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base transition-all" rows={3} />
                    <button type="submit" disabled={productLoading} className="mt-8 w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg disabled:opacity-50 text-lg tracking-wide">
                      {productLoading ? 'Adding...' : 'Add Product'}
                    </button>
                  </div>
                </form>
                {/* Edit Product Modal */}
                {editProduct && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-gray-900 to-red-900/80 border border-red-700/40 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                      <button onClick={() => setEditProduct(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                      <h2 className="text-2xl font-bold text-white mb-8 text-center tracking-wide">Edit Product</h2>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        setEditLoading(true);
                        try {
                          const token = localStorage.getItem('token');
                          const res = await fetch(getApiUrl(`/api/products/${editProduct._id}`), {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(editProduct)
                          });
                          if (!res.ok) {
                            const errData = await res.json();
                            throw new Error(errData.message || 'Failed to update product');
                          }
                          toast.success('Product updated successfully!');
                          setEditProduct(null);
                          await fetchProducts();
                        } catch (err) {
                          toast.error(err.message);
                        } finally {
                          setEditLoading(false);
                        }
                      }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">Name</label>
                            <input name="name" value={editProduct.name} onChange={e => setEditProduct(p => ({ ...p, name: e.target.value }))} required className="w-full px-4 py-2 bg-gray-800 border border-red-700/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">Price</label>
                            <input name="price" value={editProduct.price} onChange={e => setEditProduct(p => ({ ...p, price: e.target.value }))} required type="number" min="0" step="0.01" className="w-full px-4 py-2 bg-gray-800 border border-red-700/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">Image URL</label>
                            <input name="image" value={editProduct.image} onChange={e => setEditProduct(p => ({ ...p, image: e.target.value }))} required className="w-full px-4 py-2 bg-gray-800 border border-red-700/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">Stock</label>
                            <input name="stock" value={editProduct.stock} onChange={e => setEditProduct(p => ({ ...p, stock: e.target.value }))} required type="number" min="0" className="w-full px-4 py-2 bg-gray-800 border border-red-700/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">Category</label>
                            <div className="relative">
                              <select name="category" value={editProduct.category} onChange={e => setEditProduct(p => ({ ...p, category: e.target.value }))} required className="w-full px-4 py-2 bg-gray-800 border border-red-700/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none transition-all">
                                <option value="" className="bg-gray-900 text-white">Select Category</option>
                                <option value="Coffee Machine Parts" className="bg-gray-900 text-white">Coffee Machine Parts</option>
                                <option value="Catering Parts" className="bg-gray-900 text-white">Catering Parts</option>
                                <option value="HiFi Parts" className="bg-gray-900 text-white">HiFi Parts</option>
                              </select>
                              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-2">Subcategory</label>
                            <input name="subcategory" value={editProduct.subcategory} onChange={e => setEditProduct(p => ({ ...p, subcategory: e.target.value }))} required className="w-full px-4 py-2 bg-gray-800 border border-red-700/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" />
                          </div>
                        </div>
                        <div className="mt-8">
                          <label className="block text-sm font-semibold text-gray-200 mb-2">Description</label>
                          <textarea name="description" value={editProduct.description} onChange={e => setEditProduct(p => ({ ...p, description: e.target.value }))} required className="w-full px-4 py-2 bg-gray-800 border border-red-700/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all" rows={3} />
                        </div>
                        <button type="submit" disabled={editLoading} className="mt-10 w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg disabled:opacity-50 text-lg tracking-wide">
                          {editLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                <div className="bg-gray-900/80 border border-red-900/20 rounded-2xl shadow-lg p-6 mt-8">
                  <h2 className="text-lg font-semibold text-white mb-4">Product List</h2>
                  {products.length === 0 ? (
                    <div className="text-gray-400">No products found.</div>
                  ) : (
                    <ul className="divide-y divide-red-900/20">
                      {products.map(product => (
                        <li key={product._id} className="py-2 flex items-center justify-between text-white">
                          <span>{product.name} <span className="text-xs text-gray-400">({product.category})</span></span>
                          <span className="flex items-center gap-4">
                            <span className="text-sm text-gray-300">${product.price}</span>
                            <button onClick={() => setEditProduct(product)} className="px-3 py-1 bg-red-700 hover:bg-red-800 rounded-lg text-white text-xs font-semibold transition-all">Edit</button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;