import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import RequestQuote from "../components/RequestQuote";
import {
  FaCoffee,
  FaCogs,
  FaTools,
  FaTint,
  FaIndustry,
  FaWrench,
  FaCheckCircle,
  FaPowerOff,
  FaWater,
  FaFireAlt,
  FaCog,
  FaRecycle,
  FaTintSlash,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const CoffeeRepair = () => {
  const [showRequestQuote, setShowRequestQuote] = useState(false);
  
  const models = [
    "Oracle Touch",
    "Oracle Dual Boiler",
    "Oracle Jet",
    "Barista Touch Impress",
    "Barista Touch",
    "Barista Pro",
    "Barista Express Impress",
    "Barista Express",
    "Duo Temp",
    "Bambino Plus",
    "Bambino",
  ];

  const brands = [
    "DeLonghi",
    "Breville / Sage",
    "Jura",
    "Nespresso",
    "Keurig",
    "Philips / Saeco",
    "Gaggia",
    "La Marzocco",
    "Rocket Espresso",
  ];

  const repairs = [
    {
      icon: <FaCoffee className="text-3xl text-red-400" />,
      label: "Espresso Machines",
    },
    {
      icon: <FaCogs className="text-3xl text-red-400" />,
      label: "Pod/Capsule Machines",
    },
    {
      icon: <FaTools className="text-3xl text-red-400" />,
      label: "Bean-to-Cup Systems",
    },
    {
      icon: <FaTint className="text-3xl text-red-400" />,
      label: "Filter Coffee Makers",
    },
    {
      icon: <FaIndustry className="text-3xl text-red-400" />,
      label: "Commercial Brewers",
    },
    {
      icon: <FaWrench className="text-3xl text-red-400" />,
      label: "Specialty Coffee Equipment",
    },
  ];

  const issues = [
    {
      icon: <FaPowerOff className="text-red-400 text-xl" />,
      text: "Power failures or no response",
    },
    {
      icon: <FaWater className="text-red-400 text-xl" />,
      text: "Leaks or spills",
    },
    {
      icon: <FaFireAlt className="text-red-400 text-xl" />,
      text: "Not heating or poor steam",
    },
    {
      icon: <FaCog className="text-red-400 text-xl" />,
      text: "Grinder malfunction",
    },
    {
      icon: <FaRecycle className="text-red-400 text-xl" />,
      text: "Descaling errors",
    },
    {
      icon: <FaTintSlash className="text-red-400 text-xl" />,
      text: "Weak coffee or water flow issues",
    },
  ];

  const sageImage = [
    {
      image: "assets/oracletouch.jpg",
    },
    {
      image: "assets/dualboiler.jpg",
    },
    {
      image: "assets/oracle.jpg",
    },
    {
      image: "assets/",
    },
    {
      image: "assets/",
    },
    {
      image: "assets/baristapro.jpg",
    },
    {
      image: "assets/",
    },
    {
      image: "assets/baristaexpress.jpg",
    },
    {
      image: "assets/duo-temp.jpeg",
    },
    {
      image: "assets/bambino.webp",
    },
    {
      image: "assets/bambino.webp",
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
        <title>Coffee Machine Repairs - Fast & Reliable Service</title>
        <meta
          name="description"
          content="Get your coffee machine repaired by experts. Fast, reliable, and affordable repairs for espresso machines, pod machines, and more!"
        />
        <meta
          name="keywords"
          content="coffee machine repair, espresso machine repair, pod machine repair, coffee machine service, Sage coffee machine repair, Breville repair, Kaz Moorjani, Prakash Moorjani"
        />
        <meta name="author" content="Kaz Moorjani" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Coffee Machine Repairs - Fast & Reliable Service"
        />
        <meta
          property="og:description"
          content="Need a coffee machine repair? Our technicians offer fast, reliable, and affordable repairs for all types of coffee machines. Contact us now!"
        />
        <meta property="og:image" content="assets/mainCoffee.png" />{" "}

        <meta property="og:url" content="https://syntrad.com/coffee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Coffee Machine Repairs - Fast & Reliable Service"
        />
        <meta
          name="twitter:description"
          content="Get your coffee machine repaired by experts. Fast, reliable, and affordable repairs for espresso machines, pod machines, and more!"
        />
        <meta name="twitter:image" content="assets/mainCoffee.png" />{" "}
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white font-sans py-10 px-4">
        <div className="max-w-7xl mx-auto backdrop-blur-lg bg-gradient-to-br from-red-950/20 to-black/30 border border-red-900/30 rounded-3xl shadow-2xl px-6 md:px-10 py-12">
          {/* Header */}
          <header className="text-center mb-12 px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Text Section */}
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 mb-3">
                  ☕ Coffee Machine Repairs
                </h1>
                <p className="text-lg text-white mb-2">
                  <b>🔧 Fast, Reliable Repairs for All Coffee Machines</b>
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  Is your coffee machine acting up? Whether it's a home espresso
                  machine or a commercial brewer, our expert technicians bring
                  your coffee maker back to life — quickly and affordably.
                </p>
                <p className="text-lg text-white">
                  <b>
                    ✅ Same-day diagnostics | 🛠️ Genuine parts | 📍 Local
                    service
                  </b>
                </p>
              </div>

              {/* Image Section */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="assets/mainCoffee.png" // Replace with actual image URL
                  alt="Coffee Machine Repair"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </header>

          {/* What We Repair */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              🔍 What We Repair
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
              {repairs.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-tr from-red-900/30 to-black/30 p-5 text-center rounded-xl border border-red-700/40 shadow-lg hover:shadow-red-500/30 transition"
                >
                  <div className="mb-3 flex justify-center">{item.icon}</div>
                  <p className="font-semibold text-gray-200 text-base">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              ⚠️ Common Issues We Fix
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-black/30 border border-red-900/40 rounded-xl px-5 py-4 shadow hover:shadow-red-600/30 transition"
                >
                  <div>{issue.icon}</div>
                  <p className="text-gray-200 font-medium">{issue.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Brands We Service */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              🏷️ Brands We Service
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {brands.map((brand, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-red-900/40 to-black/40 border border-red-800/30 text-center px-6 py-3 rounded-xl shadow-md hover:scale-105 transition text-gray-100 text-base font-medium"
                >
                  <FaCheckCircle className="inline-block text-red-500 mr-2" />{" "}
                  {brand}
                </div>
              ))}
            </div>
          </section>

          {/* SAGE Machine Repairs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
              ✅ SAGE Coffee Machine Repairs – £50 Fixed Price
            </h2>
            <p className="text-lg text-gray-300 mb-4 text-center">
              We service a full range of Sage (Breville) machines.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {models.map((model, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-black/40 to-red-900/30 border border-red-700/30 text-center px-5 py-6 rounded-2xl shadow-xl hover:shadow-red-600/40 transition transform hover:scale-105"
                >
                  <img
                    src={sageImage[i]?.image}
                    alt={model}
                    className="mb-3 mx-auto rounded-lg w-full object-cover"
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
          </section>          {/* Contact Section */}
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

export default CoffeeRepair;
