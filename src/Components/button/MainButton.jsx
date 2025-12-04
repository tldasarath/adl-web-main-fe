import React from "react";
import { ArrowUpRight } from "lucide-react";

const MainButton = ({ text = "Learn more", url }) => {
  const classes = `
    flex justify-center items-center gap-3 px-4 md:px-6 xl:px-8 py-4 text-lg font-semibold rounded-3xl 
 glass-bg 
    active:scale-95  
    shadow-lg group
whitespace-pre-line

  `;

  const content = (
    <>
      {text}
      <span className="group w-8 h-8 md:w-[40px] md:h-[40px] flex items-center justify-center border-2 border-[#E9C05F] rounded-full transition-all duration-300 group-hover:bg-[#E9C05F] group-hover:translate-x-1">
  <ArrowUpRight className="w-5 h-5 md:w-8  md:h-8 text-[#E9C05F] transition-colors duration-300 group-hover:text-white" />
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

export default MainButton;
