import Container from "../Common/Container";

export default function BusinessGuideSection({ blog }) {
  if (!blog) return null;

  return (
    <section className="text-white py-16 md:py-25">
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

            {/* ✅ FORCE-STYLED QUILL CONTENT */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>

        </div>
      </Container>
    </section>
  );
}
