import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Skeleton from "./Skeleton";

const ChemicalSolutionsSection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        // Sort by createdAt desc (newest first) and take top 9
        // Assuming createdAt is available, if not rely on default order or _id
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setProducts(sorted.slice(0, 9));
      } catch (err) {
        console.error(
          "Failed to fetch products for ChemicalSolutionsSection",
          err,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-white font-primary">
      <div className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 flex flex-col justify-between items-start gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-between items-start gap-12 w-full"
        >
          <span className="text-black text-[25px] font-normal">• Products</span>

          <h2 className="text-3xl md:text-[40px] font-normal text-black w-full leading-tight">
            Chemical Solutions for Your Business.
            <br />
            <span className="text-primary font-bold text-3xl xl:text-[40px]">
              From general chemicals to specialty chemicals, we have it all
            </span>
          </h2>
        </motion.div>

        {/* Featured Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <Skeleton variant="product-card" count={9} />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id || index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-white border border-black p-10 rounded-2xl flex flex-col justify-between cursor-default min-h-[160px]"
              >
                <div>
                  <h3 className="font-bold text-[25px] mb-3">{product.name}</h3>
                  <div className="flex flex-wrap gap-4">
                    {/* Handle industry as single object (populated) or array if schema changed. Currently schema has single industry per product */}
                    {(() => {
                      // The current Product model has 'industry' as a single ObjectId reference.
                      // The original code handled multiple industries per product target name.
                      // We will visually display the single industry the product belongs to.
                      const indName = product.industry?.name;
                      if (!indName) return null;

                      const industryColors = {
                        "Food Ingredients": "#009F6F",
                        "Flavor & Fragrance": "#026DD6",
                        "Home and Personal Care": "#E107CB",
                        "Polyurethane Foam": "#E14640",
                        "Cigarettes and Vape": "#333333",
                      };
                      const color = industryColors[indName] || "#000000";

                      return (
                        <span
                          className="text-[16px] font-normal bg-[#D2D3CD]/25 px-4 py-2 rounded-full border"
                          style={{ color: color, borderColor: color }}
                        >
                          {indName}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center w-full mt-4 2xl:mt-12">
          <button
            onClick={() => navigate("/products")}
            className="border border-black hover:scale-110 hover:text-primary text-black text-[20px] font-medium py-4 px-10 rounded-full transition-all uppercase cursor-pointer"
          >
            More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChemicalSolutionsSection;
