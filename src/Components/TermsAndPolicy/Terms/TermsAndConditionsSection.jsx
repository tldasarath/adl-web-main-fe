"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { BookOpen, Mail, ShieldCheck } from "lucide-react";
import Container from "@/Components/Common/Container";

const SECTIONS = [
  {
    id: "intro",
    title: "1. Introduction",
    content: `Welcome to ADL Business Solutions. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue use of our website and services immediately. ADL Business Solutions provides business setup, company formation, visa, PRO, attestation, legal translation, Golden Visa, and corporate services in the United Arab Emirates.`,
  },
  {
    id: "use",
    title: "2. Use of the Website",
    content: `You agree to use this website only for lawful purposes. You may not use our site to commit or encourage a criminal offense, to upload malicious software, viruses, or harmful data, to infringe upon the rights of others, or to transmit unsolicited advertising or spam. We reserve the right to restrict or terminate your access to the website without notice if misuse is detected.`,
  },
  {
    id: "ip",
    title: "3. Intellectual Property Rights",
    content: `All content on this website—including text, logos, graphics, images, videos, icons, and layout—is the property of ADL Business Solutions and is protected under UAE and international copyright laws. Reproduction or redistribution of any content without written permission is strictly prohibited.`,
  },
  {
    id: "disclaimer",
    title: "4. Service Disclaimer",
    content: `While ADL Business Solutions strives to maintain accurate and updated information, we make no warranties or representations regarding the completeness, accuracy, or reliability of any content. All business setup timelines, prices, and government fees are subject to change as per UAE government regulations.`,
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    content: `ADL Business Solutions shall not be held liable for any indirect, incidental, or consequential damages resulting from use or inability to use our services or website, delays or changes in government policies, or third-party services, including banks, freezones, or government portals. Your use of the website and services is at your sole risk.`,
  },
  {
    id: "links",
    title: "6. Third-Party Links",
    content: `Our website may include links to third-party websites. ADL Business Solutions does not control or endorse such websites and is not responsible for their content, terms, or privacy practices.`,
  },
  {
    id: "payment",
    title: "7. Payment Terms",
    content: `All service payments must be made in accordance with the agreed quotation or invoice. Fees once paid for government submissions or processing are non-refundable, except in cases of proven administrative error by ADL Business Solutions.`,
  },
  {
    id: "law",
    title: "8. Governing Law",
    content: `These Terms & Conditions shall be governed by and interpreted in accordance with the laws of the United Arab Emirates. Any dispute shall fall under the exclusive jurisdiction of the Dubai Courts.`,
  },
  {
    id: "amend",
    title: "9. Amendments",
    content: `ADL Business Solutions reserves the right to update or modify these Terms and Conditions at any time without prior notice. Please review this page periodically for changes.`,
  },
];

// per-item variant that supports a custom delay (index)
const item = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.08,
    },
  }),
};

export default function TermsAndConditionsSection() {
  return (
    <>
      <main className="min-h-screen  py-8 md:py-0">
        <Container>
          <div className="max-w-7xl grid lg:grid-cols-12 gap-8 items-start">
            <section className="lg:col-span-8">
              <div className="glass-bg p-6 md:p-10 rounded-3xl">
                {/* animated list of fixed sections */}
                <div className="mt-6 space-y-6">
                  {SECTIONS.map((s, idx) => (
                    <motion.article
                      key={s.id}
                      variants={item}
                      custom={idx}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: false, amount: 0.25 }}
                      className="glass-bg p-6 rounded-2xl border border-white/6"
                    >
                      <h2 id={s.id} className="text-lg md:text-xl font-semibold text-white">
                        {s.title}
                      </h2>
                      <p className="mt-3 text-sm md:text-base text-white/90 leading-relaxed">{s.content}</p>
                    </motion.article>
                  ))}

                  <motion.div
                    variants={item}
                    custom={SECTIONS.length}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className="mt-4 text-sm text-white/80"
                  >
                    <p>
                      <strong>Company:</strong> ADL Business Solutions FZE, Dubai, United Arab Emirates
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-6 rounded-2xl border border-white/10 shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white/6 p-2">
                      <Mail className="w-5 h-5 text-indigo-200" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Need help?</h4>
                      <p className="text-sm text-white/80 mt-1">Reach out for clarifications on these terms.</p>
                      <a href="mailto:info@adlbusinesssolutions.com" className="mt-3 inline-block text-sm text-indigo-200 underline">
                        info@adlbusinesssolutions.com
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* optional side note also animated */}
                {/* <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="glass-card p-4 rounded-2xl border border-white/6 text-center"
                >
                  <div className="flex items-center justify-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-white/80" />
                    <p className="text-sm text-white/80">Website protected — governed by UAE law</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.16 }}
                  className="glass-card p-4 rounded-2xl border border-white/6 text-center"
                >
                  <p className="text-xs text-white/80">Last updated: October 2025</p>
                </motion.div> */}
              </div>
            </aside>
          </div>
        </Container>

  
      </main>
    </>
  );
}
