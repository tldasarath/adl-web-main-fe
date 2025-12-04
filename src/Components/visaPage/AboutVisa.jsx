'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '../Common/Container'

// Place the provided image in your Next.js project's /public folder as: /public/mainland.png
// Then import and use this component in any page (e.g. pages/index.js or app/page.js)

export default function AboutVisa({image,title,para1,para2}) {
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.97, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    <section className=" py-16">
        <Container>

      <div className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-8 xl:gap-2 items-center">

          {/* LEFT: Section */}
        <motion.div
            className="w-full flex justify-center lg:justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            variants={imageVariant}
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              {/* Rounded image with soft inner border and drop shadow like the example */}

              <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/20">
                <div className="relative h-72 md:h-80 lg:h-96 xl:h-96 bg-black/5">
                  {/* Use next/image for optimized loading. Put image at /public/mainland.png */}
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
              </div>

    
            </div>
          </motion.div>
         
          {/* RIGHT: Section */}
          <motion.div
            className="text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            variants={textVariant}
          >
            <h2 className="text-3xl md:text-[2.5rem] font-bold mb-4 whitespace-pre-line">{title}</h2>

            <p className="text-base md:text-lg text-white leading-relaxed mb-4 max-w-prose font-normal">
             {para1}
            </p>

            <p className="text-base md:text-lg text-white leading-relaxed mb-4 max-w-prose font-normal">
{para2}
            </p>

            {/* <p className="text-base md:text-lg text-white leading-relaxed max-w-prose font-normal">
              We handle everything A-to-Z, so you can focus on growing your business.
            </p> */}

          </motion.div>

    

        </div>

      </div>
      </Container>

    </section>
  )
}
