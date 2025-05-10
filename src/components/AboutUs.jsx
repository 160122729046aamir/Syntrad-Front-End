import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FaChartLine, FaUsersCog, FaRocket } from "react-icons/fa";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 }); // Trigger when half in view
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const boxVariants = [
    {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
    },
    {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
    },
    {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
    }
  ];

  return (
    <section className="bg-black text-white py-10 px-4 sm:px-8" id="about">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={controls}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4 sm:mb-6">What is SynTrad?</h2>
        <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12">
          Syntrad delivers expert repair and maintenance services for a broad spectrum of electronic engineering and medical equipment throughout London.
          We specialize in providing end-to-end solutions that ensure critical systems remain fully operational, helping organizations minimize downtime and extend the lifespan of essential equipment. Trusted by businesses across the city, our commitment is to excellence, reliability, and rapid response.
          We look forward to the opportunity to serve you soon.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={boxVariants[i]}
              initial="hidden"
              animate={controls}
              className="bg-red-800 bg-opacity-20 rounded-2xl p-4 sm:p-6 shadow-lg"
            >
              {i === 0 && <FaChartLine className="text-white text-3xl sm:text-4xl mb-3 sm:mb-4 mx-auto" />}
              {i === 1 && <FaUsersCog className="text-white text-3xl sm:text-4xl mb-3 sm:mb-4 mx-auto" />}
              {i === 2 && <FaRocket className="text-white text-3xl sm:text-4xl mb-3 sm:mb-4 mx-auto" />}

              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {i === 0 && "Track Campaigns"}
                {i === 1 && "Manage Teams & Traffic"}
                {i === 2 && "Optimize & Grow"}
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                {i === 0 && "Get analytics for all your paid media and organic traffic in one place."}
                {i === 1 && "Control how your traffic is distributed—independently or with a team."}
                {i === 2 && "Improve conversions and profits with testing and ROI tracking tools."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
