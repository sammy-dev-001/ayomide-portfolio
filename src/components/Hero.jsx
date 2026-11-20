import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail, ArrowDown, ChevronRight } from 'lucide-react';
import { PERSONAL } from '../data/portfolio';

// ─── Magnetic Hook ────────────────────────────────────────────────────────────
function useMagnetic(strength = 0.25) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  };

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

// ─── Right Column: Abstract Device Frame ─────────────────────────────────────
function DeviceFrame() {
  const chips = [
    { label: 'React Native', top: '8%', left: '-4%', rotate: '-2deg' },
    { label: 'Socket.io', top: '20%', right: '-3%', rotate: '2deg' },
    { label: 'Framer Motion', bottom: '26%', left: '-3%', rotate: '1.5deg' },
    { label: 'TypeScript', bottom: '12%', right: '-2%', rotate: '-1.5deg' },
  ];

  const codeLines = [
    { text: 'const portfolio = {', accent: false },
    { text: '  engineer: "Ayomide Daniyan",', accent: false },
    { text: '  location: "Lagos, NG",', accent: false },
    { text: '  stack: ["React", "Next.js", "Node.js"],', accent: false },
    { text: '  status: "Available for roles",', accent: true, status: true },
    { text: '};', accent: false },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center py-6">
      {/* Hairline grid background */}
      <div
        className="absolute inset-0 pointer-events-none rounded opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Browser window mockup */}
      <div
        className="device-frame relative w-full max-w-sm rounded-md overflow-hidden transition-colors duration-300 shadow-xl"
        style={{
          border: '1px solid var(--border-strong)',
          background: 'var(--surface)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 border-b transition-colors duration-300"
          style={{
            background: 'var(--surface-hover)',
            borderColor: 'var(--border)',
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#FF5F57' }} />
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#FFBD2E' }} />
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#28C840' }} />
          {/* URL bar */}
          <div
            className="flex-1 ml-2 h-5 rounded flex items-center px-2.5 transition-colors duration-300"
            style={{
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border)',
            }}
          >
            <span className="font-mono text-[10px] tracking-tight" style={{ color: 'var(--muted)' }}>
              ayomide.dev/craft
            </span>
          </div>
        </div>

        {/* Code body */}
        <div className="p-4 font-mono text-[12px] leading-relaxed" style={{ color: 'var(--muted)' }}>
          {codeLines.map((line, i) => (
            <div
              key={i}
              className="flex items-center px-2 py-0.5 rounded-sm transition-colors duration-150"
              style={{
                borderLeft: line.accent ? '2px solid var(--accent)' : '2px solid transparent',
                background: line.accent ? 'rgba(255,77,0,0.06)' : 'transparent',
                color: line.accent ? 'var(--ink)' : 'var(--muted)',
              }}
            >
              <span className="font-mono select-none w-5 text-[10px] opacity-40">0{i + 1}</span>
              {line.status && (
                <span className="w-1.5 h-1.5 rounded-full bg-status inline-block mr-1.5 animate-pulse" />
              )}
              <span className="font-medium">{line.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating chips (Desktop) */}
      {chips.map((chip, idx) => (
        <div
          key={idx}
          className="absolute hidden sm:inline-flex items-center px-2.5 py-1 rounded text-[10px] font-mono shadow-sm transition-colors duration-300 select-none pointer-events-none"
          style={{
            top: chip.top,
            left: chip.left,
            right: chip.right,
            bottom: chip.bottom,
            transform: `rotate(${chip.rotate})`,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
          }}
        >
          {chip.label}
        </div>
      ))}
    </div>
  );
}

// ─── Hero Main Component ──────────────────────────────────────────────────────
export default function Hero({ onCopyEmail, onCmdOpen }) {
  const sectionRef = useRef(null);
  const primaryBtn = useMagnetic(0.2);
  const secondaryBtn = useMagnetic(0.2);

  // GSAP animation with matchMedia for 60fps mobile
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop animation
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          '.hero-line',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.1,
          }
        );

        gsap.fromTo(
          '.device-frame',
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.35,
          }
        );
      });

      // Mobile animation (lighter & faster, no heavy x-shifts)
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          '.hero-line',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.05,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] pt-24 sm:pt-28 md:pt-36 pb-16 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 flex items-center"
      style={{
        background: 'var(--canvas)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* LEFT COLUMN: Editorial Text */}
        <div className="flex-1 lg:w-[58%]">
          {/* 1. METADATA ROW */}
          <div className="hero-line flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            <span
              className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase"
              style={{ color: 'var(--muted)' }}
            >
              LAGOS, NG • 6.5244° N, 3.3792° E
            </span>

            <span className="hidden sm:inline" style={{ color: 'var(--border-strong)' }}>
              —
            </span>

            {/* Tiny 36x36 architectural portrait badge + Status Pill */}
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-sm overflow-hidden flex-shrink-0 shadow-sm transition-transform duration-200 hover:scale-105"
                style={{
                  border: '1px solid var(--border-strong)',
                  background: 'var(--surface)',
                }}
                title="Ayomide Daniyan"
              >
                <img
                  src="/images/ayomide.jpg"
                  alt="Ayomide Daniyan"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <span className="status-pill text-[10px] sm:text-xs">
                <span className="status-dot" />
                <span>Available for freelance &amp; engineering roles</span>
              </span>
            </div>
          </div>

          {/* 2. OVERSIZED EDITORIAL HEADLINE (FLUID CLAMP) */}
          <h1
            className="font-extrabold tracking-tighter leading-[1.04] mb-6"
            style={{ color: 'var(--ink)' }}
          >
            <span
              className="hero-line block text-[clamp(2.35rem,6.8vw,5.2rem)] font-sans"
              style={{ letterSpacing: '-0.03em' }}
            >
              Engineering
            </span>

            <span
              className="hero-line block text-[clamp(2.15rem,6.2vw,4.8rem)]"
              style={{ letterSpacing: '-0.03em' }}
            >
              <em
                className="font-serif-italic font-normal mr-2.5 transition-colors duration-300"
                style={{
                  color: 'var(--accent)',
                  fontStyle: 'italic',
                }}
              >
                high-craft
              </em>
              <span className="font-sans font-extrabold">web products</span>
            </span>

            <span
              className="hero-line block text-[clamp(2.15rem,6.2vw,4.8rem)] font-sans"
              style={{ letterSpacing: '-0.03em' }}
            >
              &amp; interactive systems.
            </span>
          </h1>

          {/* 3. GROUNDED SUBCOPY */}
          <div className="hero-line mb-8">
            <p
              className="text-sm sm:text-base font-normal max-w-xl leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              Computer Science undergraduate at Lagos State University building high-velocity
              frontends, real-time multiplayer systems, and full-stack software with relentless
              craft and architectural discipline.
            </p>
          </div>

          {/* 4. DUAL CTA BUTTONS (Touch-first min 44px) */}
          <div className="hero-line flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <button
              ref={primaryBtn.ref}
              onMouseMove={primaryBtn.onMouseMove}
              onMouseLeave={primaryBtn.onMouseLeave}
              onClick={() => scrollTo('contact')}
              className="btn-primary touch-target cursor-pointer font-sans"
            >
              <span>Start a Project</span>
              <ChevronRight size={16} strokeWidth={2} />
            </button>

            <button
              ref={secondaryBtn.ref}
              onMouseMove={secondaryBtn.onMouseMove}
              onMouseLeave={secondaryBtn.onMouseLeave}
              onClick={() => scrollTo('work')}
              className="btn-secondary touch-target cursor-pointer font-sans"
            >
              <ArrowDown size={15} strokeWidth={1.75} />
              <span>Selected Work</span>
            </button>
          </div>

          {/* 5. ICON LINKS ROW (All min 44px touch targets) */}
          <div className="hero-line flex items-center gap-3">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (sammy-dev-001)"
              className="touch-target rounded p-2.5 transition-colors duration-150"
              style={{
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <Github size={18} strokeWidth={1.75} />
            </a>

            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (Ayomide Daniyan)"
              className="touch-target rounded p-2.5 transition-colors duration-150"
              style={{
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <Linkedin size={18} strokeWidth={1.75} />
            </a>

            <button
              onClick={onCopyEmail}
              aria-label="Copy Email address to clipboard"
              className="touch-target rounded p-2.5 transition-colors duration-150 cursor-pointer"
              style={{
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <Mail size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Device Preview (Hidden on small mobile, visible on tablet/desktop) */}
        <div className="hidden md:flex flex-1 lg:w-[42%] justify-center items-center mt-12 lg:mt-0">
          <DeviceFrame />
        </div>
      </div>
    </section>
  );
}
