import React from 'react';
import { motion } from 'motion/react';
import HeroImage from '../assets/aboutus/hero-image.png';
import MissionBg from '../assets/aboutus/misson-bg.png';
import VisionBg from '../assets/aboutus/vission-bg.png';
import IntegrityIcon from '../assets/aboutus/intergrity-icon.png';
import CustomerIcon from '../assets/aboutus/customer-icon.png';
import InnovationIcon from '../assets/aboutus/innovation-icon.png';
import PhoneIcon from '../assets/index/phoneicon.png';
import MailIcon from '../assets/index/mailicon.png';
import ContactFAQSection from '../components/ContactFAQSection';

const AboutUs = () => {
    const stats = [
        { label: 'Tons of products sold', value: '5000+' },
        { label: 'Satisfied Customer', value: '200+' },
        { label: 'Provinces in Indonesia', value: '17+' },
        { label: 'Industries served', value: '5+' },
    ];

    const values = [
        {
            title: 'Integrity',
            desc: 'We conduct business with transparency, honesty, and ethics at our core, building things in trustworthy relationships with suppliers and partners.',
            icon: IntegrityIcon,
        },
        {
            title: 'Customer Centric',
            desc: "We strive to understand our customers' needs by offering tailored solutions, reliable service, and technical expertise.",
            icon: CustomerIcon,
        },
        {
            title: 'Innovation',
            desc: 'We are committed to stay ahead in an ever-growing market by home-grown upgradable chemical solutions that meet evolving industry needs.',
            icon: InnovationIcon,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="flex flex-col gap-[50px] 2xl:gap-[125px] font-primary overflow-hidden">
            {/* Hero Section */}
            <div className="flex w-full h-[450px]">
                {/* Sidebar */}
                <div className="hidden md:flex w-20 h-[350px] bg-[#F0F0F0] flex-col items-center justify-center relative shrink-0 z-20"></div>
                {/* Hero Content */}
                <div 
                    className="flex-1 relative bg-cover bg-center shadow-xl"
                    style={{ backgroundImage: `url(${HeroImage})` }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    <div className="relative h-full flex items-end p-10">
                        <div className="absolute ">
                            <motion.h1 
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className="text-white text-5xl md:text-[40px] font-normal"
                            >
                                About Us
                            </motion.h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 flex flex-col justify-center items-center text-center gap-12"
            >
                <span className="text-black text-[25px] font-normal">• Our Story</span>
                <h2 className="text-2xl md:text-[40px] font-bold text-black leading-tight">
                    Shaping the future through <span className="text-primary font-bold">innovation and expertise</span>
                </h2>

                <div className="flex flex-col lg:flex-row justify-center items-center md:items-start gap-16 2xl:mt-16 w-full">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="flex flex-col flex-1"
                        >
                            <span className="text-[70px] xl:text-[80px] 2xl:text-[85px] font-medium text-black mb-2">
                                {stat.value}
                            </span>
                            <span className="text-black text-[25px] font-medium w-full">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto space-y-8 text-2xl lg:text-[25px] font-normal italic leading-relaxed text-black">
                    <p>
                        Founded in 2023, PT Alamas Niaga Gemilang which headquartered in North Jakarta, 
                        began as a specialized chemical solutions provider for the polyurethane foam manufacturing industry. 
                        We proudly serve the full range of polyurethane foam sectors, including flexible and moulded foam production.
                        By 2025, Alamas has successfully expanded into key industries including personal care, 
                        flavors & fragrances, tobacco, and paints. We are committed to becoming a globally recognized leader in 
                        chemical distribution—delivering innovation, championing sustainable solutions, and building robust, 
                        resilient supply chains that empower industries worldwide.      
                    </p>
                </div>
            </motion.section>

            {/* Mission & Vision Section */}
            <section className="container mx-auto px-10 2xl:px-2 w-full flex flex-col gap-8">
                {/* Mission Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[450px] sm:h-[290px] md:h-[400px] lg:h-[350px] 2xl:h-[470px] rounded-2xl overflow-hidden group shadow-xl"
                >
                    <img
                        src={MissionBg}
                        alt="Mission"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 p-8 md:p-10 xl:p-25 flex flex-col xl:flex-row items-start md:items-center justify-between gap-4 xl:gap-30">
                        <h3 className="text-white text-[40px] md:text-[45px] font-bold">Mission</h3>
                        <p className="text-white text-[18px] md:text-[25px] font-normal leading-relaxed">
                            To empower Indonesian industries with access to the world's finest raw materials and 
                            state-of-the-art equipment, fostering innovation, driving sustainable growth, and 
                            propelling Indonesia to the forefront of global manufacturing.
                        </p>
                    </div>
                </motion.div>

                {/* Vision Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[450px] sm:h-[300px] md:h-[400px] lg:h-[350px] 2xl:h-[470px] rounded-2xl overflow-hidden group shadow-xl"
                >
                    <img 
                        src={VisionBg} 
                        alt="Vision" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 p-8 md:p-10 xl:p-25 flex flex-col xl:flex-row items-start md:items-center justify-between gap-4 xl:gap-30">
                        <h3 className="text-white text-[40px] md:text-[45px] font-bold">Vision</h3>
                        <p className="text-white text-[18px] md:text-[25px] font-normal leading-relaxed">
                            To establish Indonesia at the pinnacle of global production, renowned not only for 
                            the quantity but also for the unmatched quality and reliability of its products, 
                            making it the go-to destination for world-class manufacturing solutions.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Our Values Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="container mx-auto px-8 md:px-24 flex flex-col items-center text-center"
            >
                <span className="text-black text-[25px] font-normal mb-16">• Our Values</span>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
                    {values.map((val, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="flex flex-col items-center group"
                        >
                            <motion.div 
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="w-24 h-24 mb-8 flex items-center justify-center p-4 cursor-pointer"
                            >
                                <img src={val.icon} alt={val.title} className="max-w-full max-h-full" />
                            </motion.div>
                            <h4 className="text-[25px] font-bold text-black mb-4">{val.title}</h4>
                            <p className="text-[20px] text-black font-normal leading-relaxed max-w-md">
                                {val.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Reuse Contact & FAQ Section */}
            <ContactFAQSection />
        </div>
    );
};

export default AboutUs;

