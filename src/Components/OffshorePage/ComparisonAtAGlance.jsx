"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Container from "../Common/Container";
import Image from "next/image";

export default function ComparisonAtAGlance() {
    const comparisonData = [
        {
            feature: "Cost",
            dubai: "High",
            rak: "Moderate",
            ajman: "Low",
        },
        {
            feature: "Prestige",
            dubai: 5,
            rak: 4,
            ajman: 3,
        },
        {
            feature: "Property Ownership",
            dubai: "Yes (Approved Dubai areas)",
            rak: "Limited",
            ajman: "No",
        },
        {
            feature: "Banking Access",
            dubai: "Excellent",
            rak: "Very Good",
            ajman: "Good",
        },
        {
            feature: "Best for",
            dubai: "Asset holding, investment firms",
            rak: "SMEs & global trade firms",
            ajman: "Budget offshore setups",
        },
    ];

    // Reusable star renderer
    const renderStars = (count) => (
        <div className="flex justify-center">
            {[...Array(count)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
        </div>
    );

    return (
        <section className=" relative text-white py-8 md:py-18 overflow-hidden">
            <div className="absolute left-[-10%] md:left-[-10px] -z-10 top-0   pointer-events-none select-none">
                <Image
                    src="/assets/images/bg/left_glass_element.png"
                    alt="Decorative shapes"
                    width={219}
                    height={247}
                    className="object-contain  w-30 md:w-36 lg:w-60"
                />
            </div>
            <Container>
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Heading */}
                    <h2 className="text-3xl md:text-[2rem] font-bold text-center mb-12">
                        Comparison at a Glance
                    </h2>

                    {/* Table */}
                    <div className="w-full ">
                        {/* Header Table (with spacing between ths) */}
                        <table className="w-full table-fixed text-center text-sm md:text-base border-collapse">
                            <colgroup>
                                <col className="w-1/4" /> {/* Feature */}
                                <col className="w-1/4" /> {/* Dubai */}
                                <col className="w-1/4" /> {/* RAK */}
                                <col className="w-1/4" /> {/* Ajman */}
                            </colgroup>

                            {/* ---------- TABLE HEADER ---------- */}
                            <thead className="border-separate border-spacing-x-3">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold glass-bg rounded-xl">
                                        Feature
                                    </th>
                                    <th className="px-4 py-3 font-semibold glass-bg rounded-xl">
                                        Dubai (JAFZA Offshore)
                                    </th>
                                    <th className="px-4 py-3 font-semibold glass-bg rounded-xl">
                                        RAK Offshore
                                    </th>
                                    <th className="px-4 py-3 font-semibold glass-bg rounded-xl">
                                        Ajman Offshore
                                    </th>
                                </tr>
                            </thead>

                            {/* ---------- TABLE BODY ---------- */}
                            <tbody>
                                {comparisonData.map((row, index) => (
                                    <tr key={index} className="transition duration-200">
                                        <td className="px-4 py-3 text-left text-gray-300 border-t border-[#376CBC]/80">
                                            {row.feature}
                                        </td>
                                        <td className="px-4 py-3 border-t border-l border-[#376CBC]/80">
                                            {typeof row.dubai === 'number' ? renderStars(row.dubai) : row.dubai}
                                        </td>
                                        <td className="px-4 py-3 border-t border-l border-[#376CBC]/80">
                                            {typeof row.rak === 'number' ? renderStars(row.rak) : row.rak}
                                        </td>
                                        <td className="px-4 py-3 border-t border-l border-[#376CBC]/80">
                                            {typeof row.ajman === 'number' ? renderStars(row.ajman) : row.ajman}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>

                </motion.div>
            </Container>
        </section>
    );
}
