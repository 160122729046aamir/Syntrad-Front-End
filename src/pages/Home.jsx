import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import RequestQuote from "../components/RequestQuote";
import AboutSection from "../components/AboutUs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a main timeline for better sequencing
      const mainTl = gsap.timeline({
        defaults: {
          ease: "power2.out",
          duration: 0.4,
        },
      });

      // Hero text animation with better sequencing
      mainTl
        .from(".hero-text", {
          opacity: 0,
          x: -30,
          stagger: 0.1,
          clearProps: "all",
        })
        .from(
          ".hero-button",
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            clearProps: "all",
          },
          "-=0.2"
        )
        .from(
          ".hero-image",
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
            clearProps: "all",
          },
          "-=0.3"
        )
        .from(
          ".glow-effect",
          {
            opacity: 0,
            duration: 0.6,
            clearProps: "opacity",
          },
          "-=0.4"
        );

      // Scroll animations for other sections
      const sections = gsap.utils.toArray(".scroll-section");
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "all",
            });
          },
          onLeave: () => {
            gsap.to(section, {
              opacity: 0,
              y: -30,
              duration: 0.3,
            });
          },
          onEnterBack: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "all",
            });
          },
          onLeaveBack: () => {
            gsap.to(section, {
              opacity: 0,
              y: 30,
              duration: 0.3,
            });
          },
        });
      });

      // Set initial state for scroll sections
      gsap.set(sections, { opacity: 0, y: 50 });

      // Optimize read more button hover
      const readMoreBtn = document.querySelector(".read-more-btn");
      if (readMoreBtn) {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(readMoreBtn, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
          clearProps: "transform",
        });

        readMoreBtn.addEventListener("mouseenter", () => hoverTl.play());
        readMoreBtn.addEventListener("mouseleave", () => hoverTl.reverse());
      }
    }, containerRef);

    return () => {
      ctx.revert();
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Syntrad | Expert Electrical & Electronic Repair Solutions in London
        </title>
        <meta
          name="description"
          content="Discover Syntrad – London's trusted source for innovative electrical and electronic repair services. Excellence, innovation, and reliability all in one place."
        />
        <meta
          name="keywords"
          content="Electrical Repair, Electronic Services, London Electronics, Syntrad, Circuit Repair, Innovative Electrical Solutions, Engineering Services"
        />
        <meta name="author" content="Syntrad" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Syntrad | Expert Electrical & Electronic Repair Solutions in London"
        />
        <meta
          property="og:description"
          content="Welcome to Syntrad – your top destination for electrical and electronic repair services in London. Innovation meets excellence."
        />
        <meta
          property="og:image"
          content="https://syntradltd.co.uk/assets/homeMain.png"
        />
        <meta property="og:url" content="https://syntradltd.co.uk/" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Syntrad | Expert Electrical & Electronic Repair Solutions in London"
        />
        <meta
          name="twitter:description"
          content="Trusted experts in electrical and electronic services across London."
        />
        <meta
          name="twitter:image"
          content="https://syntradltd.co.uk/assets/homeMain.png"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="https://syntradltd.co.uk/" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Syntrad",
            "image": "https://syntradltd.co.uk/assets/logo.png",
            "description": "Expert electrical and electronic repair services in London",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "London",
              "addressCountry": "UK"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "51.5074",
              "longitude": "-0.1278"
            },
            "url": "https://syntradltd.co.uk",
            "telephone": "+44XXXXXXXXXX",
            "priceRange": "££",
            "openingHours": "Mo-Fr 09:00-17:00",
            "sameAs": [
              "https://www.facebook.com/syntrad",
              "https://www.linkedin.com/company/syntrad",
              "https://twitter.com/syntrad"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Repair Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Electrical Engineering Services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Electronic Repair Services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Coffee Machine Repair"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="flex flex-col w-full overflow-hidden" ref={containerRef}>
        <section className="relative bg-black text-white min-h-screen w-full">
          <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Text Content */}
            <div className="w-full md:w-1/2 z-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white hero-text mb-4">
                Innovative <span className="text-red-600">Solution</span> for
                Your Electrical Needs
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mb-6 md:mb-8 hero-text max-w-xl">
                Welcome to London's Premier Destination for World-class
                Electronic Engineering Services - Ranked #1 for innovation,
                Excellence, and Reliability!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/services"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition hero-button will-change-transform text-center text-base"
                >
                  Our Services →
                </Link>
                <Link
                  to="/contact"
                  className="border border-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition hero-button will-change-transform text-center text-base"
                >
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 z-10 hero-image will-change-transform">
              <img
                src="assets/homeMain.png"
                alt="Hero Robot"
                className="w-full h-auto max-w-md mx-auto md:max-w-full object-contain"
              />
            </div>
          </div>

          {/* Red Glow Effect with animation */}
          <motion.div
            className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-red-700/20 blur-3xl z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </section>
        {/* Other Sections */}
        <Card />
        <AboutSection />

        {/* Read More Button - Keep it on Home but after About */}
        <div className="flex justify-center bg-black">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/about")}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg transition duration-300"
          >
            Read More
          </motion.button>
        </div>

        <RequestQuote />
      </div>
    </>
  );
};

export default Hero;
