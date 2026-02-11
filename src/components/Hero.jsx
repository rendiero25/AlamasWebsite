import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import HeroImage from "../assets/index/heroimage.png";
import PhoneIcon from "../assets/index/phoneicon.png";
import MailIcon from "../assets/index/mailicon.png";

const Hero = () => {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (showPhone) {
      const timer = setTimeout(() => {
        setShowPhone(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPhone]);

  useEffect(() => {
    if (showEmail) {
      const timer = setTimeout(() => {
        setShowEmail(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showEmail]);

  return (
    <div className="flex h-screen w-full font-primary">
      {/* Sidebar */}
      <div className="hidden md:flex w-20 h-[90%] bg-[#F0F0F0] flex-col items-center justify-center relative shrink-0 z-20">
        <div className="w-[2px] h-32 bg-gray-300 mb-6"></div>

        <div className="flex flex-col gap-6 relative">
          {/* Phone Button */}
          <div className="relative">
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            >
              <img
                src={PhoneIcon}
                alt="Phone"
                className="w-8 h-8 object-contain invert-0"
              />
            </button>

            <AnimatePresence>
              {showPhone && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-18 top-1/2 -translate-y-1/2 bg-primary text-white px-8 py-4 rounded-lg whitespace-nowrap shadow-lg"
                >
                  <div className="text-lg font-medium">+62 21 123 4567</div>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-black"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Email Button */}
          <div className="relative">
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
            >
              <img
                src={MailIcon}
                alt="Email"
                className="w-8 h-8 object-contain invert-0"
              />
            </button>
            <AnimatePresence>
              {showEmail && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-18 top-1/2 -translate-y-1/2 bg-primary text-white px-8 py-4 rounded-lg whitespace-nowrap shadow-lg"
                >
                  <div className="text-lg font-medium">info@alamasng.com</div>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-black"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-[2px] h-32 bg-gray-300 mt-6"></div>
      </div>

      {/* Hero Content */}
      <div
        className="flex-1 relative bg-cover bg-center flex items-center shadow-xl"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0"></div>

        <div className="container mx-auto px-10 xl:px-15 2xl:px-19 relative z-10 w-full">
          <div className="max-w-5xl 2xl:-ml-10">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white italic text-lg md:text-[30px] font-medium mb-2 tracking-wider"
            >
              Alamas Niaga Gemilang
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white text-4xl md:text-[70px] font-extrabold leading-tight mb-8 uppercase"
            >
              raw material distributor <br /> company
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white text-lg md:text-[25px] font-medium leading-relaxed mb-10 max-w-5xl"
            >
              Access to decades of expertise and expansive supply network. We
              bridge the gap between global manufacturers and your facility with
              first-hand pricing and a zero-compromise approach to quality.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              href="#aboutusection"
              className="bg-gradient-to-r from-primary to-[#010533] hover:scale-110 text-white text-xs md:text-[20px] font-medium py-4 px-10 rounded-full tracking-widest transition-all cursor-pointer shadow-lg"
            >
              DISCOVER MORE
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
