'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Empradar',
    location: 'Remote',
    period: 'July 2026 – Present',
    details: ['MERN Full Stack Development', 'Building backend APIs, frontend dashboards, and integrations.'],
  },
  {
    role: 'MERN Full Stack Graduate',
    company: 'Saylani Mass IT Training',
    location: '',
    period: '2026',
    details: ['Completed hands-on full stack training with React, Node.js, Express, MongoDB, and Supabase.'],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary-accent">
            Experience
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Modern, polished timelines for professional growth.
          </h2>
        </motion.div>

        <div className="grid gap-6">
          {experiences.map((item) => (
            <motion.article
              key={item.role + item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{item.role}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary-accent/90">{item.company}</p>
                </div>
                <div className="text-sm text-primary-light/75">
                  <p>{item.location}</p>
                  <p>{item.period}</p>
                </div>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-primary-light/85">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
