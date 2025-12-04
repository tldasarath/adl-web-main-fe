import Image from "next/image";
import Link from "next/link";



export default function ExclusiveBlogs({ blogs }) {
  // Duplicate for smooth infinite scroll
  const duplicatedPosts = blogs

  return (
    <section className="  py-8 md:py-14  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex items-center">
          {/* <div className='w-3 h-3 rounded-full bg-[#376CBC]  mr-2 '></div>
 <p className="text-[#E9C05F] text-lg md:text-xl ">Blog</p> */}
        </div>
        <h2 className="text-2xl mb-5 md:text-3xl   main-text font-bold text-white ">
          Exclusive Blogs</h2>

        <div className="relative">
          {/* Slider wrapper */}
          <div className="flex animate-slide-x gap-4 pt-10 w-max">
            {duplicatedPosts.map((post, index) => (
              <Link
                key={index}
                className="bg-gradient-to-b from-[#1c2334] to-[#0e1424] rounded-2xl overflow-hidden shadow-md min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-shrink-0"
                href={`/blogs/${post.id}`}

              >
                <div className="relative w-full h-72">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className=" text-sm md:text-base font-normal mb-3">{post.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
