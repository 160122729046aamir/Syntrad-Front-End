import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { getApiUrl } from '../getApiUrl';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profileImage: null,
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [dashboardData, setDashboardData] = useState({
    stats: {
      appointments: 0,
      orders: 0,
      totalSpent: 0,
      totalUsers: 0,
      totalRevenue: 0
    },
    appointmentData: [],
    orderData: [],
    adminRevenueData: []
  });
  const [appointments, setAppointments] = useState([]);
  const [appointmentStatusCounts, setAppointmentStatusCounts] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        // Fetch user profile and dashboard data in parallel
        const [profileResponse, dashboardResponse] = await Promise.all([
          axios.get('/api/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('/api/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (profileResponse.data.user) {
          setUser(prev => ({
            ...prev,
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
            role: localStorage.getItem('userRole')
          }));
        }

        if (dashboardResponse.data) {
          setDashboardData(dashboardResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          navigate('/');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const [dashboardResponse] = await Promise.all([
        axios.get(getApiUrl('/api/user/profile'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      if (dashboardResponse.data.user) {
        const userData = dashboardResponse.data.user;
        setUser(prev => ({
          ...prev,
          name: userData.username,
          email: userData.email,
          role: userData.role,
          profileImage: userData.profileImage
        }));
      }

      if (dashboardResponse.data) {
        setDashboardData(dashboardResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get('/api/appointments/my-appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data && response.data.appointments) {
          setAppointments(response.data.appointments);
          // Count statuses
          const statusCounts = response.data.appointments.reduce((acc, appt) => {
            acc[appt.status] = (acc[appt.status] || 0) + 1;
            return acc;
          }, {});
          setAppointmentStatusCounts(statusCounts);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrderLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/orders/my', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        setOrders([]);
      } finally {
        setOrderLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(getApiUrl('/api/user/profile'), 
        {
          name: user.name,
          currentPassword: user.currentPassword,
          newPassword: user.newPassword,
          profileImage: user.profileImage
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update localStorage and state with the response data
      localStorage.setItem('userName', response.data.user.username);
      
      setUser(prev => ({
        ...prev,
        name: response.data.user.username,
        profileImage: response.data.user.profileImage,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Force header to update by triggering a window event
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'An error occurred while updating profile' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Form Only */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6">
            <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
          </div>
          <div className="p-8">
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 bg-white text-gray-900"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-900"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={user.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 bg-white text-gray-900"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 bg-white text-gray-900"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Appointments and Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Appointments</h3>
            {appointments.length === 0 ? (
              <div className="text-gray-500">No appointments found.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {appointments.map(appt => (
                  <li key={appt._id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-800">{appt.service}</div>
                        <div className="text-xs text-gray-500">{new Date(appt.date).toLocaleDateString()} at {appt.time}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        appt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        appt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        appt.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Orders</h3>
            {orderMessage && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{orderMessage}</div>}
            {orderLoading ? (
              <div className="text-gray-500">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="text-gray-500">No orders found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Order #</th>
                      <th className="p-2 text-left">Items</th>
                      <th className="p-2 text-left">Total</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Payment</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} className="border-b">
                        <td className="p-2 font-mono">{order.orderNumber}</td>
                        <td className="p-2">
                          <ul>
                            {order.items.map(item => (
                              <li key={item._id}>{item.product?.name || 'Product'} x{item.quantity}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-2 font-semibold">${order.totalAmount.toFixed(2)}</td>
                        <td className="p-2 capitalize">{order.status}</td>
                        <td className="p-2 capitalize">{order.paymentStatus}</td>
                        <td className="p-2">
                          {order.status !== 'delivered' && order.status !== 'cancelled' ? (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                              disabled={orderLoading}
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;