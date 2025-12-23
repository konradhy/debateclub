import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "./data";

/**
 * Testimonials carousel with auto-swiping functionality.
 * Cycles through testimonials every 5 seconds with smooth transitions.
 */
export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-24" style={{ backgroundColor: "#E5DFD3" }}>
      <div className="mx-auto max-w-3xl px-8">
        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <img
              src="/images/features/blankquote.png"
              alt=""
              aria-hidden="true"
              className="w-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-16 pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p
                    className="mb-6 text-2xl italic leading-relaxed lg:text-3xl"
                    style={{ color: "#3C4A32", fontFamily: "Georgia, serif" }}
                  >
                    {testimonials[currentIndex].quote}
                  </p>
                  <p className="text-base" style={{ color: "#5C5C54" }}>
                    {testimonials[currentIndex].author},{" "}
                    {testimonials[currentIndex].role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="h-2 w-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex ? "#3C4A32" : "#B8B8A8",
                  transform: index === currentIndex ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

