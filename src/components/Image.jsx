import React from "react";
import { motion } from "framer-motion";

const ImageSection = () => {
  return (
    <div className="flex justify-center my-8 sm:my-16 px-4 bg-white pt-5 pb-5">
      <div className="bg-black text-white flex flex-col md:flex-row items-center rounded-2xl overflow-hidden max-w-6xl w-full shadow-2xl">
        {/* Image */}
        <div className="w-full md:w-1/3 h-64 sm:h-80 md:h-full">
          <img
            src="/assets/owner.jpeg" // replace with actual image path
            alt="Owner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text with animation */}
        <motion.div
          className="p-6 sm:p-8 md:p-10 flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }} // <- allow multiple animations
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-red-700">
            Director Of Syntrad Ltd
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-3 sm:mb-4">
            Hi, I'm{" "}
            <span className="text-red-700 font-semibold">Kaz Moorjani</span>,
            Director & CEO, SyntraD Ltd. Kaz Moorjani leads SyntraD Ltd with a
            hands-on, customer-first approach to technical services and product
            support. With a strong background in engineering and practical
            repair expertise, Kaz has built SyntraD into a reliable name for
            high-quality appliance servicing and repair across a range of
            premium consumer products.
          </p>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-5">
            Under Kaz’s leadership, SyntraD Ltd operates as an authorised agent
            for SAGE coffee machines, as well as a trusted specialist in
            treadmill and gym equipment repairs. Whether working with individual
            clients or commercial contracts, Kaz ensures every job is completed
            with precision, transparency, and professionalism. Leadership Focus:
            Technical Excellence: Overseeing all repair and servicing work to
            meet manufacturer standards. Customer Service: Prioritising fast,
            friendly, and reliable support for both warranty and non-warranty
            issues. Trusted Partnerships: Working closely with brands like SAGE
            and fitness equipment providers to ensure consistent quality and
            authorised service. Team Guidance: Supporting and mentoring
            technicians to maintain high service standards across all jobs.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-5 sm:mb-7">
            Beyond the Business: Kaz also works independently through platforms
            like Airtasker, offering technical services, small repairs, and
            custom installations. His freelance work keeps him directly engaged
            with customers and their everyday needs — ensuring SyntraD remains
            practical, responsive, and rooted in real-world service.
          </p>
          <a
            href="https://www.airtasker.com/users/228a70407caf-p-30688846/"
            className="inline-block bg-red-700 hover:bg-red-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition hero-button"
          >
            More →
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageSection;
