import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Amplink from './pages/Amplink';
import Contact from './pages/Contact';
// ✅ Import new individual service components
import CoffeeRepair from './pages/Coffee';
import Electrical from './pages/Electrical';
import Electronic from './pages/Electronics';
import Catering from './pages/Catering';
import Network from './pages/Network';
import Medical from './pages/Medical';
import Electromechanical from './pages/Electromechanical';
import Clock from './pages/Clock';
import Gym from './pages/Gym';
import SmartHome from './pages/SmartHome';


// Protected Route Component
const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isAdmin && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-black text-white">
        
          <Header />
          <main className="flex-grow mt-20">
            <Routes>
              {/* Core routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/amplink" element={<Amplink />} />
              {/* <Route path="/shop" element={<Shop />} /> */}
              {/* <Route path="/cart" element={<Cart />} /> */}
              {/* <Route path="/checkout" element={<Checkout />} /> */}
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/review" element={<Review />} /> */}
              
              {/* Protected routes */}
              {/* <Route 
                path="/profile" 
                element={
                  // <ProtectedRoute>
                    <Profile />
                  // </ProtectedRoute>
                } 
              /> */}
              {/* <Route 
                path="/admin" 
                element={
                  <ProtectedRoute isAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              /> */}

              {/* ✅ Individual service routes */}
              <Route path="/coffee" element={<CoffeeRepair/>} />
              <Route path="/electrical" element={<Electrical/>} />
              <Route path="/electronic" element={<Electronic/>} />
              <Route path="/catering" element={<Catering/>} />
              <Route path="/network" element={<Network/>}/>
              <Route path="/medical" element={<Medical/>}/>
              <Route path="/electromechanical" element={<Electromechanical/>}/>
              <Route path="/clock" element={<Clock/>}/>
              <Route path="/gym" element={<Gym/>}/>
              <Route path="/smarthome" element={<SmartHome/>}/>            
              </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
