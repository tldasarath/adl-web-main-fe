import Image from "next/image";
import { motion } from "framer-motion";

import Container from "../Common/Container";



const cardVariant = {
  hidden: { opacity: 0, y: 26, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1 },
};
export default function RelatedBlogs({blogs}) {
  // Duplicate for smooth infinite scroll
  const duplicatedPosts =blogs;

     return (
    <section className=" py-16 lg:py-24">
        <Container>

      <div className="max-w-7xl ">
        <h2 className="text-white text-2xl lg:text-3xl font-semibold mb-8"> Related Blog</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-6">
          {blogs.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.href}
              className="group block rounded-2xl overflow-hidden 
             bg-[linear-gradient(360deg,rgba(57,70,100,1)_0%,rgba(13,19,37,1)_100%)] bg-center

              border border-white/6 focus:outline-none focus:ring-2 focus:ring-[#F4B93B]/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.18 }}
              variants={cardVariant}
              transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
              whileHover={{ translateY: -6, scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
            >
              {/* image area */}
              <div className="relative w-full h-48 sm:h-56 md:h-48 lg:h-44 xl:h-56 bg-slate-800">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-fill md:object-cover"
                  />
                </motion.div>

              </div>

              {/* caption / meta area */}
              <div className="px-4 py-3 bg-transparent">
                <p className="text-sm text-white leading-snug line-clamp-2">{post.title}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      </Container>

    </section>
     
  );
}
