import React from 'react'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

const ImageSection = () => {
  return (
    <div className="flex justify-center my-8 sm:my-16 px-4 bg-white pt-5 pb-5">
      <div className="bg-black text-white flex flex-col md:flex-row items-center rounded-2xl overflow-hidden max-w-6xl w-full shadow-2xl">
        
        {/* Image */}
        <div className="w-full md:w-1/3 h-64 sm:h-80 md:h-full">
          <img
            src="/assets/owner.jpg" // replace with actual image path
            alt="Owner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text with animation */}
        <motion.div
          className="p-6 sm:p-8 md:p-10 flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }} // <- allow multiple animations
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-red-700">Director Of Syntrad Ltd</h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-3 sm:mb-4">
            Hi, I'm <span className="text-red-700 font-semibold">P.Moorjani (Kaz)</span>, the founder of Syntrad.
            I started this venture with a mission to bring precision, trust, and speed to electronic and equipment repair.
          </p>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-5">
            With a strong background in electronics and years of hands-on experience, I believe every device deserves expert attention.
            At Syntrad, we merge technical excellence with customer-first service to keep your essential tech running like new.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-5 sm:mb-7">"We know we are the best at what we do, thats revolutionising the electronic industry by implementing a whole new dimension"</p>
          <a
            href="https://www.airtasker.com/users/228a70407caf-p-30688846/"
            className="inline-block bg-red-700 hover:bg-red-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition hero-button"
          >
            More →
          </a>
        </motion.div>
        
      </div>
      
    </div>
  )
}

export default ImageSection
