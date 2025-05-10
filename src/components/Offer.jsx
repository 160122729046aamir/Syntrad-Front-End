import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from 'react-router-dom';

const Offer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative bg-black text-white py-20 px-6 overflow-hidden" ref={ref}>
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-[url('/mesh-bg.png')] bg-cover opacity-20 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Robot Image */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="assets/serviceMain.png"
            alt="Robot"
            className="w-64 md:w-80 object-contain"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-red-600">20% OFF</span>
            <br />
            ON YOUR FIRST APPOINTMENT
          </h1>
          <p className="text-gray-300 italic text-sm">** Conditions apply</p>
          
          {/* Request Quote Button */}
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition"
            >
              Request Quote
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Offer;
