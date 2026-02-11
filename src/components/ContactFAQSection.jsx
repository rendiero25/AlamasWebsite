import React, { useState } from 'react';
import { motion } from 'motion/react';
import FormBg from '../assets/index/formbg.png';
import CityBg from '../assets/index/formbg.png';

const ContactFAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, phone, email, subject, message } = formData;
        const mailtoLink = `mailto:info@alamasng.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        window.location.href = mailtoLink;
    };

    const faqs = [
        {
            q: 'What is your typical lead time for delivery?',
            a: 'Because we maintain a significant ready-stock inventory in our warehouses, we can offer much faster turnaround times. For stocked items, dispatch is immediate; for specialty sourcing through our wider network, our years of logistics experience ensures the most efficient route to your facility.'
        },
        {
            q: 'Do you offer flexible ordering options for smaller businesses?',
            a: 'Yes. One of our core advantages is supporting businesses of all sizes through Low Minimum Order Quantities (MOQs). We understand that not every project requires a big quantity of certain items, so we provide the flexibility to order exactly what you need without the burden of excessive overhead. Some of our products MOQ are 100 grams !!'
        },
        {
            q: 'Do you offer custom sourcing for materials not listed in your catalog?',
            a: 'Absolutely. Our sourcing capability is not limited to our current inventory. If you require a specific chemical or a customized grade of raw material, our extended sourcing network allows us to locate hard-to-find chemicals and specialty raw materials that are not available through standard channels. If it’s on the market, we have the connections to find it for you.'
        },
        {
            q: 'How are your prices so competitive?',
            a: 'We provide first-hand pricing by bridging the gap between global manufacturers and your facility. By eliminating unnecessary middlemen and leveraging our long-standing direct relationships with factories, we pass the cost savings directly to you.'
        },
        {
            q: 'Who will be managing my account and orders?',
            a: 'Your account will be handled by personnel with 10+ years of technical experience in chemical distribution. You aren’t just getting a salesperson; you are getting a partner who understands the technical specifications, safety requirements, and supply chain nuances of raw material trading'
        },
        {
            q: 'Can you provide technical documentation and COAs for your products?',
            a: 'Transparency is central to our "original goods" guarantee. Every batch we distribute is accompanied by a Certificate of Analysis (COA) and necessary Material Safety Data Sheets (MSDS). We ensure that the technical specifications delivered to your facility perfectly match the manufacturer’s original standards.'
        },
        {
            q: 'How do you handle quality disputes or discrepancies?',
            a: 'Because we prioritize long-term partnerships, we stand firmly behind the integrity of our goods. Our years of experienced personnel follow a rigorous quality-control protocol. In the rare event of a discrepancy, we provide rapid technical support and a transparent resolution process to ensure your production remains uninterrupted.'
        },
    ];

    return (
        <section className="font-primary">
            <div className="flex flex-col lg:flex-row min-h-[700px]">
                {/* Left: Contact Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2 relative min-h-[600px] flex items-center justify-center p-8 md:p-20 overflow-hidden"
                >
                    <img src={CityBg} alt="back" className="absolute inset-0 w-full h-full object-cover" />
                    
                    <div 
                        className="relative z-10 w-full max-w-xl bg-black/50 backdrop-blur-xl p-10 md:p-12 rounded-2xl"
                    >
                        <h2 className="text-white text-[35px] font-normal mb-10 leading-relaxed">
                            Let's Start a Conversation About Your Needs
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid 2xl:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name" 
                                    className="bg-transparent border-b border-white/30 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white"
                                    required
                                />
                                <input 
                                    type="text" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone" 
                                    className="bg-transparent border-b border-white/30 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white"
                                    required
                                />
                            </div>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email" 
                                className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white"
                                required
                            />
                            <input 
                                type="text" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject" 
                                className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white"
                                required
                            />
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message" 
                                rows="3"
                                className="w-full bg-transparent border-b border-white/30 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white resize-none"
                                required
                            ></textarea>
                            
                            <div className="pt-6">
                                <button type="submit" className="cursor-pointer w-1/2 py-4 border border-white/50 hover:bg-white hover:text-black rounded-full text-white text-[20px] font-medium tracking-widest transition-all">
                                    SEND 
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Right: FAQ */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:w-1/2"
                >
                    <div className='flex flex-col justify-between items-center h-full'>
                        <div className='hidden 2xl:flex bg-white w-full h-25'></div>
                        
                        <div className="w-full h-full bg-[#F0F0F0] p-10 2xl:p-24">
                            <h2 className="text-3xl md:text-[40px] font-normal text-black mb-12">
                                Frequently Asked <span className="text-primary font-bold">Questions</span>
                            </h2>
                            
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-[#9E9E9E]/50 py-6 pr-0 md:pr-10">
                                        <button 
                                            className="cursor-pointer w-full flex flex-row justify-between items-center text-left focus:outline-none"
                                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                        >
                                            <span className={`text-[20px] md:text-[25px] font-bold transition-colors cursor-pointer ${openIndex === index ? 'text-primary' : 'text-black'}`}>
                                                {faq.q}
                                            </span>
                                            <span className="text-2xl text-black ml-5 md:ml-0">
                                                {openIndex === index ? '−' : '+'}
                                            </span>
                                        </button>
                                        
                                        <div className={`mt-4 mr-5 md:mr-0 text-black text-[20px] md:text-[25px] leading-relaxed transition-all duration-300 overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {faq.a}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </motion.div>
            </div>
        </section>
    );
};

export default ContactFAQSection;
