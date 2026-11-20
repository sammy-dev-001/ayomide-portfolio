import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STACK } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

/* ─── Stat data ─────────────────────────────────────── */
const STATS = [
  { value: '5+', label: 'Production projects' },
  { value: '15+', label: 'Libraries & tools shipped' },
  { value: '2024—', label: 'Active since' },
];

/* ─── Chip ──────────────────────────────────────────── */
function Chip({ label, isCore }) {
  return (
    <span
      className="inline-block font-mono rounded-sm transition-all duration-150 select-none py-1.5 px-3 text-xs"
      style={{
        border: isCore
          ? '1px solid rgba(255,77,0,0.3)'
          : '1px solid var(--border)',
        background: isCore
          ? 'rgba(255,77,0,0.06)'
          : 'var(--surface-subtle)',
        color: isCore ? 'var(--accent)' : 'var(--ink)',
        fontWeight: isCore ? 600 : 400,
      }}
    >
      {label}
    </span>
  );
}

export default function Stack() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Desktop reveal
        mm.add('(min-width: 768px)', () => {
          gsap.fromTo(
            leftRef.current,
            { x: -24, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
              },
            }
          );
          gsap.fromTo(
            rightRef.current,
            { x: 24, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
              },
            }
          );
        });

        // Mobile reveal
        mm.add('(max-width: 767px)', () => {
          gsap.fromTo(
            [leftRef.current, rightRef.current],
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 border-t"
      style={{
        background: 'var(--canvas)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div ref={leftRef} className="w-full lg:w-[35%] lg:sticky lg:top-24">
            <span className="section-label">ENGINEERING STACK</span>

            <h2 className="mt-4 leading-[1.08]">
              <span
                className="font-serif-italic block text-3xl sm:text-4xl lg:text-5xl font-normal"
                style={{ color: 'var(--ink)' }}
              >
                Full-spectrum
              </span>
              <span
                className="font-sans block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                style={{ color: 'var(--ink)' }}
              >
                technical range.
              </span>
            </h2>

            <p
              className="text-sm font-normal mt-5 max-w-sm leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              Every layer of the stack. No single-discipline pretending. Frontend
              architecture, real-time networking, mobile engineering, and AI tool integration.
            </p>

            {/* Stat block */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="grid grid-cols-3 gap-4">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span
                      className="font-mono text-2xl font-bold tracking-tight"
                      style={{ color: 'var(--accent)' }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-mono text-[10px] mt-1 uppercase tracking-wider leading-tight"
                      style={{ color: 'var(--muted)' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT COLUMN: Swiss Spec Sheet ══════════════ */}
          <div
            ref={rightRef}
            className="w-full lg:w-[65%] rounded-md p-6 sm:p-8 card relative transition-colors duration-300"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-strong)',
            }}
          >
            {/* Blueprint Grid Watermark */}
            <div
              className="absolute inset-0 pointer-events-none rounded opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 flex flex-col gap-8">
              {Object.entries(STACK).map(([category, items]) => {
                const isCore = category === 'Core Engineering';
                return (
                  <div key={category} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                      <span
                        className="font-mono text-xs uppercase tracking-widest font-semibold"
                        style={{ color: isCore ? 'var(--accent)' : 'var(--muted)' }}
                      >
                        {category}
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                        {items.length} skills
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Chip key={item} label={item} isCore={isCore} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
