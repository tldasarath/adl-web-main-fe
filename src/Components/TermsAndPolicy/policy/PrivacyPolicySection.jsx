"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Copy, Send, Clock } from "lucide-react";
import Container from "@/Components/Common/Container";

const sections = [
  { id: "collect", title: "1. Information We Collect", body: `We collect information when you fill out contact or consultation forms, request quotations or schedule meetings, and when you subscribe to newsletters or blog updates. The information may include your name, email address, phone number, company details, and inquiry message.` },
  { id: "use", title: "2. How We Use Your Information", body: `We use your data to provide requested business setup or visa services, send service updates, offers, or newsletters, improve website experience and communication, and comply with UAE legal and government requirements. We do not sell, rent, or share your personal information with third parties except when required by law or necessary for service completion (e.g., submission to government portals or banks).` },
  { id: "security", title: "3. Data Security", body: `ADL Business Solutions uses secure servers and SSL encryption to protect your personal information. However, we cannot guarantee 100% security of data transmitted over the internet.` },
  { id: "cookies", title: "4. Cookies Policy", body: `Our website uses cookies to improve user experience and analyze web traffic. You can disable cookies in your browser settings, but certain features of the website may not function properly as a result.` },
  { id: "third", title: "5. Third-Party Services", body: `We may use third-party tools (e.g., Google Analytics, social media integrations) to enhance performance. These services have their own privacy policies, and ADL is not responsible for their data handling practices.` },
  { id: "rights", title: "6. Your Rights", body: `You have the right to request a copy of your stored personal data, correct or update your information, or request deletion of your data (where applicable). To exercise these rights, contact us at info@adlbusinesssolutions.com.` },
  { id: "retention", title: "7. Data Retention", body: `We retain client information only as long as necessary for legal, accounting, or operational purposes, after which it is securely deleted.` },
  { id: "updates", title: "8. Policy Updates", body: `This Privacy Policy may be updated from time to time to reflect new legal requirements or service changes. Updated versions will be posted on this page with a revised date.` },
  { id: "contact", title: "9. Contact Information", body: `If you have any questions regarding our Privacy Policy, please contact: info@adlbusinesssolutions.com — Dubai, United Arab Emirates — www.adlbusinesssolutions.com` },
];

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
      when: "beforeChildren",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function PrivacyPolicySection() {
  const [copied, setCopied] = useState(false);

  const email = "info@adlbusinesssolutions.com";
  const website = "https://www.adlbusinesssolutions.com";
  const location = "Dubai, United Arab Emirates";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
<main className="min-h-screen py-8 md:py-0">
        <Container>
<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              {/* ********* NOTE: parent is now a plain div (not motion/div with animate="show") ********* */}
              <div className="space-y-6">
                {sections.map((sec) => (
                  <motion.article
                    key={sec.id}
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    className="glass-bg p-6 rounded-2xl border border-white/10 shadow-xl"
                  >
                    <h2 className="text-lg md:text-xl font-medium text-white">{sec.title}</h2>
                    <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">{sec.body}</p>
                  </motion.article>
                ))}

                <motion.div
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.2 }}
                  className="mt-2"
                >
                  <div className="b p-6 rounded-2xl border border-white/10 shadow-xl">
                    <h3 className="text-base font-semibold text-white">Extra notes</h3>
                    <ul className="mt-3 list-disc list-inside text-white/80 text-sm space-y-2">
                      <li>
                        We follow applicable UAE laws when processing client data and coordinate with government portals only when necessary to
                        complete a requested service.
                      </li>
                      <li>
                        If you are a resident outside the UAE, local data protection laws may apply — please contact us for details about
                        cross-border transfers.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* right column contact / quick actions */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
className="w-full lg:w-80 flex-shrink-0"
              aria-labelledby="privacy-contact-heading"
            >
              <div className="sticky top-20 space-y-6">
                <div className="glass-bg p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-white/6 p-2">
                      <Mail className="w-5 h-5 text-indigo-200" />
                    </div>
                    <div>
                      <h4 id="privacy-contact-heading" className="text-sm font-semibold text-white">
                        Contact
                      </h4>
                      <p className="mt-1 text-white/75 text-sm">For privacy requests or questions</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-1">
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 text-sm font-medium text-indigo-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded transition"
                      aria-label={`Send email to ${email}`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>{email}</span>
                    </a>

                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>

                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-white/70 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded transition"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="truncate">{website.replace(/^https?:\/\//, "")}</span>
                    </a>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium glass-bg hover:bg-white/8 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      aria-pressed={copied}
                      aria-label="Copy email address to clipboard"
                      title="Copy email"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? "Copied" : "Copy Email"}</span>
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium  glass-bg text-white shadow-sm hover:brightness-105 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      aria-label="Send email"
                    >
                      <Send className="w-4 h-4" />
                      <span>Email Now</span>
                    </motion.a>
                  </div>
                </div>

                <div className="glass-bg p-6 rounded-2xl border border-white/6 shadow-md flex items-start gap-3">
                  <div className="rounded-full bg-white/6 p-2">
                    <Clock className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Privacy & Cookies</h5>
                    <p className="mt-2 text-sm text-white/80 max-w-[18rem]">
                      This site uses cookies for analytics and UX improvements. Adjust preferences in your browser.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </Container>

      
      </main>
    </>
  );
}
