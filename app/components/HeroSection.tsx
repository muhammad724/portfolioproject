'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight , User2Icon } from 'lucide-react';
import { SiGithub } from 'react-icons/si';



export function HeroSection() {
  const [particles, setParticles] = useState<
    Array<{ top: number; left: number; delay: number; size: number; duration: number; opacity: number }>
  >([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setMounted in a rAF to satisfy react-hooks/set-state-in-effect
    requestAnimationFrame(() => setMounted(true));


    const particlesArray = Array.from({ length: 30 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.5,
    }));

    setParticles(particlesArray);
  }, []);

  const socialLinks = useMemo(
    () => [
      { label: 'Github', href: 'https://github.com/muhammad724', Icon: SiGithub },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-maviya-58bb7537b/', Icon: User2Icon },
    ],
    []
  );

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[#02120D]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02120D]/50 to-[#02120D]" />
        </div>

        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-float"
                style={{
                  backgroundColor: '#20B2A6',
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  opacity: p.opacity,
                  filter: 'drop-shadow(0 0 4px rgba(32, 178, 166, 0.7))',
                }}
              />
            ))}
          </div>
        )}

        {/* subtle gold glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#C9A24D]/10 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#C9A24D]/5 blur-[130px]" />
      </div>

      <div className="mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm md:text-base text-[#C9A24D] w-fit">
              <span className="w-2 h-2 bg-[#C9A24D] rounded-full animate-pulse flex-shrink-0" />
              MERN FULL STACK WEB DEVELOPER
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-white">
              Crafting{' '}
              <span className="text-[#C9A24D] glow-text">digital</span>
              <br className="hidden sm:block" />
              experiences with
              <br className="hidden sm:block" />
              <span className="font-serif italic font-normal text-white block mt-2">precision.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/60 max-w-lg">
              Hi, I'm Muhammad Maviya — a MERN Full Stack Developer building dynamic web applications with MongoDB,
              Express, React, and Node.js. I create clean UIs, smooth animations, and efficient backend systems,
              turning ideas into interactive, user-friendly experiences.
            </p>

            <div className="flex flex-wrap gap-5">
              <a
                href="#projects"
                className="group flex items-center gap-3 rounded-full bg-[#C9A24D] px-8 py-4 font-semibold text-[#02120D] shadow-[0_0_50px_rgba(201,162,77,.35)] transition hover:scale-105"
              >
                View Projects
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:border-[#C9A24D] hover:shadow-[0_0_40px_rgba(201,162,77,.2)]"
              >
                Contact Me
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <span className="text-sm text-white/60">Follow me:</span>
              <div className="flex gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-2 sm:p-2.5 rounded-full text-white glass hover:bg-[#C9A24D]/10 hover:text-[#C9A24D] transition-all duration-300 border border-white/10"
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={18} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] mx-auto lg:mx-0 order-2 mt-8 lg:mt-0">
            <div className="absolute inset-0 rounded-[3rem] bg-[#C9A24D]/30 blur-3xl" />
            <div className="relative rounded-[3rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,.5)]">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10">
                <Image
                  src="/profilepic.jpg"
                  alt="Muhammad Maviya"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/60 rounded-full flex justify-center">
            <span className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1.5 sm:mt-2 animate-bounce" />
          </div>
          <span className="mt-1.5 sm:mt-2 text-xs tracking-widest">SCROLL</span>
        </div>
      </div>
    </section>
  );
}

