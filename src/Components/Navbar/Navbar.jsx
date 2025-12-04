'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from '../Common/Container';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);
  const [isVisaOpen, setIsVisaOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(null);

  const pathname = usePathname();
  const glassRef = useRef(null);
  const dropdownRef = useRef(null);
  const licenseDropdownRef = useRef(null);
  const visaDropdownRef = useRef(null);

  const navItems = [
    { name: 'home', label: 'Home', path: '/' },
    { name: 'about', label: 'About', path: '/about-us' },
    { name: 'service', label: 'Service', path: '/services' },
    { name: 'freezone', label: 'Freezone', path: '/uae-freezone-business-setup' },
    { name: 'mainland', label: 'Mainland', path: '/mainland-company-formation-in-uae' },
    { name: 'visa', label: 'Visa', path: '/visa/employment-visa' },
    { name: 'license', label: 'License', path: '/license/commercial-license' },
    { name: 'gallery', label: 'Gallery', path: '/gallery' },
    { name: 'blog', label: 'Blog', path: '/blogs' },
    { name: 'contact', label: 'Contact', path: '/contact' },
  ];

 const serviceItems = [
  { name: 'Company Formation', path: '/services/company-formation-dubai' },
  { name: 'Golden Visa', path: '/services/golden-visa-services-dubai' },
  { name: 'PRO Services', path: '/services/pro-services-dubai' },
  { name: 'Local Sponsorship', path: '/services/local-sponsorship-dubai' },
  { name: 'Visa Services', path: '/services/visa-services-dubai' },
  { 
    name: 'ISO Certification & Trademark Registration', 
    path: '/services/iso-and-trademark-services-dubai' 
  },
  { name: 'Virtual Office', path: '/services/virtual-office-dubai' },
  { name: 'Company Liquidation', path: '/services/company-liquidation-dubai' },
  { name: 'Document Attestation', path: '/services/document-attestation-dubai' },
  { name: 'Legal Translation', path: '/services/legal-translation-dubai' },
  { name: 'Insurance & VAT Services', path: '/services/insurance-vat-services-dubai' },
  { 
    name: 'Bank Account Opening', 
    path: '/services/corporate-bank-account-opening-dubai' 
  },
  { name: 'Typing Services', path: '/services/typing-services-dubai' },
  { 
    name: 'UAE Government Approvals', 
    path: '/services/uae-government-approvals-services' 
  },
  { 
    name: 'Medical & Emirates ID Services', 
    path: '/services/medical-emirates-id-services-dubai' 
  },
  { name: 'FREEZONE', path: '/services/freezone-company-setup-dubai' },
  { name: 'Dubai Court Services', path: '/services/dubai-court-services' },
  { 
    name: 'Online MOA & POA Services', 
    path: '/services/online-moa-poa-services-dubai' 
  },
];


  const licenseItems = [
    { name: 'Commercial License', path: '/license/commercial-license' },
    { name: 'Professional License', path: '/license/professional-license' },
    { name: 'Industrial License', path: '/license/industrial-license' },
    { name: 'Tourism License', path: '/license/tourism-license' },
    { name: 'E-Trader License', path: '/license/e-trader-license' },
    { name: 'Freelance Permit', path: '/license/freelance-permit' },
  ];

  const visaItems = [
    { name: 'Employment Visa', path: '/visa/employment-visa' },
    { name: 'Investor Visa', path: '/visa/investor-visa' },
    { name: 'Family Visa', path: '/visa/family-visa' },
    { name: 'Golden Visa', path: '/visa/golden-visa' },
    { name: 'Freelance Visa', path: '/visa/freelance-visa' },
    { name: 'Green Visa', path: '/visa/green-visa' },
    { name: 'Blue Visa', path: '/visa/blue-visa' },
  ];

  // Combine routes for active match
  const allRoutes = [
    ...navItems,
    ...serviceItems.map(s => ({ name: 'service', path: s.path })),
    ...licenseItems.map(l => ({ name: 'license', path: l.path })),
    ...visaItems.map(v => ({ name: 'visa', path: v.path })),
  ];

  // Detect active section without flicker
  useEffect(() => {
    const current = [...allRoutes]
      .sort((a, b) => b.path.length - a.path.length)
      .find(item => pathname.startsWith(item.path));

    if (current) setActiveSection(current.name);
  }, [pathname]);

  // Dropdown width
  useEffect(() => {
    const updateWidth = () => {
      if (glassRef.current) setDropdownWidth(glassRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          glassRef.current && !glassRef.current.contains(e.target)) {
        setIsServiceOpen(false);
      }

      if (licenseDropdownRef.current && !licenseDropdownRef.current.contains(e.target) &&
          glassRef.current && !glassRef.current.contains(e.target)) {
        setIsLicenseOpen(false);
      }

      if (visaDropdownRef.current && !visaDropdownRef.current.contains(e.target) &&
          glassRef.current && !glassRef.current.contains(e.target)) {
        setIsVisaOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <nav className="top-0 left-0 right-0 z-[1000] bg-transparent transition-all duration-500">
        <Container>
          <div
            ref={glassRef}
            className="flex glass-bg items-center justify-between px-6 py-2 rounded-3xl relative"
          >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/assets/images/logos/logo.png"
                alt="Logo"
                width={130}
                height={100}
                className="rounded-lg w-24 sm:w-26 md:w-24 xl:w-32 h-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex space-x-0">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <Link
                    href={item.path}
                    onMouseEnter={() => {
                      setIsServiceOpen(item.name === 'service');
                      setIsLicenseOpen(item.name === 'license');
                      setIsVisaOpen(item.name === 'visa');
                    }}
                    className={`relative px-2 2xl:px-6 py-3 rounded-2xl font-normal transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      activeSection === item.name
                        ? 'glass-bg'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.name && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === item.name
                        ? 'text-white glass-bg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </nav>

      {/* SERVICE DROPDOWN */}
      {isServiceOpen && (
        <div
          ref={dropdownRef}
          className="hidden lg:flex justify-center absolute left-0 right-0 top-[95px] z-[9999]"
          onMouseEnter={() => setIsServiceOpen(true)}
          onMouseLeave={() => setIsServiceOpen(false)}
        >
          <div
            className="glass-bg rounded-xl overflow-hidden"
            style={{ width: dropdownWidth ? `${dropdownWidth}px` : 'auto' }}
          >
            <div className="max-h-[230px] overflow-y-auto p-6 scrollbar-ultrathin">
              <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center text-white text-sm">
                {serviceItems.map((service, i) => (
                  <Link
                    href={service.path}
                    key={i}
                    className="glass-bg rounded-2xl w-[250px] p-3 text-center transition-all hover:bg-white/10"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISA DROPDOWN */}
      {isVisaOpen && (
        <div
          ref={visaDropdownRef}
          className="hidden lg:flex justify-center absolute left-0 right-0 top-[95px] z-[9999]"
          onMouseEnter={() => setIsVisaOpen(true)}
          onMouseLeave={() => setIsVisaOpen(false)}
        >
          <div
            className="glass-bg rounded-xl overflow-hidden"
            style={{ width: dropdownWidth ? `${dropdownWidth}px` : 'auto' }}
          >
            <div className="max-h-[230px] overflow-y-auto p-6 scrollbar-medium">
              <div className="grid grid-cols-4 gap-4 text-white text-sm">
                {visaItems.map((visa, i) => (
                  <Link
                    href={visa.path}
                    key={i}
                    className="glass-bg rounded-2xl w-[250px] p-3 text-center transition-all hover:bg-white/10"
                  >
                    {visa.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LICENSE DROPDOWN */}
      {isLicenseOpen && (
        <div
          ref={licenseDropdownRef}
          className="hidden lg:flex justify-center absolute left-0 right-0 top-[95px] z-[9999]"
          onMouseEnter={() => setIsLicenseOpen(true)}
          onMouseLeave={() => setIsLicenseOpen(false)}
        >
          <div
            className="glass-bg rounded-xl overflow-hidden flex"
            style={{ width: dropdownWidth ? `${dropdownWidth}px` : 'auto' }}
          >
            <div className="max-h-[160px] overflow-y-auto p-6 w-3/4 scrollbar-ultrathin">
              <div className="grid grid-cols-3 gap-4 text-white text-sm">
                {licenseItems.map((license, i) => (
                  <Link
                    href={license.path}
                    key={i}
                    className="glass-bg rounded-2xl w-[250px] p-3 text-center transition-all hover:bg-white/10"
                  >
                    {license.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative w-1/3 flex flex-col items-center justify-center h-[230px] rounded-r-xl">
              <div className="flex-1 flex flex-col items-center justify-center cursor-pointer text-white text-lg font-normal">
                <Link href="/uae-freezone-business-setup">Freezone</Link>
                <span className="mt-1 w-40 border-b-[1.5px] border-yellow-400"></span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center cursor-pointer text-white text-lg font-normal">
                <Link href="/offshore-company-formation-in-uae">Offshore</Link>
                <span className="mt-1 w-40 border-b-[1.5px] border-yellow-400"></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
