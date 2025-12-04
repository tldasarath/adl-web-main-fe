// components/BusinessGuideSection.jsx

import Container from "../Common/Container";

export default function BusinessGuideSection({ blog }) {
  const allowedHeadings = [
    "Introduction",
    "Business Overview",
    "Key Requirements",
    "Additional Information",
    "Conclusion"
  ];

  const lines = blog.blog.split("\n").map((l) => l.trim()).filter(Boolean);

  const sections = [];
  let current = null;

  lines.forEach((line) => {
    if (allowedHeadings.includes(line)) {
      // start a new section
      if (current) sections.push(current);

      current = {
        heading: line,
        text: ""
      };
    } else if (current) {
      // add text to the current section
      current.text += line + " ";
    }
  });

  // push last section
  if (current) sections.push(current);

  return (
    <section className=" text-white py-16 md:py-25">
      <Container>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Side */}
        <div>
          <h2 className="text-3xl md:text-[32px] font-bold mb-4">
            {blog.title}
          </h2>

          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Clean Sections */}
          <div className="space-y-6">
            {sections.map((sec, index) => (
              <div key={index}>
                <h3 className="text-xl md:text-2xl font-semibold text-yellow-400">
                  {sec.heading}
                </h3>
                <p className="text-base md:text-lg leading-relaxed mt-1">
                  {sec.text.trim()}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      </Container>
    </section>
  );
}
