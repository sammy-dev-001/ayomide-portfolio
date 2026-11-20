import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CREDENTIALS } from '../data/portfolio';
import { Award, GraduationCap, Globe, Mic, Music, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Type-to-icon map (Strict Zero-Emoji, SVG only) ─── */
const ICON_MAP = {
  hackathon: Award,
  award: Award,
  education: GraduationCap,
  gdg: Globe,
  community: Globe,
  tdd: Mic,
};

/* ─── Award ribbon decoration for hackathon card ─────── */
function AwardRibbon() {
  return (
    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
      <div
        className="absolute top-2.5 -right-6 w-20 h-5 rotate-45 flex items-center justify-center font-mono text-[8px] uppercase tracking-wider font-bold"
        style={{
          background: 'var(--accent)',
          color: '#ffffff',
        }}
      >
        TOP 2
      </div>
    </div>
  );
}

/* ─── 4:5 Architectural Editorial Portrait ───────────── */
function EditorialPortrait({ cardRef }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={cardRef}
      className="card p-4 sm:p-5 rounded-sm flex flex-col justify-between transition-colors duration-300 h-full shadow-lg"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border-strong)',
      }}
    >
      {/* Top Technical Metadata Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-status" />
          <span className="font-mono text-[10px] tracking-widest uppercase font-semibold" style={{ color: 'var(--accent)' }}>
            PORTRAIT / 01
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-wider" style={{ color: 'var(--muted)' }}>
          6.5244° N, 3.3792° E
        </span>
      </div>

      {/* 4:5 Frame with Grayscale-to-Full-Color Transition */}
      <div
        className="relative w-full aspect-[4/5] rounded-sm overflow-hidden flex items-center justify-center transition-colors duration-300"
        style={{
          background: 'var(--surface-subtle)',
          border: '1px solid var(--border)',
        }}
      >
        {!imgError ? (
          <img
            src="/images/ayomide.jpg"
            alt="Ayomide Daniyan — Software Engineer & Builder"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-all duration-500 ease-out md:grayscale md:hover:grayscale-0 md:hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          /* Styled Fallback State (No broken image icons) */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative select-none">
            {/* Viewfinder crosshairs */}
            <span className="absolute top-3 left-3 font-mono text-[11px] opacity-30">+</span>
            <span className="absolute top-3 right-3 font-mono text-[11px] opacity-30">+</span>
            <span className="absolute bottom-3 left-3 font-mono text-[11px] opacity-30">+</span>
            <span className="absolute bottom-3 right-3 font-mono text-[11px] opacity-30">+</span>

            <div
              className="w-16 h-16 rounded flex items-center justify-center mb-3 shadow-inner"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <Camera size={24} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
            </div>

            <span className="font-mono text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--ink)' }}>
              AYOMIDE DANIYAN
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase mt-1" style={{ color: 'var(--muted)' }}>
              BUILDER • LAGOS, NG
            </span>
          </div>
        )}

        {/* Subtle bottom gradient shade */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-30"
          style={{
            background: 'linear-gradient(to top, var(--surface) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Editorial Caption Below */}
      <div className="pt-3.5 mt-3 border-t flex flex-col gap-0.5" style={{ borderColor: 'var(--border)' }}>
        <p className="font-mono text-[10px] font-semibold tracking-wider uppercase" style={{ color: 'var(--ink)' }}>
          FIG. 01 — AYOMIDE DANIYAN / LAGOS, NG
        </p>
        <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
          SOFTWARE ENGINEER &amp; PRODUCT BUILDER
        </p>
      </div>
    </div>
  );
}

/* ─── Credential Card ───────────────────────────────── */
function CredentialCard({ cred, prominent, cardRef }) {
  const IconComponent = ICON_MAP[cred.id] || ICON_MAP[cred.type] || Award;

  return (
    <div
      ref={cardRef}
      className="card relative p-6 rounded-sm flex flex-col justify-between overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--surface)',
        borderColor: prominent ? 'var(--accent)' : 'var(--border)',
        height: '100%',
      }}
    >
      {prominent && <AwardRibbon />}

      <div>
        {/* Icon box (Clean SVG) */}
        <div
          className="w-10 h-10 rounded flex items-center justify-center mb-4 transition-colors duration-300"
          style={{
            background: 'var(--surface-subtle)',
            border: '1px solid var(--border)',
            color: 'var(--accent)',
          }}
        >
          <IconComponent size={19} strokeWidth={1.75} />
        </div>

        {/* Org + year row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className="font-mono text-[10px] uppercase tracking-wider font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            {cred.org}
          </span>
          <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
            {cred.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base sm:text-lg font-bold tracking-tight mb-2 font-sans"
          style={{ color: 'var(--ink)' }}
        >
          {cred.title}
        </h3>

        {/* Note */}
        <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
          {cred.note}
        </p>
      </div>
    </div>
  );
}

