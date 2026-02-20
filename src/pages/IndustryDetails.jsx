import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import api, { BACKEND_URL } from "../api";
import ContactFAQSection from "../components/ContactFAQSection";
import {
  FaFlask,
  FaVial,
  FaMicroscope,
  FaDna,
  FaAtom,
  FaFillDrip,
  FaIndustry,
} from "react-icons/fa";
import Skeleton from "../components/Skeleton";

const categoryIcons = {
  Acids: <FaFlask className="text-black" />,
  "Polyols and Glycols": <FaVial className="text-black" />,
  Solvents: <FaMicroscope className="text-black" />,
  "Surfactants and Emulsifiers": <FaDna className="text-black" />,
  Catalysts: <FaAtom className="text-black" />,
  "Specialty Chemicals": <FaFillDrip className="text-black" />,
  "Industrial Chemicals": <FaIndustry className="text-black" />,
};

const IndustryDetails = () => {
  const { slug } = useParams();
  const [industry, setIndustry] = useState(null);
  const [groupedProducts, setGroupedProducts] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch all industries to find the ID matching the slug
        const indRes = await api.get("/industries");
        const foundIndustry = indRes.data.find((i) => getSlug(i.name) === slug);

        if (!foundIndustry) {
          setLoading(false);
          return;
        }
        setIndustry(foundIndustry);

        // 2. Fetch products for this industry
        const prodRes = await api.get(
          `/products?industryId=${foundIndustry._id}`,
        );
        const products = prodRes.data;

        // 3. Group products by category
        const grouped = {};
        products.forEach((p) => {
          if (!grouped[p.category]) {
            grouped[p.category] = [];
          }
          grouped[p.category].push({
            name: p.name,
            // Add other fields if needed for display
          });
        });

        // Transform to array format: [{ name: 'Category', products: ['Prod1', 'Prod2'] }]
        // Note: The UI expects products to be strings or objects?
        // Original code: cat.products.map(product => product) -> renders {product} directly ?
        // Wait, original json struct: categories: [{ name: "Acids", products: ["Malic Acid"] }]
        // So products is array of strings.

        const categoriesArray = Object.keys(grouped).map((catName) => ({
          name: catName,
          products: grouped[catName].map((p) => p.name),
        }));

        setGroupedProducts({ categories: categoriesArray });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col gap-[50px] font-primary">
        <div className="flex w-full h-[450px]">
          <div className="hidden md:flex w-20 h-[350px] bg-[#F0F0F0] shrink-0"></div>
          <Skeleton variant="text" className="!h-full flex-1 !rounded-none" />
        </div>
        <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 flex flex-col gap-3">
            <Skeleton variant="text-lg" className="!w-3/4" />
            <Skeleton variant="text-lg" className="!w-1/2" />
          </div>
          <div className="md:w-1/2 flex flex-col gap-3">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="!w-2/3" />
          </div>
        </div>
        <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 mb-[75px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <Skeleton variant="product-card" count={10} />
          </div>
        </div>
      </div>
    );
  if (!industry)
    return <div className="p-20 text-center">Industry not found</div>;

  return (
    <div className="min-h-screen flex flex-col gap-[50px] font-primary">
      {/* Hero Section */}
      <div className="flex w-full h-[450px]">
        {/* Sidebar */}
        <div className="hidden md:flex w-20 h-[350px] bg-[#F0F0F0] flex-col items-center justify-center relative shrink-0 z-20"></div>
        {/* Hero Content */}
        <div
          className="flex-1 relative bg-cover bg-center shadow-xl"
          style={{ backgroundImage: `url(${getImageUrl(industry.image)})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative h-full flex items-end p-10">
            <div className="absolute ">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="text-white text-3xl md:text-[40px] font-medium"
              >
                {industry.name}
              </motion.h1>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 flex flex-col md:flex-row justify-between items-end gap-12"
      >
        <div className="md:w-1/2">
          <h2 className="text-[35px] sm:text-[50px] font-medium text-black leading-tight">
            {industry.heading}
          </h2>
        </div>
        <div className="md:w-1/2 flex items-center">
          <p className="text-black text-[25px] lg:text-[30px] font-normal leading-tight">
            {industry.description}
          </p>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 flex flex-col gap-4"
      >
        <span className="text-black text-[25px] font-normal">
          • Product List
        </span>

        <p className="text-black text-[20px] lg:text-[25px] font-normal max-w-3xl">
          {industry.productListDescription}
        </p>
      </motion.div>

      {/* Products Grouped by Category */}
      <section className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 mb-[75px]">
        {groupedProducts?.categories.map((cat, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <span className="text-2xl">
                {categoryIcons[cat.name] || <FaFlask />}
              </span>
              <h3 className="text-3xl font-normal text-black">{cat.name}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {cat.products.map((product, pIdx) => (
                <div
                  key={pIdx}
                  className="border border-black p-6 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all bg-white group hover:-translate-y-1"
                >
                  <div>
                    <h4 className="font-bold text-xl mb-4 leading-tight group-hover:text-primary transition-colors">
                      {product}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[12px] font-normal bg-[#D2D3CD]/25 border border-[#999996] px-3 py-1 rounded-full text-black">
                        {industry.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <ContactFAQSection />
    </div>
  );
};

export default IndustryDetails;
