"use client"
import React from 'react';
import Container from '../../Common/Container';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const Companyformation = () => {
  const cards = [
    {
      id: 1,
      title: "Mainland",
      description: "Start your UAE Mainland business and trade anywhere within the Emirates, partner with government entities, and enjoy full operational flexibility. Ideal for retail, consulting, contracting, corporate offices, and service businesses seeking maximum market access.",
      image: "/assets/images/company-formation/Main-land.png",
      path:'mainland-company-formation-in-uae'
    },
    {
      id: 2,
      title: "Freezone",
      description: "Get 100% foreign ownership, tax benefits, and fast setup in UAE Freezones — ideal for e-commerce, trading, media, technology, and global businesses. ADL helps you choose the best Freezone based on your activity, budget, and visa needs.",
      image: "/assets/images/company-formation/Freezone.png",
      path:'uae-freezone-business-setup'
    },
    {
      id: 3,
      title: "Offshore",
      description: "Establish an Offshore entity for global trade, asset protection, and tax-efficient international operations  without a physical office in the UAE. ADL ensures a secure, compliant, and seamless Offshore company setup.",
      image: "/assets/images/company-formation/Offshore.png",
      path:'offshore-company-formation-in-uae'
    }
  ];

  const router = useRouter();
  const handleNavigation = (path) => {
    const route = path;
    router.push(route);
  };

  return (
    <Container>
      <div className="xl:h-[700px] h-auto flex items-center justify-center py-8 md:py-14  relative overflow-hidden">
        <div className="relative z-10 max-w-7xl  w-full">

          {/* Section Heading */}
          <motion.div
            className="text-start mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl main-text font-bold text-white ">
              Start Your Company in the UAE
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                onClick={() => handleNavigation(card.path)}
                className="flex cursor-pointer flex-col items-center md:items-start h-full"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.35 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.12,
                }}
              >
                <div
                  className="
                    group relative w-72 md:w-80 p-3 rounded-3xl overflow-hidden
                    glass-bg transition-all duration-500 transform hover:scale-105
                    flex-shrink-0
                  "
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
                    <h3 className="text-3xl lg:text-4xl font-semibold text-white">
                      {card.title}
                    </h3>
                  </div>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-64 rounded-3xl transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>

                <div className="mt-6 flex flex-col  flex-1 text-start">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white text-center md:text-start mb-1 md:mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm max-w-md font-normal leading-relaxed px-3 md:px-0 text-center md:text-start">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </Container>
  );
};

export default Companyformation;