/* ─── Creative Signal card (full-width bottom) ───────── */
function CreativeSignalCard({ onGuitarOpen, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="card p-6 sm:p-8 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-colors duration-300 border-dashed"
      style={{
        background: 'var(--surface-subtle)',
        borderColor: 'var(--border-strong)',
      }}
    >
      {/* Left: Videography & Storytelling */}
      <div className="md:col-span-7 flex flex-col gap-3">
        <span className="section-label">BEYOND THE CODE</span>

        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          When not shipping software, Ayomide frames shots and edits video — trained visual
          storytelling and pacing that sharpens design instincts, product clarity, and UI polish on
          every build.
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          {['Videography', 'Visual Storytelling', 'Cinematography'].map((tag) => (
            <span key={tag} className="chip text-[10px]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: Guitar Easter Egg Interactive Trigger */}
      <div
        className="md:col-span-5 flex flex-col gap-3 pt-6 md:pt-0 border-t md:border-t-0 md:border-l md:pl-8"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="section-label">PLAYABLE SYNTHESIS</span>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
          893-line browser instrument built entirely on the Canvas &amp; Web Audio APIs. Standard
          guitar tuning, physics-spring strings, live staff notation — zero external dependencies.
        </p>

        <button
          onClick={onGuitarOpen}
          aria-label="Launch interactive Kinetic Strings guitar synth"
          className="btn-primary touch-target self-start text-xs sm:text-sm font-sans font-semibold mt-1"
        >
          <Music size={15} strokeWidth={1.75} />
          <span>Launch Instrument</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Proof Section Main Component ──────────────────── */
export default function Proof({ onGuitarOpen }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const portraitRef = useRef(null);
  const signalRef = useRef(null);

  cardRefs.current = [];
  const collectCard = (el) => {
    if (el) cardRefs.current.push(el);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          headerRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );

        if (portraitRef.current) {
          gsap.fromTo(
            portraitRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: portraitRef.current,
                start: 'top 85%',
              },
            }
          );
        }

        if (cardRefs.current.length) {
          gsap.fromTo(
            cardRefs.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardRefs.current[0],
                start: 'top 85%',
              },
            }
          );
        }

        if (signalRef.current) {
          gsap.fromTo(
            signalRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: signalRef.current,
                start: 'top 88%',
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const hackathon = CREDENTIALS.find((c) => c.id === 'hackathon');
  const education = CREDENTIALS.find((c) => c.id === 'education');
  const gdg = CREDENTIALS.find((c) => c.id === 'gdg');
  const tdd = CREDENTIALS.find((c) => c.id === 'tdd');

  return (
    <section
      id="proof"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 border-t"
      style={{
        background: 'var(--canvas)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12">
          <span className="section-label">PROOF OF WORK &amp; PRESENCE</span>

          <h2 className="mt-3 leading-tight">
            <span
              className="font-serif-italic text-3xl sm:text-4xl lg:text-5xl font-normal mr-2.5"
              style={{ color: 'var(--ink)' }}
            >
              Track record.
            </span>
            <span
              className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ color: 'var(--ink)' }}
            >
              Built in public.
            </span>
          </h2>
        </div>

        {/* Bento Grid: 4:5 Portrait Frame + Credentials 2x2 */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT: 4:5 Architectural Portrait Frame */}
            <div className="lg:col-span-4 flex flex-col">
              <EditorialPortrait cardRef={portraitRef} />
            </div>

            {/* RIGHT: Credentials Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Hackathon Award (Prominent) */}
              {hackathon && (
                <div>
                  <CredentialCard cred={hackathon} prominent cardRef={collectCard} />
                </div>
              )}

              {/* Computer Science Degree */}
              {education && (
                <div>
                  <CredentialCard cred={education} cardRef={collectCard} />
                </div>
              )}

              {/* GDG Community */}
              {gdg && (
                <div>
                  <CredentialCard cred={gdg} cardRef={collectCard} />
                </div>
              )}

              {/* The Dialogue Den (2026) */}
              {tdd && (
                <div>
                  <CredentialCard cred={tdd} cardRef={collectCard} />
                </div>
              )}
            </div>
          </div>

          {/* Full-width Creative Signal Card */}
          <CreativeSignalCard onGuitarOpen={onGuitarOpen} cardRef={signalRef} />
        </div>
      </div>
    </section>
  );
}
