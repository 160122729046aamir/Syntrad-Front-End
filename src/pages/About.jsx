import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from '../components/AboutUs'
import MultiServiceUI from '../components/Services'
import ReviewCard from '../components/Review'
import ImageSection from '../components/Image'
import { Helmet } from 'react-helmet-async';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Batch animations for better performance
      const sections = gsap.utils.toArray('.animate-section');
      sections.forEach((section, index) => {
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
              delay: index * 0.1,
              ease: "power2.out",
              clearProps: "all"
            });
          },
          onLeave: () => {
            gsap.to(section, {
              opacity: 0,
              y: -30,
              duration: 0.3,
              ease: "power2.in"
            });
          },
          onEnterBack: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "all"
            });
          },
          onLeaveBack: () => {
            gsap.to(section, {
              opacity: 0,
              y: 30,
              duration: 0.3,
              ease: "power2.in"
            });
          }
        });
      });

      // Set initial state
      gsap.set(sections, { opacity: 0, y: 50 });
    }, containerRef);

    return () => {
      ctx.revert();
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
    <Helmet>
    <title>About Us | Syntrad Services</title>
    <meta name="description" content="Learn more about Syntrad, our mission, expert repair services, and what our customers have to say. Trusted for excellence in electronics and more." />
    <meta name="keywords" content="About Syntrad, Syntrad Services, Electronic Repair, Electrical Services, Customer Reviews, Service Company, Kaz Moorjani" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Kaz Moorjani" />
    <meta property="og:title" content="About Us | Syntrad Services" />
    <meta property="og:description" content="Get to know Syntrad — delivering expert repair and maintenance solutions with a proven track record and customer satisfaction." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.syntrad.com/about" />
    <meta property="og:image" content="https://www.syntrad.com/assets/about-banner.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About Us | Syntrad Services" />
    <meta name="twitter:description" content="Explore who we are at Syntrad. Professional repair services, trusted by customers." />
    <meta name="twitter:image" content="https://www.syntrad.com/assets/about-banner.jpg" />
  </Helmet>
    <div className="relative min-h-screen bg-black overflow-hidden" ref={containerRef}>
      <div className="animate-section will-change-transform">
        <AboutSection/>
      </div>
      <div className="animate-section will-change-transform">
        <ImageSection/>
      </div>
      <div className="animate-section will-change-transform">
        <MultiServiceUI/>
      </div>
      <div className="animate-section will-change-transform">
        <ReviewCard/>
      </div>
    </div>
    </>
  );
};

export default About;
