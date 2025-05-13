import React from "react";
import { Link } from "react-router-dom";

const cardData = [
  {
    title: "Electrical Engineering",
    description:
      "Electrical Engineering Services offer safe and efficient electrical system design, installation, and maintenance.",
    image: "/assets/electrical.png",
    link: "/electrical"
  },
  {
    title: "Electronics",
    description:
      "Electronics Services include the design, repair, and maintenance of electronic devices and systems.",
    image: "/assets/electronics.png",
    link: "/electronics",
  },
  {
    title: "Coffee Machine Service",
    description:
      "Coffee Machine Service includes cleaning, repair, and maintenance to ensure smooth and efficient machine performance.",
    image: "/assets/Coffee.png",
    link: "/coffee",
  },
  {
    title: "Gym Equipment Repair",
    description:
      "Gym Equipment Repair Service involves diagnosing, fixing, and maintaining fitness machines to ensure safe and optimal performance.",
    image: "/assets/fitnessLogo.png",
    link: "/gym",
  },
  {
    title: "Catering Equipment Service",
    description:
      "Catering Equipment Service includes maintenance and repair of kitchen appliances to ensure efficient and reliable food service operations.",
    image: "/assets/catering.png",
    link: "/catering",
  },
  {
    title: "Medical Equipment Service",
    description:
      "Medical Equipment Service involves the maintenance, calibration, and repair of medical devices to ensure accuracy, safety, and compliance.",
    image: "/assets/medical.png",
    link: "/medical",
  },
  {
    title: "Electromechanical",
    description:
      "Electromechanical Services involve the maintenance and repair of systems combining electrical and mechanical components, ensuring smooth and efficient operation.",
    image: "/assets/electromechanical.png",
    link: "/electromechanical",
  },
  {
    title: "Clocks",
    description:
      "Clock Services include the repair, maintenance, and restoration of clocks to ensure accurate timekeeping and proper functionality.",
    image: "/assets/clock.webp",
    link: "/clocks",
  },
  {
    title: "Network Service",
    description:
      "Network Service involves the setup, maintenance, and troubleshooting of computer networks to ensure reliable and secure communication and data transfer.",
    image: "/assets/network.png",
    link: "/network",
  },
  {
    title: "Smart Home System",
    description:
      "Smart Home System service includes the installation, setup, and maintenance of connected devices like lighting, security, and climate control.",
    image: "/assets/SmartHome.png",
    link: "/smarthome",
  },
];

const Card = () => {
  return (
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Best Services We Provide
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cardData.slice(0, 8).map((card, index) => (
            <Link
              to="/services"
              key={index}
              className="group bg-gradient-to-b from-black to-red-950 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-red-900/20 hover:border-red-600/50"
            >
              <div className="relative h-48 overflow-hidden bg-white">
                <div className="absolute inset-0 group-hover:bg-black/10 transition-all duration-300"></div>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center text-red-500 text-sm font-medium">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}

          {/* Center last 2 cards */}
          {/* Center last 2 cards and keep responsiveness */}
          <div className="col-span-full flex flex-wrap justify-center gap-8">
            {cardData.slice(8).map((card, index) => (
              <Link
                to="/services"
                key={index + 8}
                className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] group bg-gradient-to-b from-black to-red-950 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-red-900/20 hover:border-red-600/50"
              >
                <div className="relative h-48 overflow-hidden bg-white">
                  <div className="absolute inset-0 group-hover:bg-black/10 transition-all duration-300"></div>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-500 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {card.description}
                  </p>
                  <div className="mt-4 flex items-center text-red-500 text-sm font-medium">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
