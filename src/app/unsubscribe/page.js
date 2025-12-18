import { Suspense } from "react";
import UnsubscribeClient from "./UnsubscribeClient";

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<UnsubscribeLoading />}>
      <UnsubscribeClient />
    </Suspense>
  );
}

function UnsubscribeLoading() {
  return (
    <section className="min-h-screen flex items-center justify-center text-white">
      Processing your request...
    </section>
  );
}
