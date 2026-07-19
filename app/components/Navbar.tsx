
'use client';

import { useEffect, useMemo, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Admin', href: '/login' },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const id = 'mobile-nav';

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (!open) return;
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-primary-bg/95 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <a
          href="#home"
          className="text-lg font-display font-semibold uppercase tracking-[0.35em] text-primary-light"
        >
          M.MAVIYA TARIQ
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] text-primary-light/75 transition hover:text-primary-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-primary-light/90 backdrop-blur-xl md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="text-xl leading-none">
              {open ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id={id}
        className={
          (open ? 'block' : 'hidden') +
          ' md:hidden border-t border-white/10 bg-primary-bg/95 backdrop-blur-2xl'
        }
      >
        <div className={
          'mx-auto max-w-7xl px-6 py-4' + (reducedMotion ? '' : ' animate-in fade-in')
        }>
          <div className="flex flex-col gap-4">
            <div className="md:hidden">
              <ThemeToggle />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.2em] text-primary-light/80 transition hover:border-[#C9A24D] hover:text-[#C9A24D]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

