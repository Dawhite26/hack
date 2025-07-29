import { useQuery } from "@tanstack/react-query";
import { type StoryChapter } from "@shared/schema";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

export default function StoryTimeline() {
  const { data: chapters = [] } = useQuery<StoryChapter[]>({
    queryKey: ["/api/story-chapters"]
  });

  return (
    <section id="story" className="py-20 bg-gradient-to-b from-dark-card/30 to-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-cyber">The</span> <span className="text-matrix">Origin</span> <span className="text-neon-pink">Story</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Follow the digital revolution through the eyes of legendary hackers who shaped our cyber reality.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-matrix via-cyber to-neon-pink opacity-50"></div>

          {/* Timeline Events */}
          {chapters.map((chapter, index) => (
            <TimelineItem key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ chapter, index }: { chapter: StoryChapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.3 });

  const isEven = index % 2 === 0;
  const chapterColors = ["matrix", "cyber", "neon-pink"];
  const color = chapterColors[index % chapterColors.length];

  return (
    <motion.div 
      ref={ref}
      className={`mb-16 relative transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isEven ? "-translate-x-8" : "translate-x-8"}`
      }`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center mb-8">
        <div className={`bg-${color} text-black w-16 h-16 rounded-full flex items-center justify-center font-orbitron font-bold text-xl z-10 relative`}>
          {String(chapter.chapterNumber).padStart(2, '0')}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className={isEven ? "text-right md:pr-8" : "md:pl-8 md:order-2"}>
          <h3 className={`text-2xl font-orbitron font-bold mb-4 text-${color}`}>
            {chapter.title}
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            {chapter.description}
          </p>
          <div className={`text-sm text-${color === "matrix" ? "cyber" : color === "cyber" ? "matrix" : "electric"}`}>
            Chapter {chapter.chapterNumber} • {chapter.year}
          </div>
        </div>
        <div className={`holographic p-1 rounded-xl ${isEven ? "" : "md:order-1"}`}>
          <img 
            src={chapter.image} 
            alt={`${chapter.title} - Chapter ${chapter.chapterNumber} visualization`}
            className="w-full h-64 object-cover rounded-lg" 
          />
        </div>
      </div>
    </motion.div>
  );
}
