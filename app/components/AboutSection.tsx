'use client';

import { motion } from 'framer-motion';

const aboutItems = [
  {
    title: 'Professional Summary',
    description:
      'MERN Stack Developer with experience building responsive, scalable web applications and modern SaaS experiences. Passionate about clean code, polished UI, and reliable backend architecture.',
  },
  {
    title: 'Current Role',
    description: 'Remote Software Developer Intern at Empradar, delivering front-end and backend solutions for growth-focused products.',
  },
  {
    title: 'Education',
    description: 'MERN Full Stack graduate from Saylani Mass IT Training, specializing in full stack JavaScript and cloud-integrated workflows.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 text-primary-light">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="space-y-4"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary-accent">
            About
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Building premium web experiences with modern full-stack tools.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-primary-light/85 sm:text-lg">
            I specialize in creating polished full-stack applications using Next.js and TypeScript,
            combined with intuitive UI, strong backend APIs, and scalable database design.
            My focus is on elegant, minimal interfaces with thoughtful motion and accessibility.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {aboutItems.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-primary-light/85">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
