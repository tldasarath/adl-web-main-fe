import Image from "next/image";
import Container from "../Common/Container";
import MainButton from "../button/MainButton";

export default function Custom404() {
  return (
<Container>
        <div className="min-h-screen flex flex-col items-center justify-center  text-white px-4">
      
    
      <Image
        src="/assets/images/error/404.png"         // ← your 404 image file
        width={300}
        height={200}
        alt="404 Not Found"
        className="mb-6"
        priority
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">Oops! Page Not Found!</h1>

      {/* Description */}
      <p className="mt-3 text-center text-gray-300 max-w-md">
        We’re sorry but we can’t seem to find the page you requested.
        This might be because you typed the web address incorrectly.
      </p>

      {/* Back to Home Button */}
<div className="py-10">
      <MainButton text={"Back to Home"} url={"/"}/>

</div>
    </div>
</Container>
  );
}
