import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const Electrical = () => {
  const models = [
    "Full Rewiring",
    "Fuse Board Upgrades",
    "Lighting Design",
    "EV Charger Install",
    "Emergency Repairs",
    "Inspection & Testing",
    "Fire Alarm Systems",
    "Security Lighting",
    "Data & Network Wiring",
  ];

  const electricalImage = [
    {
      image: "assets/fullRewire.jpg",
    },
    {
      image: "assets/fuseboardUpgrade.jpeg",
    },
    {
      image: "assets/lightning.webp",
    },
    {
      image: "assets/EV-Charger-Installation.jpg",
    },
    {
      image: "assets/emergency.jpg",
    },
    {
      image: "assets/testing.jpg",
    },
    {
      image: "assets/firealarm.jpg",
    },
    {
      image: "assets/home-lighting-security.jpg",
    },
    {
      image: "assets/dataWiring.jpg",
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
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white font-sans py-10 px-4">
      <div className="max-w-7xl mx-auto backdrop-blur-lg bg-gradient-to-br from-red-950/20 to-black/30 border border-red-900/30 rounded-3xl shadow-2xl px-6 md:px-10 py-12">
        {/* Header */}
        <header className="text-center mb-12 px-4 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 mb-3">
                ⚡ Electrical Engineering Services
              </h1>
              <p className="text-lg text-white mb-2">
                <b>Reliable Solutions for Homes & Commercial Properties</b>
              </p>
              <p className="text-lg text-gray-400 mb-4">
                We provide professional electrical engineering services for
                domestic and commercial environments. From rewiring to complex
                electrical design, we ensure your systems are safe, efficient,
                and up to code.
              </p>
              <p className="text-lg text-white">
                <b>
                  ✅ Certified Engineers | 🔌 Safe Installations | 🌐
                  Eco-efficient Solutions
                </b>
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="assets/mainElectric.png" // Replace with actual image URL
                alt="Coffee Machine Repair"
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
                  src={electricalImage[i]?.image}
                  alt={model}
                  className="mb-3 mx-auto rounded-lg w-full h-48 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-100">{model}</h3>
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
            Residential & 🚚 🏢 Commercial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diagnostic & Testing */}
            <div className="bg-gradient-to-br from-black/40 to-red-900/30 border border-red-700/30 rounded-2xl p-6 shadow-xl hover:shadow-red-600/40 transition transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white mb-3">
                🏠 Residential Services
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">
                From new builds to renovations, we ensure every home is wired to
                the highest standards. Our team handles indoor and outdoor
                installations with minimal disruption.
              </p>
            </div>

            {/* Pickup & Delivery */}
            <div className="bg-gradient-to-br from-black/40 to-red-900/30 border border-red-700/30 rounded-2xl p-6 shadow-xl hover:shadow-red-600/40 transition transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white mb-3">
                🏢 Commercial Projects
              </h3>
              <p className="text-gray-300 text-base sm:text-lg">
                We work with offices, retail stores, industrial units, and
                public buildings, providing scalable solutions tailored to
                business needs, including 3-phase systems and compliance
                documentation.
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
          <div className="space-y-2 text-lg">
            <p>
              <FaPhoneAlt className="inline text-red-500 mr-2" />{" "}
              <strong>Call us:</strong> 123-456-7890
            </p>
            <p>
              <FaEnvelope className="inline text-red-500 mr-2" />{" "}
              <strong>Email:</strong>{" "}
              <a
                href="mailto:repairs@example.com"
                className="underline text-red-400"
              >
                repairs@example.com
              </a>
            </p>
            <p>
              <FaCalendarAlt className="inline text-red-500 mr-2" />{" "}
              <Link to="/services" className="underline text-red-400">
                Book Online Now
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Electrical;
