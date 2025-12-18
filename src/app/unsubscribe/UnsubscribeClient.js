"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/Components/Common/Container";
import { unsubscribeNewsletter } from "@/lib/api/apis";


export default function UnsubscribeClient() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState<string | null>(null);
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

    const unsubscribe = async () => {
      try {
        setStatus("verifying");
        setMessage("Processing your unsubscribe request...");

        const res = await unsubscribeNewsletter(token);
        if (cancelled) return;

        if (res?.ok) {
          setEmail(res?.email ?? null);
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
        setMessage(
          err?.response?.data?.message ||
            err?.message ||
            "Server error while unsubscribing."
        );
      }
    };

    unsubscribe();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleRetry = async () => {
    if (!token) return;

    setLoadingRetry(true);
    setStatus("verifying");
    setMessage("Retrying...");

    try {
      const res = await unsubscribeNewsletter(token);
      if (res?.ok) {
        setEmail(res?.email ?? null);
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
    <section className="min-h-screen flex items-center justify-center py-8 px-4">
      <Container>
        <div className="mx-auto w-full max-w-3xl">
          <div className="relative rounded-2xl overflow-hidden glass-bg p-6 sm:p-8 md:p-10">

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 relative">
                <Image
                  src="/assets/images/logos/logo.png"
                  alt="ADL Business Solutions"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                Unsubscribe from Newsletter
              </h1>
              <p className="mt-2 text-sm text-white/70">
                You’ll be removed immediately from our mailing list.
              </p>
            </div>

            {/* Content */}
            <div className="rounded-lg p-5 bg-white/5 border border-white/10">

              {status === "verifying" && (
                <p className="text-white text-sm">{message}</p>
              )}

              {status === "success" && (
                <>
                  <p className="text-green-400 font-semibold">
                    You’re unsubscribed successfully.
                  </p>
                  <p className="text-white/70 text-sm mt-1">{message}</p>
                  {email && (
                    <p className="text-white/60 text-sm mt-2">
                      Email: <span className="text-white">{email}</span>
                    </p>
                  )}
                </>
              )}

              {status === "error" && (
                <>
                  <p className="text-red-400 font-semibold">
                    Unable to unsubscribe
                  </p>
                  <p className="text-white/70 text-sm mt-1">{message}</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={handleRetry}
                      disabled={loadingRetry}
                      className="px-4 py-2 rounded-full bg-yellow-500 text-black text-sm font-medium disabled:opacity-60"
                    >
                      {loadingRetry ? "Retrying..." : "Retry"}
                    </button>
                    <button
                      onClick={() => router.push("/contact")}
                      className="px-4 py-2 rounded-full bg-white/10 text-white text-sm"
                    >
                      Contact Support
                    </button>
                  </div>
                </>
              )}

              {status === "no-token" && (
                <>
                  <p className="text-white font-semibold">
                    Invalid unsubscribe link
                  </p>
                  <p className="text-white/70 text-sm mt-1">{message}</p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 rounded-full bg-white/10 text-white text-sm"
              >
                Back to Home
              </button>

              {status !== "success" && (
                <button
                  onClick={() => router.push("/subscribe")}
                  className="px-4 py-2 rounded-full bg-emerald-400 text-black text-sm font-semibold"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
