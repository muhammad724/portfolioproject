'use client';

import { motion } from 'framer-motion';

const certifications = [
  { title: 'MERN Full Stack Development', issuer: 'Saylani Mass IT Training' },
  { title: 'Advanced JavaScript', issuer: 'Empradar' },
  { title: 'Advanced React', issuer: 'Empradar' },
  { title: 'Advanced Express.js', issuer: 'Empradar' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp' },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary-accent">
            Certifications
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Recognized skills from trusted programs.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-primary-accent/95">Certification</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-primary-light/85">{item.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
