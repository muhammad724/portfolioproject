"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";

import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
 SiCss,
SiFramer,
SiJsonwebtokens,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiRedux,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiEslint,
  SiFigma,
  SiRos,
  SiReactquery,
} from "react-icons/si";

import {
  FaDatabase,
  FaServer,
  FaLock,
  FaCode,
  FaGoogle,
  FaLayerGroup,
  FaTools,
} from "react-icons/fa";

import { TbBrandVscode } from "react-icons/tb";

const skillGroups = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
    ],
  },

  {
    title: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Vite", icon: SiVite },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Material UI", icon: SiMui },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Animate On Scroll", icon: SiRos },
    ],
  },

  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "RESTful APIs", icon: FaServer },
    ],
  },

  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "Mongoose", icon: SiMongoose },
      { name: "Prisma", icon: SiPrisma },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
    ],
  },

  {
    title: "Auth & State",
    items: [
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "bcrypt", icon: FaLock },
      { name: "Google reCAPTCHA v3", icon: FaGoogle },
      { name: "Zustand", icon: FaDatabase },
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "TanStack Query", icon: SiReactquery },
      { name: "Context API", icon: FaCode },
    ],
  },

  {
    title: "Tools",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "Vercel", icon: SiVercel },
      { name: "VS Code", icon: TbBrandVscode },
      { name: "ESLint", icon: SiEslint },
      { name: "ThunderClient", icon: TbBrandVscode },
      { name: "Figma", icon: SiFigma },
      { name: "Antigravity", icon: FaCode },
    ],
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary-accent">
            Skills
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Core technologies and tools I use every day.
          </h2>
        </motion.div>
<div className="space-y-20">
  {skillGroups.map((group, groupIndex) => (
    <motion.div
      key={group.title}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: groupIndex * 0.1 }}
    >
      <h3 className="mb-8 text-3xl font-bold text-white">
        {group.title}
      </h3>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {group.items.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition-all hover:border-primary-accent hover:bg-white/10 hover:shadow-[0_0_30px_rgba(201,162,77,.25)]"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/0 via-primary-accent/5 to-primary-accent/20 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center">
                <Icon className="mb-5 text-5xl text-primary-accent transition duration-300 group-hover:scale-125 group-hover:rotate-6" />

                <h4 className="text-sm font-semibold text-white">
                  {skill.name}
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
}
