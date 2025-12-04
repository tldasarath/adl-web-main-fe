import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({ src, fallback, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
    />
  );
}
