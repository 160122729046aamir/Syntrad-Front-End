import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from '../components/AboutUs'
import MultiServiceUI from '../components/Services'
import ReviewCard from '../components/Review'
import ImageSection from '../components/Image'

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
  );
};

export default About;
