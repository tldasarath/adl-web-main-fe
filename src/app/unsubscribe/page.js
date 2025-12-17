"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/Components/Common/Container";
import { unsubscribeNewsletter } from "@/lib/api/apis";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? null;
  const router = useRouter();

  const [status, setStatus] = useState("idle"); 
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(null);
  const [loadingRetry, setLoadingRetry] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      setMessage(
        "Missing token. Please click the unsubscribe link that was sent to your email."
      );
      return;
    }

    let cancelled = false;
    const call = async () => {
      try {
        setStatus("verifying");
        setMessage("Processing your unsubscribe request...");
        const res = await unsubscribeNewsletter(token);

        if (cancelled) return;
        if (res?.ok) {
          if (res.email) setEmail(res.email);
          setStatus("success");
          setMessage(res?.message || "You have been unsubscribed.");
        } else {
          setStatus("error");
          setMessage(
            res?.message || "Unable to unsubscribe. Please contact support."
          );
        }
      } catch (err) {
        console.error("Unsubscribe error:", err);
        setStatus("error");
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Server error while unsubscribing.";
        setMessage(msg);
      }
    };

    call();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleRetry = async () => {
    setLoadingRetry(true);
    setStatus("verifying");
    setMessage("Retrying...");
    try {
      const res = await unsubscribeNewsletter(token);
      if (res?.ok) {
        if (res.email) setEmail(res.email);
        setStatus("success");
        setMessage(res?.message || "You have been unsubscribed.");
      } else {
        setStatus("error");
        setMessage(
          res?.message || "Unable to unsubscribe. Please contact support."
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Server error while retrying.");
    } finally {
      setLoadingRetry(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center py-8 px-4 "
      aria-labelledby="unsubscribe-heading"
    >
      <Container>
        <div className="mx-auto w-full max-w-3xl">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-20 top-8 w-64 h-32 rounded-2xl bg-gradient-to-tr from-[#164A7C]/12 to-[#376CBC]/6 blur-3xl opacity-30" />
              <div className="absolute -right-20 bottom-8 w-64 h-32 rounded-2xl bg-gradient-to-bl from-[#376CBC]/12 to-[#0b1220]/10 blur-3xl opacity-24" />
            </div>

            <div
              className="relative z-10 glass-bg rounded-2xl shadow-2xl
                            p-6 sm:p-8 md:p-10 lg:p-12"
            >
              {/* logo - responsive sizing */}
              <div className="flex justify-center -mt-12 mb-4">
                <div className="rounded-full p-2 bg-white/6 border border-white/8 shadow-inner">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 relative">
                    <Image
                      src="/assets/images/logos/logo.png"
                      alt="ADL Business Solutions"
                      fill
                      sizes="48px, (min-width: 640px) 56px, (min-width: 768px) 64px"
                      className="object-contain rounded-full"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* header */}
              <div className="text-center mb-4 sm:mb-6">
                <h1
                  id="unsubscribe-heading"
                  className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
                >
                  Unsubscribe from Newsletter
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl mx-auto px-2">
                  We’ll stop sending email updates to the address associated
                  with this link. You will be removed immediately.
                </p>
              </div>

              {/* content card */}
              <div className="mx-auto max-w-xl">
                <div
                  aria-live="polite"
                  className="rounded-lg p-4 sm:p-5 md:p-6 bg-white/3 border border-white/8 shadow-inner"
                >
                  {/* verifying */}
                  {status === "verifying" && (
                    <div className="flex items-center gap-3">
                      <div className="flex-none w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-30"
                          />
                          <path
                            d="M22 12a10 10 0 00-10-10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm sm:text-base">
                          Processing
                        </div>
                        <div className="text-xs sm:text-sm text-white/70">
                          {message}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* success */}
                  {status === "success" && (
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-green-400"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm sm:text-lg">
                          You're unsubscribed
                        </div>
                        <div className="text-xs sm:text-sm text-white/70 mt-1">
                          {message}
                        </div>

                        {email && (
                          <div className="mt-2 text-xs sm:text-sm text-white/60">
                            <span className="font-medium text-white/90">
                              Email:
                            </span>{" "}
                            {email}
                          </div>
                        )}

                        <div className="mt-3 text-xs sm:text-sm text-white/60">
                          If this was a mistake, you can{" "}
                          <button
                            onClick={() => router.push("/")}
                            className="underline text-white/90"
                          >
                            re-subscribe
                          </button>{" "}
                          anytime.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* error */}
                  {status === "error" && (
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <div className="flex-none w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-rose-600/8 border border-rose-600/20 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 8v4m0 4h.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 12A9 9 0 1112 3a9 9 0 019 9z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm sm:text-base">
                          Couldn’t unsubscribe
                        </div>
                        <div className="text-xs sm:text-sm text-white/70 mt-1">
                          {message}
                        </div>

                        <div className="mt-3 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => router.push("/contact")}
                            className="w-full sm:w-auto px-3 py-2 rounded-full bg-white/6 border border-white/8 text-white text-sm hover:scale-[1.02] transition"
                          >
                            Contact Support
                          </button>
                          <button
                            onClick={handleRetry}
                            disabled={loadingRetry}
                            className="w-full sm:w-auto px-3 py-2 rounded-full bg-yellow-500 text-black font-medium text-sm hover:brightness-105 transition disabled:opacity-60"
                          >
                            {loadingRetry ? "Retrying..." : "Retry"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* no-token */}
                  {status === "no-token" && (
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Unsubscribe link missing
                      </div>
                      <div className="text-xs sm:text-sm text-white/70 mt-1">
                        {message}
                      </div>
                      <div className="mt-3">
                        <a
                          href="/contact"
                          className="text-sm underline text-white/85"
                        >
                          Contact support to unsubscribe
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* actions */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-white/50 text-center sm:text-left">
                  We respect your privacy — unsubscribed immediately.
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => router.push("/")}
                    className="w-full sm:w-auto px-4 py-2 rounded-full glass-bg border border-white/8 text-white text-sm hover:scale-[1.02] transition"
                  >
                    Back to home
                  </button>

                  {status === "success" ? (
                    <button
                      onClick={() => router.push("/")}
                      className="w-full sm:w-auto px-4 py-2 rounded-full  bg-emerald-400 text-black font-semibold text-sm shadow hover:scale-[1.02] transition"
                    >
                      Done
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/subscribe")}
                      className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/6 border border-white/8 text-white text-sm hover:scale-[1.02] transition"
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl border border-white/4 opacity-5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
