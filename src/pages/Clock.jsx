import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import RequestQuote from "../components/RequestQuote";
import { ArrowLeft } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
} from "react-icons/fa";

const Clock = () => {
  const [showRequestQuote, setShowRequestQuote] = useState(false);
  const navigate = useNavigate();
  const models = [
    "Full Movement Overhaul",
    "Pendulum Calibration",
    "Chime & Strike Mechanism Repair",
    "Case Polishing & Woodwork",
    "Weight Mechanism Repair",
    "On-site Home Servicing",
  ];

  const clockImage = [
    {
      image: "assets/overhaul.webp",
    },
    {
      image: "assets/pendulum.webp",
    },
    {
      image: "assets/chime.jpg",
    },
    {
      image: "assets/restoration.jpg",
    },
    {
      image: "assets/weight.jpg",
    },
    {
      image: "assets/home.webp",
    },
  ];

  const serviceAreas = [
    "London",
    "Manchester",
    "Birmingham",
    "Leeds",
    "Glasgow",
    "Liverpool",
  ];

  return (
    <>
      <Helmet>
        <title>Grandfather Clock Repair | Antique Clock Servicing UK</title>
        <meta
          name="description"
          content="Expert repair and restoration of antique and grandfather clocks across the UK. We offer pendulum calibration, chime repair, wood polishing & on-site visits."
        />
        <meta
          name="keywords"
          content="Grandfather clock repair, antique clock restoration, pendulum clock service, chime mechanism repair, UK clock repair, on-site clock servicing,Kaz Moorjani"
        />
        <meta name="author" content="Kaz Moorjani" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Grandfather & Antique Clock Repair"
        />
        <meta
          property="og:description"
          content="Restore elegance and function to your cherished timepieces. Fully insured expert clock repair services in London, Manchester, and more."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/mainClock.png"
        />
        <meta
          property="og:url"
          content="https://yourdomain.com/services/clock"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourdomain.com/services/clock" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white font-sans py-10 px-4">
        <div className="max-w-7xl mx-auto backdrop-blur-lg bg-gradient-to-br from-red-950/20 to-black/30 border border-red-900/30 rounded-3xl shadow-2xl px-6 md:px-10 py-12">
          {/* Header */}
          <header className="text-center mb-12 px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Text Section */}
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 mb-3">
                  🕰️ Grandfather & Antique Clock Repair
                </h1>
                <p className="text-lg text-white mb-2">
                  <b>
                    Expert Restoration of Traditional Pendulum & Weight-Driven
                    Clocks
                  </b>
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  With decades of horological expertise, we restore the
                  precision, elegance, and function of vintage and antique
                  timepieces. From Grandfather clocks to bracket clocks, our
                  care is second to none. We also repair and service modern long
                  case and short case clocks, blending traditional techniques
                  with modern precision.
                </p>
                <p className="text-lg text-white">
                  <b>
                    🛠 Fully Insured | 🕰 Workshop & On-site Visits | 🔍 Detailed
                    Cleaning & Overhaul
                  </b>
                </p>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white text-red-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="assets/mainClock.jpeg" // Replace with actual image URL
                  alt="Clock Machine Repair"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </header>

          {/* Machine Repairs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              🔌 What We Repair:
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {models.map((model, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-black/40 to-red-900/30 border border-red-700/30 text-center px-5 py-6 rounded-2xl shadow-xl hover:shadow-red-600/40 transition transform hover:scale-105"
                >
                  <img
                    src={clockImage[i]?.image}
                    alt={model}
                    className="mb-3 mx-auto rounded-lg w-full h-48 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-100">
                    {model}
                  </h3>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-300 mbt-4 text-center">
              💬 Need help choosing the right repair option?{" "}
              <Link className="text-red-500" to="/contact">
                Contact us here.
              </Link>
            </p>
          </section>

          {/* Diagnostic & Delivery Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-red-500 mb-10 text-center">
              Serving
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup & Delivery */}
              <div className="bg-gradient-to-br from-black/40 to-red-900/30 border border-red-700/30 rounded-2xl p-6 shadow-xl hover:shadow-red-600/40 transition transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  We Cover Serving:
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">
                  🏡 Private Residences 🏛 Museums & Heritage Properties 🕍
                  Historical Societies
                </p>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              📍 Service Areas
            </h2>
            <p className="text-lg text-gray-300 mb-4 text-center">
              We offer coffee machine repairs in:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-300">
              {serviceAreas.map((area, i) => (
                <span
                  key={i}
                  className="bg-black/30 border border-red-900/30 px-4 py-2 rounded-full text-sm"
                >
                  <FaMapMarkerAlt className="inline mr-1 text-red-500" /> {area}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-300 mb-4 text-center">
              💬 Not sure if we cover your area?{" "}
              <Link className="text-red-500" to="/contact">
                Get in touch.
              </Link>
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-6">
              📞 Book a Repair
            </h2>
            <p className="text-gray-300 mb-4">
              Enjoy fast turnaround, skilled technicians, and peace of mind.
            </p>
          </section>
          {/* Book Now Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowRequestQuote(true)}
              className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-lg transition transform hover:scale-105 shadow-lg hover:shadow-red-600/30"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {/* Request Quote Modal */}
      {showRequestQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-hidden">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
            <RequestQuote
              isModal={true}
              onClose={() => setShowRequestQuote(false)}
              initialService="Coffee Machine Service"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Clock;
