import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Electrical Engineering",
    image: "/assets/electrical.png",
    link: "/services",
  },
  {
    title: "Electronics",
    image: "/assets/electronics.png",
    link: "/services",
  },
  {
    title: "Coffee Machine Service",
    image: "/assets/Coffee.png",
    link: "/services",
  },
  {
    title: "Gym Equipment Repair",
    image: "/assets/fitnessLogo.png",
    link: "/services",
  },
  {
    title: "Catering Equipment Service",
    image: "/assets/catering.png",
    link: "/services",
  },
  {
    title: "Medical Equipment Service",
    image: "/assets/medical.png",
    link: "/services",
  },
  {
    title: "Electromechanical",
    image: "/assets/electromechanical.png",
    link: "/services",
  },
  {
    title: "Clocks",
    image: "/assets/clock.webp",
    link: "/services",
  },
  {
    title: "Network Service",
    image: "/assets/network.png",
    link: "/services",
  },
  {
    title: "Smart Home System",
    image: "/assets/SmartHome.png",
    link: "/services",
  },
];

export default function MultiServiceUI() {
  const navigate = useNavigate();
  return (
    <div className="min-h-fit bg-black py-4 px-4 text-center">
      <h2 className="text-4xl font-extrabold text-red-600 mb-10 uppercase">
        Explore Our Services
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.link)}
            className="cursor-pointer flex flex-col items-center p-5 bg-gradient-to-b from-white/10 to-black/20 border border-red-600 rounded-2xl shadow-md hover:shadow-red-600/40 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-20 h-20 object-contain mb-4 drop-shadow-md"
            />
            <p className="text-white font-semibold text-sm md:text-base">
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
