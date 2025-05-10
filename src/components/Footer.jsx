import { Link } from "react-router-dom";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-red-600 via-black to-black text-white px-6 pt-48 pb-12 overflow-hidden font-sans">
      {/* Modern Wave Shape Like the Provided Image */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[140px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Logo */}
        <div>
          <img src="/assets/logo.png" alt="Logo" className="h-8 w-auto" />
          <p className="text-gray-300 text-sm leading-relaxed">
            Empowering Your Success. © 2025 Syntrad. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link
                to="/"
                className="hover:text-white hover:underline transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white hover:underline transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-white hover:underline transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-white hover:underline transition"
              >
                Review
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <ul className="text-gray-200 space-y-2">
            <li>
              <a
                href="mailto:hello@syntradltd.co.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email: hello@syntradltd.co.uk
              </a>
            </li>
            <li>
              <a
                href="tel:+442071125377"
                target="_blank"
                rel="noopener noreferrer"
              >
                Phone: +44 20 7112 5377
              </a>
            </li>
            <a
              href="https://www.google.com/maps/search/?api=1&query=7,+Bell+Yard,+WC2A+2JR,+Greater+London,+London,+United+Kingdom"
              target="_blank"
              rel="noopener noreferrer"
            >
              Location: 7, Bell Yard, WC2A 2JR, Greater London, London, United
              Kingdom
            </a>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 mt-12 border-t border-red-800 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-300 text-sm">
          © 2025 Syntrad. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/kazmoorjani/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 text-xl transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/syntradltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 text-xl transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/kaz-moorjani/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-500 text-xl transition-colors"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
