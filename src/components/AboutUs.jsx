import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FaSuitcase, FaPoundSign,FaHardHat} from "react-icons/fa";

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
              {i === 0 && <FaSuitcase className="text-white text-3xl sm:text-4xl mb-3 sm:mb-4 mx-auto" />}
              {i === 1 && <FaPoundSign className="text-white text-3xl sm:text-4xl mb-3 sm:mb-4 mx-auto" />}
              {i === 2 && <FaHardHat className="text-white text-3xl sm:text-4xl mb-3 sm:mb-4 mx-auto" />}

              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {i === 0 && "Who We Are"}
                {i === 1 && "What We Do"}
                {i === 2 && "Why Choose Us"}
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                {i === 0 && "At Syntrad Ltd, we’re a team of certified electricians committed to delivering safe, reliable, and high-quality electrical solutions for homes and businesses across the region."}
                {i === 1 && "From full installations and rewiring to maintenance and emergency repairs, Syntrad Ltd provides expert electrical services tailored to your specific needs—on time and on budget."}
                {i === 2 && "With a reputation built on trust, professionalism, and technical excellence, Syntrad Ltd is your go-to partner for electrical work done right the first time."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
