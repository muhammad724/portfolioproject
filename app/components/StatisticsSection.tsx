'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Projects Completed', value: 18 },
  { label: 'Technologies Used', value: 24 },
  { label: 'Certifications', value: 5 },
  { label: 'Internship', value: 1 },
  { label: 'GitHub Repositories', value: 12 },
];

export function StatisticsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const increments = stats.map((stat) => Math.ceil(stat.value / 40));
    const interval = setInterval(() => {
      setCounts((current) =>
        current.map((count, index) => {
          if (count >= stats[index].value) return stats[index].value;
          return Math.min(count + increments[index], stats[index].value);
        })
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stats" className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary-accent">Statistics</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Performance at a glance.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl"
            >
              <p className="text-4xl font-semibold text-white">{counts[index]}</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-primary-accent/90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
