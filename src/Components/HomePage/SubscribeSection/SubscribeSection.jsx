"use client";

import Container from "@/Components/Common/Container";
import { subscribeNewsletter } from "@/lib/api/apis";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const res = await subscribeNewsletter(email);

      if (res?.ok) {
        toast.success("Successfully subscribed!");
        setEmail(""); // clear field automatically
      } else {
        toast.error(res?.message || "Subscription failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-8 md:py-14 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="-z-10 absolute w-[380px] h-[180px] -right-24 top-10 bg-[#376CBC] opacity-30 blur-[100px] rounded-[60%]" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[380px] h-[180px] -left-24 top-10 bg-[#376CBC] opacity-30 blur-[100px] rounded-[60%]" />
      </div>

      <Container>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl mb-5 md:text-3xl text-center main-text font-bold text-white">
            Subscribe newsletter
          </h2>

          <p className="text-sm md:text-base mb-8 font-light leading-normal">
            Get expert insights on UAE business setup, visa updates, and government regulations — straight to your inbox. Stay informed and ahead in the UAE business world.
          </p>

          <form
            onSubmit={handleSubmit}
            className="relative w-full sm:w-[480px] mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 pr-32 rounded-full glass-bg text-gray-300 focus:outline-none focus:ring-2 focus:glass-bg placeholder-gray-500 border border-white/10"
              required
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className="absolute glass-bg top-1/2 right-1 -translate-y-1/2 font-medium px-6 py-2.5 rounded-full transition-all duration-300"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
