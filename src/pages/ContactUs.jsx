import React from 'react';
import { motion } from 'motion/react';
import ContactFAQSection from '../components/ContactFAQSection';

const ContactUs = () => {
    return (
        <div className="font-primary">
            {/* Hero Section */}
            <section className="container mx-auto px-10 md:px-18 xl:px-19 2xl:px-19 pt-10 xl:pt-20 mb-[75px]">
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
                    {/* Left: Title */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <h1 className="text-[60px] md:text-[80px] font-medium text-black leading-tight mb-8">
                            Let's get <br /> in touch
                        </h1>
                        <p className="text-[30px] md:text-[35px] font-medium text-black leading-tight">
                            Don't be afraid to <br /> say hello with us!
                        </p>
                    </motion.div>

                    {/* Right: Info Area */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 pt-10 lg:pt-20"
                    >
                        <p className="text-[25px] font-medium text-black mb-12 max-w-lg">
                            Great! we're excited to hear from you and let's start something special together. call us for any inquery.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                            <div className="flex flex-col gap-2">
                                <span className="text-black/50 text-[18px]">Phone</span>
                                <span className="text-black text-[18px] font-bold">021-3001-0522</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-black/50 text-[18px]">Whatsapp</span>
                                <span className="text-black text-[18px] font-bold">0811-1889-5089</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-black/50 text-[18px]">Email</span>
                                <span className="text-black text-[18px] font-bold">info@alamasng.com</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Form & FAQ Section */}
            <ContactFAQSection />
        </div>
    );
};

export default ContactUs;
