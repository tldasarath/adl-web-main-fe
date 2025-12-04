import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Container from "../Common/Container";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const navLinks = [
    { label: "About", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blogs" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <footer className=" py-8 md:py-14  relative overflow-hidden">
<div className="absolute overflow-hidden -right-20 bottom-10 pointer-events-none select-none  -z-10">
    <Image
      src="/assets/images/bg/square3.png"
      alt="Decorative shapes"
      width={240}
      height={320}
      className="object-contain md:w-60 w-40"
    />
  </div>
<Container>
      {/* Top Decorative Line */}

      <div className="  text-center space-y-4 relative">
   <div className="absolute top-0 left-0 w-20 md:w-40 lg:w-80 h-25 lg:h-40 border-b-6 border-r-6 border-[#E9C05F] rounded-br-4xl rotate-180"></div>
        {/* Logo */}
        <div className="flex justify-center">
          <img src="/assets/images/logos/adl.png" alt="ADL Business Solutions" className="h- md:h-30" />
        </div>

        {/* Description */}
        <p className=" max-w-2xl mx-auto text-sm md:text-base">
        ADL Business Solutions offers reliable UAE business setup, visa processing, PRO services, and documentation support, ensuring smooth, transparent, and efficient company formation for entrepreneurs, investors, and corporates.
        </p>
<div className=" hidden lg:block flex flex-col absolute right-0 xl:right-10 top-0 items-center gap-4 mt-8">
          <div className="flex flex-col gap-3  right-5 top-1/3 z-10">
            {[
              { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=61581712689548" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/adl_business_solutions_/" },
              { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/adl-business-solutions-41369b383/" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                className="p-3 glass rounded-full text-white transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        {/* Navigation Links */}
         <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="glass-bg hover:bg-[#252c3d] px-5 py-4 rounded-full text-sm md:text-base font-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

        {/* Divider */}
        <div className="border-t border-[#E9C05F] my-8"></div>

        {/* Contact & Map */}
        <div className=" flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Contact Info */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 ">
<div className="bg-[#BFA157] rounded-full px-3 py-3">              <FaPhoneAlt className="text-black" />
</div>
           <div className=" flex items-center">
  {/* WhatsApp Clickable Number */}
  <a
    href="https://wa.me/971566668400"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-300 "
  >
    +971 56 666 8400,
  </a>

  {/* Second Number */}
  <span className="text-gray-300">04 254 7288</span>
</div>

            </div>
            <div className="flex items-center gap-3">
<div className="bg-[#BFA157] rounded-full px-3 py-3">
                <FaEnvelope className="text-black" />
</div>             
 <span className="text-gray-300">info@adlbusinesssolutions.com</span>
            </div>
            <div className="flex items-center gap-3">
          <div className="bg-[#BFA157] rounded-full px-3 py-3">
            <FaMapMarkerAlt className="text-black" />
            </div>    
              <span className="text-gray-300">
                Ground Floor, Al Twar Centre, Al Qusais 2
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="py-4 glass-bg px-5 rounded-3xl">
            <div className="w-full md:w-[300px] h-[200px]  rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1997014502176!2d55.383541249069175!3d25.263866744869294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5dcc71346669%3A0x3376a6c40cb3577a!2sAl%20Twar%20Centre!5e0!3m2!1sen!2sin!4v1761820279383!5m2!1sen!2sin"
            ></iframe>
          </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="block lg:hidden flex flex-col items-center gap-4 mt-8">
          <div className="flex flex-row gap-3  right-5 top-1/3 z-10">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaYoutube />, link: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                className="p-3 glass-bg rounded-full text-white transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-[#E9C05F] mt-8 pt-6 text-sm ">
          © {new Date().getFullYear()} ADL Business Solutions by <a href="https://nextmedia.ae/"    target="_blank" 
    rel="noopener noreferrer">Next Media</a>. All Rights Reserved.
        </div>
      </div>
</Container>
    </footer>
  );
}
