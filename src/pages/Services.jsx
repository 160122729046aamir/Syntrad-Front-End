import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Offer from "../components/Offer";
import RequestQuote from "../components/RequestQuote";
import { Helmet } from "react-helmet-async";
import {Link} from "react-router-dom";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Electrical Engineering",
    image: "/assets/electrical.png",
    link: "/electrical",
    description:
      "Electrical Engineering Services offer safe and efficient electrical system design, installation, and maintenance.",
  },
  {
    title: "Electronics",
    image: "/assets/electronics.png",
    link: "/electronic",
    description:
      "Electronics Services include the design, repair, and maintenance of electronic devices and systems.",
  },
  {
    title: "Coffee Machine Service",
    image: "/assets/Coffee.png",
    link: "/coffee",
    description:
      "Includes cleaning, repair, and maintenance to ensure smooth and efficient machine performance.",
  },
  {
    title: "Gym Equipment Repair",
    image: "/assets/fitnessLogo.png",
    link: "/gym",
    description:
      "Diagnosing, fixing, and maintaining fitness machines to ensure safe and optimal performance.",
  },
  {
    title: "Catering Equipment Service",
    image: "/assets/catering.png",
    link: "/catering",
    description:
      "Catering equipment maintenance, inspection, and service for efficient food operations.",
  },
  {
    title: "Medical Equipment Service",
    image: "/assets/medical.png",
    link: "/medical",
    description:
      "Maintenance and repair of critical medical tools and electronic devices.",
  },
  {
    title: "Electromechanical",
    image: "/assets/electromechanical.png",
    link: "/electromechanical",
    description:
      "Repair and servicing of electromechanical systems including automation tools.",
  },
  {
    title: "Clocks",
    image: "/assets/clock.webp",
    link: "/clocks",
    description: "Repair and restoration of analog and digital timepieces.",
  },
  {
    title: "Network Service",
    image: "/assets/network.png",
    link: "/network",
    description: "Setup, maintenance, and diagnostics of home/office networks.",
  },
  {
    title: "Smart Home System",
    image: "/assets/SmartHome.png",
    link: "/smarthome",
    description: "Service and maintenance for smart home automation systems.",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedService]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Batch animations for better performance
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
          duration: 0.3,
          opacity: 0,
          y: 20,
        },
      });

      // Animate cards with better scroll handling
      const cards = gsap.utils.toArray(".service-card");
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: index * 0.05,
              clearProps: "all",
            });
          },
          onLeave: () => {
            gsap.to(card, {
              opacity: 0,
              y: -20,
              duration: 0.2,
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: index * 0.05,
              clearProps: "all",
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              y: 20,
              duration: 0.2,
            });
          },
        });

        // Optimize hover animations
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(card, {
          scale: 1.03,
          duration: 0.2,
          ease: "power2.out",
          clearProps: "transform",
        });

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services | Syntrad</title>
        <meta
          name="description"
          content="Explore Syntrad's wide range of professional services including Electrical, Electronics, Coffee Machine Repair, Medical Equipment Servicing, and more."
        />
        <meta
          name="keywords"
          content="Syntrad services, electrical engineering, electronics repair, coffee machine maintenance, medical equipment, smart home service, catering, electromechanical repair"
        />
        <meta property="og:title" content="Syntrad Services" />
        <meta
          property="og:description"
          content="Explore our expert repair and maintenance services for electronics, fitness, coffee machines, and more."
        />
        <meta property="og:image" content="/assets/og-services.jpg" />
        <meta property="og:url" content="https://www.syntrad.com/services" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.syntrad.com/services" />
      </Helmet>
      <div
        className="bg-gradient-to-b from-black to-[#330000] text-white py-6 sm:py-10 min-h-screen"
        ref={containerRef}
      >
        <Offer />
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 px-4">
          Our Services
        </h1>

        <div className="grid gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 lg:px-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card rounded-xl p-4 sm:p-6 text-white border border-red-600 bg-gradient-to-br from-[#660000] to-black shadow-xl will-change-transform`}
            >
              <Link
                to={service.link}
                key={index}
                className="service-card cursor-pointer rounded-xl p-4 sm:p-6 text-white border border-red-600 bg-gradient-to-br from-[#660000] to-black shadow-xl will-change-transform block"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-20 sm:h-24 mx-auto object-contain mb-3 sm:mb-4"
                />
                <h2 className="text-lg sm:text-xl font-semibold text-white text-center">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 mt-2">
                  {service.description}
                </p>
              </Link>
              <button
                onClick={() => setSelectedService(service.title)}
                className="mt-3 sm:mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition text-sm sm:text-base"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-hidden">
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
              <RequestQuote
                isModal={true}
                onClose={() => setSelectedService(null)}
                initialService={selectedService}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
