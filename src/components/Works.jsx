import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Smartphone } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── Preview Art ─────────────────────────── */

function EduFiPreview() {
  return (
    <div
      className="w-full h-full flex items-center justify-center gap-4 p-6 relative transition-colors duration-300"
      style={{ background: 'var(--preview-bg)' }}
    >
      {/* Left phone */}
      <div
        className="w-24 sm:w-28 h-44 rounded-2xl flex flex-col p-2.5 gap-1.5 relative overflow-hidden transition-colors duration-300 shadow-md"
        style={{
          border: '1px solid var(--border-strong)',
          background: 'var(--preview-inner)',
        }}
      >
        {/* Notch */}
        <div
          className="w-8 h-1 rounded-full self-center mb-1"
          style={{ background: 'var(--border-strong)' }}
        />
        <div className="flex items-center gap-1.5 text-[9px] font-mono" style={{ color: 'var(--muted)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-status" />
          <span>GPA: 3.8</span>
        </div>
        <div
          className="rounded p-1.5 text-[9px] font-mono font-medium"
          style={{
            background: 'rgba(255,77,0,0.08)',
            border: '1px solid rgba(255,77,0,0.2)',
            color: 'var(--accent)',
          }}
        >
          AI Advisor
        </div>
        <div className="flex-1" />
        {[0.4, 0.6, 0.35].map((w, i) => (
          <div
            key={i}
            className="h-1 rounded-sm"
            style={{
              background: 'var(--border)',
              width: `${w * 100}%`,
            }}
          />
        ))}
        {/* Accent bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: 'var(--accent)' }}
        />
      </div>

      {/* Right phone — timetable */}
      <div
        className="w-24 sm:w-28 h-44 rounded-2xl flex flex-col p-2.5 gap-1.5 relative overflow-hidden transition-colors duration-300 shadow-md"
        style={{
          border: '1px solid var(--border-strong)',
          background: 'var(--preview-inner)',
        }}
      >
        <div
          className="w-8 h-1 rounded-full self-center mb-1"
          style={{ background: 'var(--border-strong)' }}
        />
        {[
          { opacity: 0.7, w: '90%' },
          { opacity: 0.5, w: '70%' },
          { opacity: 0.6, w: '85%' },
          { opacity: 0.4, w: '55%' },
          { opacity: 0.55, w: '75%' },
          { opacity: 0.45, w: '65%' },
        ].map((row, i) => (
          <div
            key={i}
            className="h-3.5 rounded-sm"
            style={{
              background: 'var(--accent)',
              opacity: row.opacity,
              width: row.w,
            }}
          />
        ))}
      </div>

      {/* Bottom badge */}
      <div
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded"
        style={{
          color: 'var(--muted)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        iOS · Android · EAS
      </div>
    </div>
  );
}

function PlayRavePreview() {
  const games = ['Whot!', 'Scrabble', 'Charades', 'Truth/Dare', 'Memory', 'Tic-Tac-Toe'];
  const accent = 2;
  return (
    <div
      className="w-full h-full flex items-center justify-center p-6 transition-colors duration-300"
      style={{ background: 'var(--preview-bg)' }}
    >
      <div
        className="grid grid-cols-3 gap-1 rounded-md overflow-hidden w-64 shadow-md transition-colors duration-300"
        style={{
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}
      >
        {games.map((g, i) => (
          <div
            key={i}
            className="p-2.5 flex items-center justify-center text-[10px] font-mono text-center min-h-[44px] transition-colors duration-150"
            style={{
              background: i === accent ? 'rgba(255,77,0,0.1)' : 'var(--preview-inner)',
              border: i === accent ? '1px solid var(--accent)' : '1px solid transparent',
              color: i === accent ? 'var(--accent)' : 'var(--muted)',
              fontWeight: i === accent ? 600 : 400,
            }}
          >
            {g}
          </div>
        ))}
      </div>
    </div>
  );
}

function RawSharePreview() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6 gap-3.5 transition-colors duration-300"
      style={{ background: 'var(--preview-bg)' }}
    >
      {/* Drop zone */}
      <div
        className="w-full max-w-[240px] h-20 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-colors duration-300"
        style={{
          border: '1.5px dashed var(--border-strong)',
          background: 'var(--preview-inner)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)' }}>
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        </svg>
        <span className="text-[10px] font-mono" style={{ color: 'var(--muted)' }}>
          Drop photos to share
        </span>
      </div>

      {/* Thumbnails row */}
      <div className="flex gap-1.5">
        {[0.8, 1, 0.6].map((o, i) => (
          <div
            key={i}
            className="w-12 h-9 rounded-sm shadow-sm"
            style={{
              background: 'var(--surface-hover)',
              border: '1px solid var(--border)',
              opacity: o,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <div className="w-3/5 h-full rounded-full" style={{ background: 'var(--accent)' }} />
      </div>
    </div>
  );
}

function TeamBotPreview() {
  const bubbles = [
    { side: 'left', text: '/tasks' },
    { side: 'right', text: '3 tasks due today' },
    { side: 'left', text: 'Who is on UI review?' },
    { side: 'right', text: '@Tunde · @Ada assigned' },
  ];
  return (
    <div
      className="w-full h-full flex flex-col justify-center p-6 gap-2 transition-colors duration-300"
      style={{ background: 'var(--preview-bg)' }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#FFBD2E' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
        <span className="font-mono text-[10px] ml-2" style={{ color: 'var(--muted)' }}>
          TeamBot · WhatsApp
        </span>
      </div>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="flex"
          style={{ justifyContent: b.side === 'right' ? 'flex-end' : 'flex-start' }}
        >
          <div
            className="max-w-[75%] px-3 py-1.5 rounded text-[11px] font-mono shadow-sm"
            style={{
              background: b.side === 'right' ? 'rgba(255,77,0,0.1)' : 'var(--preview-inner)',
              border: b.side === 'right' ? '1px solid rgba(255,77,0,0.2)' : '1px solid var(--border)',
              color: b.side === 'right' ? 'var(--accent)' : 'var(--ink)',
            }}
          >
            {b.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function KineticStringsPreview() {
  const strings = [
    { color: '#f3c677', freq: 1.2, phase: 0 },
    { color: '#e8b05a', freq: 0.8, phase: 0.5 },
    { color: '#d9933c', freq: 1.6, phase: 1.0 },
    { color: '#cc7c28', freq: 1.0, phase: 0.3 },
    { color: '#c17020', freq: 1.4, phase: 0.7 },
    { color: '#bc7d33', freq: 0.6, phase: 1.2 },
  ];
  const orbString = 2;
  const orbX = 0.6;
  const W = 280;

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-6 transition-colors duration-300"
      style={{ background: 'var(--preview-bg)' }}
    >
      {/* 6 strings */}
      <svg width="100%" height="110" viewBox={`0 0 ${W} 110`} style={{ overflow: 'visible' }}>
        {strings.map((str, i) => {
          const y = 14 + i * 16;
          const isOrb = i === orbString;
          const midY = isOrb ? y - 6 : y;
          const d = `M 10 ${y} Q ${W * orbX} ${midY} ${W - 10} ${y}`;
          return (
            <g key={i}>
              <path d={d} stroke={str.color} strokeWidth={1.4} fill="none" opacity={0.85} />
              {isOrb && (
                <circle cx={W * orbX} cy={midY} r={5} fill="var(--accent)" />
              )}
            </g>
          );
        })}
      </svg>

      {/* Staff notation lines */}
      <div className="w-full">
        <div className="flex flex-col gap-1 w-full opacity-40">
          {[0, 1, 2, 3, 4].map((n) => (
            <div key={n} className="w-full h-px" style={{ background: 'var(--ink)' }} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 font-mono text-[9px]" style={{ color: 'var(--muted)' }}>
          <span>Standard Tuning (E2-E4)</span>
          <span style={{ color: 'var(--accent)' }}>Web Audio API</span>
        </div>
      </div>
    </div>
  );
}

const PREVIEW_COMPONENTS = {
  edufi: EduFiPreview,
  playrave: PlayRavePreview,
  rawshare: RawSharePreview,
  teambot: TeamBotPreview,
  'kinetic-strings': KineticStringsPreview,
};

/* ─────────────────────────── Project Card ─────────────────────────── */

function ProjectCard({ project, height, onProjectOpen }) {
  const PreviewComp = PREVIEW_COMPONENTS[project.id] || EduFiPreview;

  return (
    <div
      onClick={() => onProjectOpen(project)}
      className="project-card card group relative cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300"
      style={{ minHeight: height || '340px' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onProjectOpen(project);
        }
      }}
      aria-label={`Open case study: ${project.title}`}
    >
      {/* Top: Custom Interactive Visual Preview */}
      <div className="project-preview w-full h-44 sm:h-52 relative border-b" style={{ borderColor: 'var(--border)' }}>
        <PreviewComp />
      </div>

      {/* Bottom: Project Metadata & Summary */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Index & Category Bar */}
          <div className="flex items-center justify-between mb-2">
            <span className="project-index text-xs font-semibold">
              {project.index}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3
            className="text-lg sm:text-xl font-bold tracking-tight mb-1 font-sans group-hover:text-accent transition-colors duration-150"
            style={{ color: 'var(--ink)' }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="text-xs font-medium mb-3 font-sans" style={{ color: 'var(--muted)' }}>
            {project.subtitle}
          </p>

          {/* Summary */}
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>
            {project.summary}
          </p>
        </div>

        {/* Stack pills & CTA */}
        <div className="pt-4 mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(project.stack || []).slice(0, 4).map((tech, i) => (
              <span key={i} className="chip text-[10px]">
                {tech}
              </span>
            ))}
            {(project.stack || []).length > 4 && (
              <span className="text-[10px] font-mono self-center px-1" style={{ color: 'var(--muted)' }}>
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <span className="font-mono text-xs font-medium flex items-center gap-1 group-hover:underline" style={{ color: 'var(--accent)' }}>
              <span>Case Study</span>
              <ArrowUpRight size={13} strokeWidth={2} />
            </span>

            {project.mobileOnly && (
              <span className="flex items-center gap-1 text-[11px] font-mono" style={{ color: 'var(--muted)' }}>
                <Smartphone size={12} strokeWidth={1.75} />
                <span>Mobile</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Works Section ─────────────────────────── */

export default function Works({ onProjectOpen }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('.project-card');
        if (!cards) return;

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const [p01, p02, p03, p04, p05] = PROJECTS;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300"
      style={{ background: 'var(--canvas)' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 sm:mb-12">
          <span className="section-label whitespace-nowrap">
            SELECTED WORKS
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Row 1: Full-width Hero Flagship */}
          <div className="w-full">
            <ProjectCard project={p01} height="390px" onProjectOpen={onProjectOpen} />
          </div>

          {/* Row 2: 60% / 40% split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            <div className="md:col-span-7">
              <ProjectCard project={p02} height="340px" onProjectOpen={onProjectOpen} />
            </div>
            <div className="md:col-span-5">
              <ProjectCard project={p03} height="340px" onProjectOpen={onProjectOpen} />
            </div>
          </div>

          {/* Row 3: 50% / 50% split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            <div className="md:col-span-5">
              <ProjectCard project={p04} height="320px" onProjectOpen={onProjectOpen} />
            </div>
            <div className="md:col-span-7">
              <ProjectCard project={p05} height="320px" onProjectOpen={onProjectOpen} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
