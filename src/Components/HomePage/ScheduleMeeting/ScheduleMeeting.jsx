"use client";

import ShinyText from "@/Components/Animations/ShinyText";
import Container from "@/Components/Common/Container";
import MeetingComponent from "@/Components/Common/MeetingComponent";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ScheduleMeeting() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    formationType: "",
    subCategory: "",
  });
  const [errors, setErrors] = useState({});

  const sliderRef = useRef(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Generate next 5 days
  const generateNextDays = () => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const timeSlots = [
        { id: `slot-${i}-1`, time: "09:00 AM", available: true },
        { id: `slot-${i}-2`, time: "10:30 AM", available: true },
        { id: `slot-${i}-3`, time: "12:00 PM", available: true },
        { id: `slot-${i}-4`, time: "02:00 PM", available: true },
        { id: `slot-${i}-5`, time: "03:30 PM", available: true },
        { id: `slot-${i}-6`, time: "05:00 PM", available: true },
      ];

      days.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        timeSlots,
      });
    }
    return days;
  };

  const daysSchedule = generateNextDays();

  const handleScheduleClick = (value) => {
    setIsModalOpen(value);
    setTimeout(() => setSliderPos(0), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!userInfo.name.trim()) newErrors.name = "Full name is required";
    if (!userInfo.email.trim()) newErrors.email = "Email is required";
    if (!userInfo.phone.trim()) newErrors.phone = "Phone number is required";
    if (!userInfo.formationType)
      newErrors.formationType = "Please select a company formation";
    if (!userInfo.subCategory)
      newErrors.subCategory = "Please select a subcategory";
    if (!selectedTime) newErrors.selectedTime = "Please select a meeting time";
    if (!userInfo.purpose.trim()) newErrors.purpose = "Please enter purpose";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedDate = daysSchedule[selectedDay];
    const message = `Hello! I'd like to schedule a meeting:\n\nName: ${userInfo.name}\nEmail: ${userInfo.email}\nPhone: ${userInfo.phone}\nPurpose: ${userInfo.purpose}\nDate: ${selectedDate.date} ${selectedDate.day}\nTime: ${selectedTime}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/971542179221?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setIsModalOpen(false);
    setUserInfo({ name: "", email: "", phone: "", purpose: "" });
    setSelectedTime(null);
  };

  // Slider Drag Logic
  const [sliderPos, setSliderPos] = useState(0);

  const handleDragStart = (clientXStart) => {
    const slider = sliderRef.current;
    const startX = clientXStart;
    const sliderWidth = slider.offsetWidth;
    const maxMove = sliderWidth - 60;

    const onMove = (clientX) => {
      const move = clientX - startX;
      const position = Math.min(Math.max(move, 0), maxMove);
      setSliderPos(position);

      if (position >= maxMove - 5) {
        handleScheduleClick(true);
        endDrag();
      }
    };

    const onMouseMove = (e) => onMove(e.clientX);
    const onTouchMove = (e) => onMove(e.touches[0].clientX);

    const endDrag = () => {
      setSliderPos(0);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", endDrag);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", endDrag);
  };

  const handleMouseDown = (e) => handleDragStart(e.clientX);
  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);

  // ==== NEW Prev/Next Logic ====
  const [dayStartIndex, setDayStartIndex] = useState(0);
  const visibleDays = 3;

  const handleNext = () => {
    if (dayStartIndex + visibleDays < daysSchedule.length) {
      setDayStartIndex(dayStartIndex + 1);
    }
  };

  const handlePrev = () => {
    if (dayStartIndex > 0) {
      setDayStartIndex(dayStartIndex - 1);
    }
  };

  return (
    <section id="schedule-meeting" className="h-auto lg:h-[600px] py-8 md:py-16">
      <Container>
        <motion.div
          className="container glass-bg rounded-4xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 xl:gap-12 items-start">
            {/* Left */}
            <motion.div
              className="space-y-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              <div className="p-5 md:p-9 rounded-3xl">
                <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white">
                  Schedule Meeting
                </h2>

                <p className="text-base lg:text-lg mb-8 font-light leading-normal">
                  Start your UAE business journey with expert guidance. Book a meeting with our business setup specialists and get personalized advice on licensing, visas, banking, and company formation. We will help you choose the right structure and ensure a seamless setup process from start to finish.
                </p>

                <div className="flex lg:flex-col xl:flex-row md:flex-row flex-col gap-4">
                  <button
                    onClick={() =>
                      window.open("https://wa.me/971542179221", "_blank")
                    }
                    className="glass-bg px-13 xl:px-8 py-5 xl:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <img
                      src="/assets/images/icons/whatsapp.png"
                      alt=""
                      className="w-7 h-7"
                    />
                    <p className="text-base xl:text-lg font-light">
                      Chat Now
                    </p>
                  </button>

                  <button
                    onClick={() => window.open("tel:+971542179221")}
                    className="glass-bg px-15 xl:px-8 py-5 xl:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <img
                      src="/assets/images/icons/call.png"
                      alt=""
                      className="w-5 h-5"
                    />
                    <p className="text-base lg:text-lg font-light">
                      Call Now
                    </p>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              className="p-5 md:p-9 rounded-3xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              <h3 className="text-3xl lg:text-4xl font-semibold text-white mb-3">
                Schedule a Call
              </h3>
              <p className="text-base lg:text-lg mb-4 font-light leading-normal">
                Prefer a quick call instead? Choose your preferred date and time to connect with our team. We’ll walk you through requirements, timelines, and the best business setup options based on your goals and budget.              </p>

              {/* ==== Days Navigation ==== */}
              <div className="flex items-center gap-3 mb-8">

                {/* Prev button (hidden on mobile) */}
                <button
                  onClick={handlePrev}
                  disabled={dayStartIndex === 0}
                  className={`hidden sm:flex px-2 py-2 rounded-full  transition ${dayStartIndex === 0
                      ? "bg-white/10 cursor-not-allowed"
                      : "glass-bg hover:bg-white/20"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                {/* Days for SM–LG (no scroll) */}
                <div className="hidden sm:flex gap-4 flex-1 justify-center">
                  {daysSchedule
                    .slice(dayStartIndex, dayStartIndex + visibleDays)
                    .map((day, index) => {
                      const actualIndex = dayStartIndex + index;
                      return (
                        <button
                          key={actualIndex}
                          onClick={() => setSelectedDay(actualIndex)}
                          className={`py-3 px-4 min-w-[80px] rounded-2xl text-center transition-all duration-300 ${selectedDay === actualIndex
                              ? "bg-white border-2 border-gray-400/50 text-black"
                              : "bg-[#0D1325] border-2 border-white/30 text-white hover:bg-white/30"
                            }`}
                        >
                          <div className="font-semibold">{day.day}</div>
                          <div className="text-sm">{day.date}</div>
                        </button>
                      );
                    })}
                </div>

                {/* Next button (hidden on mobile) */}
                <button
                  onClick={handleNext}
                  disabled={dayStartIndex + visibleDays >= daysSchedule.length}
                  className={`hidden sm:flex px-2 py-2 rounded-full transition ${dayStartIndex + visibleDays >= daysSchedule.length
                      ? "bg-white/10 cursor-not-allowed"
                      : "glass-bg hover:bg-white/20"
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                <div className="flex sm:hidden items-center gap-3 mb-4">

                  {/* Prev Mobile */}
                  <button
                    onClick={handlePrev}
                    disabled={dayStartIndex === 0}
                    className={`px-2 py-2 rounded-full transition ${dayStartIndex === 0
                        ? "bg-white/10 cursor-not-allowed"
                        : "glass-bg hover:bg-white/20"
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>

                  {/* 2 visible day buttons */}
                  <div className="flex gap-4 flex-1 justify-center">
                    {daysSchedule.slice(dayStartIndex, dayStartIndex + 2).map((day, index) => {
                      const actualIndex = dayStartIndex + index;
                      return (
                        <button
                          key={actualIndex}
                          onClick={() => setSelectedDay(actualIndex)}
                          className={`py-3 px-4 min-w-[80px] rounded-2xl text-center transition-all duration-300 ${selectedDay === actualIndex
                              ? "bg-white border-2 border-gray-300 text-black"
                              : "bg-[#0D1325] border-2 border-white/30 text-white hover:bg-white/30"
                            }`}
                        >
                          <div className="font-semibold">{day.day}</div>
                          <div className="text-sm">{day.date}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Mobile */}
                  <button
                    onClick={handleNext}
                    disabled={dayStartIndex + 2 >= daysSchedule.length}
                    className={`px-2 py-2 rounded-full transition ${dayStartIndex + 2 >= daysSchedule.length
                        ? "bg-white/10 cursor-not-allowed"
                        : "glass-bg hover:bg-white/20"
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                </div>

              </div>

              {/* Slide to Schedule */}
              <div
                ref={sliderRef}
                className="relative w-full glass-bg rounded-2xl h-14 flex items-center px-4 select-none overflow-hidden"
              >
                <div className="text-center w-full font-semibold pointer-events-none">
                  <ShinyText text="Slide to Schedule" disabled={false} speed={2.5} />
                </div>

                <div
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  className="absolute glass-bg rounded-full h-12 w-12 ml-1 flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300"
                  style={{
                    left: sliderPos,
                    transition: sliderPos === 0 ? "left 0.4s ease" : "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {isModalOpen && (
        <MeetingComponent handleScheduleClick={handleScheduleClick} />
      )}
    </section>
  );
}
