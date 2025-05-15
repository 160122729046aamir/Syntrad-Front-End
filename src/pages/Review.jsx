import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../getApiUrl';
import { Helmet } from 'react-helmet-async';

const services = [
  "ELECTRICAL ENGINEERING",
  "ELECTRONICS",
  "COFFEE MACHINE REPAIR",
  "GYM/FITNESS EQUIPMENT REPAIR",
  "CATERING EQUIPMENT REPAIR",
  "MEDICAL EQUIPMENT REPAIR",
  "ELECTRO MECHANICAL",
  "CLOCKS",
  "NETWORK REPAIR",
  "SMART HOME AUTOMATION"
];

// Helper to get initials
const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
};
// Helper to format date
const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

const ReviewCard = React.memo(({ review, index }) => {
  return (
    <>
    <Helmet>
        <title>Customer Reviews | Syntrad Services</title>
        <meta name="description" content="Read verified reviews from Syntrad customers. Share your experience with our repair and maintenance services." />
        <meta name="keywords" content="Syntrad, repair services, electronics repair, electrical maintenance, customer reviews, verified feedback, equipment repair, home automation, coffee machine repair, medical equipment service" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Customer Reviews | Syntrad Services" />
        <meta property="og:description" content="See what customers are saying about Syntrad's trusted repair and maintenance services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.syntrad.com/review" />
        <meta property="og:image" content="https://www.syntrad.com/seo-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customer Reviews | Syntrad Services" />
        <meta name="twitter:description" content="Read real customer reviews about Syntrad's repair solutions." />
        <meta name="twitter:image" content="https://www.syntrad.com/seo-preview.jpg" />
    </Helmet>
    <div className="group bg-neutral-900/60 rounded-2xl p-6 backdrop-blur-sm border border-red-600/20 hover:border-red-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10 relative overflow-hidden flex flex-col h-full">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-600/10 transition-all duration-300" />
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 via-black to-red-900 border-2 border-red-400 shadow-lg flex items-center justify-center text-xl font-extrabold text-white select-none tracking-widest relative transition-all duration-300 group-hover:shadow-[0_0_0_3px_rgba(239,68,68,0.3)] group-hover:scale-105">
            <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {getInitials(review.name)}
            </span>
            <span className="absolute inset-0 rounded-full pointer-events-none group-hover:animate-pulse bg-gradient-to-br from-red-500/10 to-red-900/10" />
          </div>
          <div>
            <h4 className="text-white font-semibold group-hover:text-red-400 transition-colors duration-300">{review.name}</h4>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{review.role || 'Customer'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          {[...Array(review.rating)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-red-600 group-hover:text-red-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-1">{review.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-400 mt-auto pt-2 border-t border-red-600/10">
          <span className="group-hover:text-gray-300 transition-colors duration-300">{formatDate(review.date)}</span>
          <div className="flex items-center gap-1 group-hover:text-gray-300 transition-colors duration-300">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span>Verified</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
});

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    rating: 5,
    content: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(getApiUrl('/api/reviews'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Review submitted successfully!');
        setFormData({
          name: '',
          service: '',
          rating: 5,
          content: '',
        });
        // Optionally reload reviews here
      } else {
        alert(data.message || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting your review. Please try again.');
    }
  };

  return (
    <>
    <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl p-8 border-2 border-red-600 shadow-xl">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-600 mb-2">Share Your Experience</h3>
        <p className="text-gray-600">Help others by sharing your thoughts about our service</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Your Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-red-600/30 rounded-lg text-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 placeholder-gray-400"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Service Used
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-red-600/30 rounded-lg text-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className={`text-2xl transition-all duration-300 hover:scale-110 ${
                  star <= formData.rating ? 'text-red-600' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Your Review
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-red-600/30 rounded-lg text-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 placeholder-gray-400 h-32 resize-none transition-all duration-300"
            placeholder="Share your experience with our service..."
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Submit Review
        </button>
      </form>
    </div>
    </>
  );
};

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const reviewsPerPage = 3;

  useEffect(() => {
    fetchReviews();
    window.scrollTo(0, 0);
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(getApiUrl('/api/reviews'));
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const loadMoreReviews = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleReviews(prev => Math.min(prev + reviewsPerPage, reviews.length));
      setIsLoading(false);
    }, 500); // Simulate loading delay
  };

  return (
    <>
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              What Our <span className="text-red-600">Clients</span> Say
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">
              Discover why our clients trust us for their electrical needs
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-20 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {reviews.slice(0, visibleReviews).map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <div className="text-center mt-8 sm:mt-12">
              <button
                onClick={loadMoreReviews}
                disabled={isLoading}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl overflow-hidden hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="font-semibold">
                    {isLoading ? 'Loading...' : `View More Reviews (${visibleReviews}/${reviews.length})`}
                  </span>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 ${isLoading ? 'animate-spin' : 'group-hover:translate-y-1'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isLoading ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Review Form Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-20 pb-12 sm:pb-20">
          <div className="max-w-2xl mx-auto">
            <ReviewForm />
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-20 pb-12 sm:pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Ready to Experience Our Service?
            </h2>
            <Link to="/contact">
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-red-600 rounded-xl overflow-hidden hover:bg-red-700 transition-colors duration-300 text-sm sm:text-base">
                <span className="relative text-white font-bold">
                  Get in Touch
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Review;