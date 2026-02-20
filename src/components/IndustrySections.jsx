import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import api, { BACKEND_URL } from "../api";
import Skeleton from "./Skeleton";

const IndustrySections = () => {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSlug = (name) =>
    name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  React.useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await api.get("/industries");
        // Sort by createdAt desc if available, or just map response
        // Assuming sorting happens here or backend returns in strict order
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        // Map API data to component structure
        const mapped = sorted.slice(0, 3).map((ind) => {
          // Handle different image formats: Base64, absolute URL, or relative path
          let bgImage = null;
          if (ind.image) {
            if (ind.image.startsWith("data:") || ind.image.startsWith("http")) {
              bgImage = ind.image;
            } else {
              bgImage = `${BACKEND_URL}${ind.image}`;
            }
          }
          return {
            category: ind.name,
            title: ind.heading,
            desc: ind.description,
            bg: bgImage,
            cardBg: "bg-black/25 backdrop-blur-2xl",
            slug: getSlug(ind.name),
          };
        });
        setIndustries(mapped);
      } catch (err) {
        console.error("Failed to fetch industries", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  return (
    <section className="bg-white font-sans">
      <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col justify-between items-start gap-12"
        >
          <span className="text-black text-[25px] font-normal">
            • Industries
          </span>

          <h2 className="text-3xl md:text-[40px] font-normal text-black w-full leading-tight max-w-328">
            From sourcing to supply chain innovation,
            <br />
            <span className="text-primary font-bold text-3xl xl:text-[40px]">
              Our solutions are built to deliver efficiency, safety, and
              long-term resilience for industries.
            </span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex flex-col gap-8 mb-16">
            <Skeleton variant="image-card" count={3} />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="flex flex-col gap-8 mb-16"
          >
            {industries.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative h-[400px] md:h-[600px] lg:h-[470px] rounded-2xl overflow-hidden group"
              >
                <img
                  src={item.bg}
                  alt={item.category}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center p-6 md:p-12">
                  <div
                    className={`${item.cardBg} p-8 2xl:p-12 rounded-2xl max-w-3xl relative`}
                  >
                    <span className="text-white text-[25px] font-medium italic mb-2 block leading-tight">
                      {item.category}
                    </span>
                    <h3 className="text-white text-lg md:text-[35px] font-bold mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white text-xs md:text-[18px] leading-relaxed mb-6 max-w-4xl hidden md:block">
                      {item.desc}
                    </p>

                    <button
                      onClick={() => navigate(`/industry/${item.slug}`)}
                      className="mt-10 2xl:mt-0 bg-gradient-to-r from-primary to-[#010533] hover:scale-110 text-white text-[20px] font-medium py-3 px-8 rounded-full transition-all cursor-pointer"
                    >
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/industry")}
            className="border border-black hover:scale-110 hover:text-primary text-black text-[20px] font-medium py-4 px-10 rounded-full transition-all uppercase cursor-pointer"
          >
            More Industries
          </button>
        </div>
      </div>
    </section>
  );
};

export default IndustrySections;
