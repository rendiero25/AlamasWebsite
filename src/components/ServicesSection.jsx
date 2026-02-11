import React from 'react';
import { motion } from 'motion/react';
import ServiceBg1 from '../assets/index/serviceweofferbg1.png';
import ServiceBg2 from '../assets/index/serviceweofferbg2.png';
import ServiceBg3 from '../assets/index/serviceweofferbg3.png';
import MenIcon from '../assets/index/menwith3stars.png';
import TimeIcon from '../assets/index/timecircle.png';

const ServicesSection = () => {
    const services = [
        {
            title: 'Expert Consultation',
            desc: 'Consult your problem with us, and we will provide the right solution. Right function, right price.',
            bg: ServiceBg1
        },
        {
            title: 'Strategic Sourcing',
            desc: 'If you have problem finding certain chemicals, we can help you to source it and deliver to you with ease.',
            bg: ServiceBg2
        },
        {
            title: 'Efficient Supply Chain',
            desc: 'We can distribute our products swiftly to any location you need, ensuring your business runs without delays.',
            bg: ServiceBg3
        },
    ];

    return (
        <section className="font-primary">
            <div className="container mx-auto px-10 2xl:px-19">
                <div className="flex flex-col 2xl:flex-row gap-2 items-center lg:items-start justify-between">
                    <div className="flex flex-col xl:flex-row 2xl:flex-col justify-between items-center xl:items-end 2xl:items-start gap-10">
                        <h2 className="text-4xl md:text-[40px] font-extrabold uppercase text-black leading-none">
                            Services <br />
                            <span className="font-light text-[80px] xl:text-[60px] text-primary uppercase" >We <br /> Offer</span>
                        </h2>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-black text-[25px] leading-relaxed w-full 2xl:max-w-sm text-center xl:text-left"
                        >
                            At Alamas, We Deliver Tailored
                            solutions from consulting to
                            sourcing and supply chain,
                            ensuring quality and reliability
                            every step of the way.
                        </motion.p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 }
                            }
                        }}
                        className="flex flex-row flex-wrap items-center 2xl:items-start justify-center justify-between gap-5 mt-5 2xl:mt-0"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                }}
                                className="relative h-[650px] w-[325px] 2xl:w-[305px] rounded-2xl overflow-hidden group shadow-lg"
                            >
                                <img
                                    src={service.bg}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                
                                <div className="absolute bottom-0 p-8 w-full flex flex-col justify-between items-start">
                                    <h3 className="text-white text-[25px] font-bold mb-3 max-w-[11rem]">{service.title}</h3>
                                    <p className="text-white text-[18px] font-light leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
