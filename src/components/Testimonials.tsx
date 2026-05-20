import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import testimonialsImg from "@/assets/testimonials.png";
import testimonialBg from "@/assets/testimonial-bg.png";
import quotesImg from "@/assets/quotes.png";
import avatarImg from "@/assets/avatar.png";
import { getTestimonials } from "@/api/services/homeService";
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  photo: string;
  display_order: number;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        const sorted = [...data].sort((a, b) => a.display_order - b.display_order);
        setTestimonials(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const nextTestimonial = useCallback(() => {
    if (!testimonials.length) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    if (!testimonials.length) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial, testimonials.length]);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 }),
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section className="w-full py-48 lg:py-96 overflow-hidden relative">
      <div className="absolute inset-0 z-0" />

      <div className="max-w-[1440px] mx-auto px-24 sm:px-48 lg:px-120 relative z-10">
        <div className="rounded-2xl-32 overflow-hidden flex flex-col lg:flex-row shadow-sm min-h-[600px] p-24 lg:p-32 gap-32 lg:gap-72 relative">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(120deg, #FDFAF6 44.74%, rgba(253, 250, 246, 0.00) 79.36%)",
            }}
          />
          <div className="absolute inset-0 bg-surface-white -z-20" />
          <img
            src={testimonialBg}
            alt=""
            className="absolute bottom-0 right-0 w-full h-full object-cover object-bottom pointer-events-none -z-10 rounded-br-2xl-32 rounded-tl-2xl-32"
          />

          {/* Left Side */}
          <div className="relative w-full lg:w-[440px] shrink-0 rounded-2xl-32 overflow-hidden">
            <img
              src={testimonialsImg}
              alt="City Background"
              className="absolute inset-0 w-full h-full object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-[#1A2231]/20" />
            <div className="relative h-full p-32 lg:p-48 flex flex-col z-10">
              <div className="flex flex-col gap-24">
                <h2 className="font-headline text-negative text-2xl lg:text-[32px] font-normal leading-tight">
                  Start Your Property <br /> Journey Today
                </h2>
                <p className="text-negative/70 font-normal leading-relaxed max-w-[320px]">
                  Book a free consultation with our senior advisors and discover
                  opportunities tailored to your goals.
                </p>
              </div>
              <a href="/contact" className="inline-block mt-auto">
                <Button
                  variant="primary"
                  size="xl"
                  className="group rounded-full bg-surface-primary text-white flex items-center justify-center gap-16 mt-24 max-w-50"
                >
                  Connect with us
                  <ArrowUpRight className="w-16 h-16 group-hover:rotate-45 transition-all duration-300" />
                </Button>
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 relative flex items-center">
            <div className="py-24 lg:py-48 w-full relative z-10 max-w-xl">
              <div className="flex flex-col gap-32">
                <div className="flex flex-col gap-16">
                  <div className="flex justify-between items-center">
                    <span className="text-surface-primary text-sm font-medium uppercase tracking-[0.2em]">
                      Testimonials
                    </span>
                    <div className="flex items-center justify-end gap-16 mt-auto">
                      <button
                        onClick={prevTestimonial}
                        disabled={loading || !testimonials.length}
                        className="w-48 h-48 rounded-full border border-border-default flex items-center justify-center text-surface-primary hover:bg-surface-primary hover:text-negative hover:border-surface-primary transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowLeft className="w-24 h-24" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        disabled={loading || !testimonials.length}
                        className="w-48 h-48 rounded-full border border-border-default flex items-center justify-center text-surface-primary hover:bg-surface-primary hover:text-negative hover:border-surface-primary transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowRight className="w-24 h-24" />
                      </button>
                    </div>
                  </div>

                  <h2 className="font-headline text-primary text-lg lg:text-4xl font-medium leading-tight max-w-[480px]">
                    Trusted by thousands <br /> of people & companies
                  </h2>
                </div>

                {/* Content area */}
                <div className="relative min-h-[250px] lg:min-h-[300px]">
                  {loading ? (
                    // Skeleton loader matching testimonial layout
                    <div className="flex flex-col gap-32 animate-pulse">
                      <div className="size-24 lg:size-48 bg-gray-200 rounded" />
                      <div className="flex flex-col gap-8">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/6" />
                      </div>
                      <div className="flex items-center gap-16">
                        <div className="w-56 h-56 rounded-full bg-gray-200" />
                        <div className="flex flex-col gap-8">
                          <div className="h-4 bg-gray-200 rounded w-32" />
                          <div className="h-3 bg-gray-200 rounded w-24" />
                        </div>
                      </div>
                    </div>
                  ) : testimonial ? (
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        className="flex flex-col gap-32 absolute w-full"
                      >
                        <div className="size-24 lg:size-48">
                          <img src={quotesImg} alt="Quote" className="w-full h-full object-contain" />
                        </div>

                        <p className="text-secondary lg:text-lg font-normal leading-relaxed max-w-[680px]">
                          {testimonial.content}
                        </p>

                        <div className="flex items-center gap-16">
                          <div className="w-56 h-56 rounded-full overflow-hidden border-2 border-surface-primary/10">
                            <img
                              src={testimonial.photo || avatarImg}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = avatarImg;
                              }}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-primary text-md font-semibold">{testimonial.name}</span>
                            <span className="text-tertiary text-sm">{testimonial.role}</span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}