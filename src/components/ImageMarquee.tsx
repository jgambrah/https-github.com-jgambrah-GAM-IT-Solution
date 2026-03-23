import React from 'react';
import { motion } from 'motion/react';

const ImageMarquee = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
      alt: "Software Engineering Team"
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      alt: "Digital Infrastructure"
    },
    {
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      alt: "Tech Collaboration"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      alt: "Agile Development"
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      alt: "Coding Session"
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      alt: "IT Support"
    },
    {
      url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
      alt: "Digital Transformation"
    },
    {
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
      alt: "Modern Office"
    }
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="relative flex">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: [0, -1920], // Adjust based on total width
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="w-[350px] h-[250px] shrink-0 rounded-3xl overflow-hidden shadow-lg border border-gray-100"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative flex mt-6">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: [-1920, 0], // Opposite direction
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`reverse-${index}`}
              className="w-[350px] h-[250px] shrink-0 rounded-3xl overflow-hidden shadow-lg border border-gray-100"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImageMarquee;
