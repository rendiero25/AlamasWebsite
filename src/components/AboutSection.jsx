import React from 'react';
import { motion } from 'motion/react';
import TimeCircleIcon from "../assets/index/timecircle.png";
import CityBgIcon from "../assets/index/citybackground.png";
import Men3StartsIcon from "../assets/index/menwith3stars.png";

const AboutSection = () => {
    const stats = [
        { label: 'Tones of products sold', value: '5000+' },
        { label: 'Satisfied Customer', value: '200+' },
        { label: 'Provinces in Indonesia', value: '17+' },
        { label: 'Industries Served', value: '5+' },
    ];

    return (
        <section id='aboutusection' className="container mx-auto bg-white font-primary">
            <div className="px-10 2xl:px-19">
                <div className="flex flex-col justify-between items-start gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <span className="text-black text-[25px] font-normal">
                            • About Us
                        </span>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full"
                    >
                        <h2 className="text-2xl md:text-[40px] font-normal text-black leading-relaxed">
                            Founded in 2023 
                            <span className="inline-block align-middle mx-2">
                                <img src={TimeCircleIcon} alt="timecircleicon" className="w-7 md:w-12" />
                            </span>, 

                            <span className="text-primary"> PT Alamas Niaga Gemilang</span> which headquartered in North Jakarta <span 
                                className="inline-block align-middle mx-1"
                            >
                                <img src={CityBgIcon} alt="citybackgroundicon" className="w-12 md:w-22" />
                            </span>, began as a <span className="text-primary decoration-2 underline-offset-4">specialized chemical</span> <span 
                                className="inline-block align-middle mx-1"
                            >
                                <img src={Men3StartsIcon} alt="menwith3starsicon" className="w-7 md:w-12" />
                            </span> solutions provider for the <span className="text-[#040F99] font-normal">polyurethane foam</span> manufacturing industry.
                        </h2>

                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.4
                                    }
                                }
                            }}
                            className="flex flex-row flex-wrap justify-start items-start gap-16 mt-16"
                        >
                            {stats.map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="flex flex-col"
                                >
                                    <span className="text-[70px] xl:text-[80px] 2xl:text-[85px] font-medium text-black mb-2">
                                        {stat.value}
                                    </span>

                                    <span className="text-black text-[25px] font-medium w-full">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
