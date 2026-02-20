import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import api, { BACKEND_URL } from "../api";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const IndustryList = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await api.get("/industries");
        setIndustries(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  const getSlug = (name) =>
    name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("data:")) return imagePath; // Base64 data URI
    return `${BACKEND_URL}${imagePath}`;
  };

  if (loading)
    return (
      <section className="w-full flex flex-col gap-12 md:gap-24 font-primary mb-[75px]">
        <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19">
          <div className="mb-0">
            <Skeleton variant="text-lg" className="mb-4 !w-80" />
            <Skeleton variant="text" className="!w-full max-w-7xl" />
          </div>
        </div>
        <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 flex flex-col gap-16 md:gap-20">
          <Skeleton variant="image-card" count={3} className="!h-[500px]" />
        </div>
      </section>
    );

  return (
    <section className="w-full flex flex-col gap-12 md:gap-24 font-primary mb-[75px]">
      <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19">
        <div className="mb-0">
          <h2 className="text-3xl md:text-[40px] font-bold text-primary">
            Chemical Solutions{" "}
            <span className="text-black font-bold">For Every Industry</span>
          </h2>
          <p className="text-black mt-4 max-w-7xl font-normal italic text-[20px] md:text-[25px] leading-relaxed">
            We provide specialty chemicals and raw materials sourced from
            trusted local and global partners to support diverse industries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 flex flex-col gap-16 md:gap-20">
        {industries.map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[720px] sm:h-[500px] md:h-[550px] lg:h-[500px] 2xl:h-[520px] group rounded-2xl"
          >
            {/* Background Image */}
            <img
              src={getImageUrl(item.image)}
              alt={item.name}
              className="rounded-2xl absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center px-6 md:px-8 2xl:px-12">
              <div className="bg-black/25 backdrop-blur-2xl p-8 2xl:p-8 rounded-2xl border border-white/10 max-w-full md:max-w-4xl text-white">
                <span className="text-lg md:text-xl italic font-normal block mb-4 opacity-100">
                  {item.name}
                </span>
                <h3 className="text-2xl md:text-[35px] font-bold mb-6 leading-tight">
                  {item.heading}
                </h3>
                <p className="text-base md:text-[18px] font-normal leading-relaxed mb-10 opacity-90">
                  {item.description}
                </p>
                <Link to={`/industry/${getSlug(item.name)}`}>
                  <button className="bg-gradient-to-r from-primary to-[#010533] hover:scale-110 text-white text-[20px] font-medium py-3 px-8 rounded-full transition-all cursor-pointer">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndustryList;
