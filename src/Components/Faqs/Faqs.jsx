"use client"
import { useEffect, useState } from "react";
import Container from "../Common/Container";
import { faqs } from "@/lib/api/apis";

export default function FAQ() {
    // const faqs = Array(10).fill({
    //     question: "How can I start a business in Dubai with ADL Business Solutions?",
    //     answer:
    //         "Starting a business in Dubai is simple with ADL Business Solutions. We handle everything — from business setup, trade licenses, and visa processing to bank account opening and document clearances. Our experts ensure fast and cost-effective company formation in Dubai with 100% compliance.",
    // });

    const [openIndex, setOpenIndex] = useState(null);
    const [faqsData, setFaqdata] = useState([])
    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const res = await faqs("faqpage")
                if (res.success) {

                    setFaqdata(res.data)
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchFaq()
    }, [])
    return (
        <Container>
            <div className="w-full max-w-6xl mx-auto py-10 space-y-3">
                {faqsData.map((faq, index) => (
                    <div
                        key={index}
                        className="text-white rounded-xl p-4 glass-bg transition cursor-pointer"
                        onMouseEnter={() => setOpenIndex(index)}
                        onMouseLeave={() => setOpenIndex(null)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-lg">{faq.question}</h3>
                            <span className="text-xl">{openIndex === index ? "▲" : "▼"}</span>
                        </div>

                        {openIndex === index && (
                            <p className="mt-3 text-gray-300 leading-relaxed">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </Container>
    );
}
