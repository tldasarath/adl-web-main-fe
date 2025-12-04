"use client"
import { useState } from "react";
import Container from "../Common/Container";
import MeetingComponent from "../Common/MeetingComponent";

export default function WhyChooseDubai({
  title,
  description1,
  description2,
  meetingTitle,
  meetingDescription
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleScheduleClick = (value) => {
    setIsModalOpen(value);

  };
  return (
    <section className="w-full text-white py-16 px-6">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-5 xl:gap-10">
          {/* Left Section */}
          <div className="w-full lg::w-1/2 max-w-xl">
            <h2 className="text-2xl mb-3 md:text-3xl main-text font-bold text-white ">
              {title}</h2>
            <p className="text-base lg:text-lg mb-8 font-light leading-normal">{description1}</p>
            <p className="text-base lg:text-lg mb-8 font-light leading-normal">{description2}</p>
          </div>

          {/* Right Section (Static Content) */}
          <div className="w-full xl:w-1/3 glass-bg p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">{meetingTitle}
            </h3>
            <p className="text-base md:text-lg leading-normal mb-6">
              {meetingDescription}
            </p>
            <button onClick={() => handleScheduleClick(true)} className="w-full glass-bg cursor-pointer  font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all">
              Book a Meeting Now
            </button>
          </div>
        </div>
      </Container>
      {isModalOpen && (
        <MeetingComponent handleScheduleClick={handleScheduleClick} />
      )}
    </section>
  );
}
