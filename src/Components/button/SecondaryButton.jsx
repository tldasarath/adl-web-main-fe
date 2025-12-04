import React from "react";
import { ArrowUpRight } from "lucide-react";

const SecondaryButton = ({ text = "Learn more", url }) => {
  const classes = `
    group flex justify-center items-center gap-3 py-4 text-lg font-light rounded-3xl 
    text-white/80 transition-all duration-300 
    transform hover:scale-105 active:scale-95 cursor-pointer
  `;

  const content = (
    <>
      <span className="transition-colors duration-300 ">
        {text}
      </span>
      <span className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border border-[#E9C05F] rounded-full transition-all duration-300 group-hover:bg-[#E9C05F] group-hover:translate-x-1">
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#E9C05F] transition-colors duration-300 group-hover:text-white" />
      </span>
    </>
  );

  if (url) {
    return (
      <a href={url} className={classes}>
        {content}
      </a>
    );
  }

  return <button className={classes}>{content}</button>;
};

export default SecondaryButton;
