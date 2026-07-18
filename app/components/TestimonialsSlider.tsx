'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Testimonial = {
  id: number;
  name: string;
  company: string;
  rating: number;
  message: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmed Khan',
    company: 'TechNova',
    rating: 5,
    message:
      'Muhammad delivered an excellent project with clean code and a beautiful UI.',
  },
  {
    id: 2,
    name: 'Sarah Ali',
    company: 'Creative Studio',
    rating: 5,
    message:
      'Great communication, responsive design, and fast delivery. Highly recommended.',
  },
  {
    id: 3,
    name: 'John Smith',
    company: 'Freelancer',
    rating: 5,
    message:
      'Amazing developer. Everything worked perfectly and exceeded expectations.',
  },
];

export function TestimonialsSlider() {
  return (
    <section className="relative px-6 py-24 overflow-hidden">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-primary-accent/20 blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="uppercase tracking-[0.35em] text-primary-accent text-sm">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white">
            What People Say
          </h2>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-full"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-primary-light/80 leading-7">
                  "{item.message}"
                </p>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <h4 className="font-semibold text-white">{item.name}</h4>
                  <p className="text-sm text-primary-accent">
                    {item.company}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
