export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary-bg/95">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary-light/80">
              M.MAVIYA TARIQ
            </p>
            <p className="mt-3 text-sm text-primary-light/70">
              Full Stack Developer Portfolio. Built with Next.js.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#about"
              className="text-sm text-primary-light/70 transition hover:text-primary-light"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-sm text-primary-light/70 transition hover:text-primary-light"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm text-primary-light/70 transition hover:text-primary-light"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-primary-light/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Maviya. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span aria-hidden>⚡</span>
            <span>Designed & developed by Maviya.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}


