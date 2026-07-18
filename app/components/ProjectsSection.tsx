'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const projects = [
  {
    title: 'MERN Clothing Store',
    description: 'A clean e-commerce storefront with product browsing, cart management, and checkout flow.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    demo: '#',
    github: '#',
  },
  {
    title: 'Tourism Website',
    description: 'A travel landing page with destination highlights, pricing cards, and animated UI sections.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    demo: '#',
    github: '#',
  },
  {
    title: 'Mini Mart',
    description: 'A responsive storefront with inventory browsing, filtering, and custom product cards.',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    demo: '#',
    github: '#',
  },
  {
    title: 'Car Information Website',
    description: 'A showcase site for vehicle specs, search, and curated automotive content.',
    tags: ['Next.js', 'TypeScript', 'CSS'],
    demo: '#',
    github: '#',
  },
  {
    title: 'SaaS Application (In Progress)',
    description: 'A modern SaaS admin experience featuring feedback, analytics, and user access flows.',
    tags: ['Prisma', 'Supabase', 'Resend'],
    demo: '#',
    github: '#',
  },
];

const filterOptions = ['All', 'MERN', 'React', 'Next.js', 'Tailwind CSS', 'Supabase'];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary-accent">
            Projects
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Featured work and SaaS project in progress.
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-3 pb-10">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveFilter(option)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === option
                  ? 'border-primary-accent bg-primary-accent/10 text-white'
                  : 'border-white/10 text-primary-light/85 hover:border-primary-accent hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-primary-accent/90">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-primary-light/85">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-primary-light transition hover:border-primary-accent hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-accent/90"
                >
                  Live Demo
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
