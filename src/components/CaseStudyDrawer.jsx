import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Github, Smartphone, ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

function Divider() {
  return (
    <div
      className="my-6 h-px w-full"
      style={{ background: 'var(--border)' }}
    />
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="font-mono text-[10px] tracking-widest uppercase mb-2.5 font-semibold"
      style={{ color: 'var(--accent)' }}
    >
      {children}
    </div>
  );
}

function DrawerContent({ project, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        key="drawer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 transition-colors duration-300"
        style={{
          background: 'var(--cmd-overlay-bg)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Drawer Container: Responsive bottom sheet on mobile, slide-in from right on desktop */}
      <motion.aside
        key="drawer-panel"
        initial={{ y: '100%', opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col md:inset-y-0 md:left-auto md:right-0 md:w-[620px] max-w-full h-[92vh] md:h-full border-t md:border-t-0 md:border-l shadow-2xl transition-colors duration-300"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border-strong)',
        }}
      >
        {/* Sticky Header / Close Bar (with min 44px touch targets) */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-3.5 border-b transition-colors duration-300"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>
              {project.index}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted opacity-40" />
            <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close case study drawer"
            className="touch-target p-2.5 rounded transition-colors duration-150 cursor-pointer"
            style={{
              color: 'var(--muted)',
              border: '1px solid var(--border)',
              background: 'var(--surface-hover)',
            }}
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          {/* Title & Subtitle */}
          <div className="mb-6">
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 font-sans"
              style={{ color: 'var(--ink)' }}
            >
              {project.title}
            </h2>
            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
              {project.subtitle}
            </p>
          </div>

          <Divider />

          {/* Problem / Objective */}
          {project.problem && (
            <div className="mb-6">
              <SectionLabel>THE PROBLEM / OBJECTIVE</SectionLabel>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.9 }}>
                {project.problem}
              </p>
            </div>
          )}

          {/* Key Engineering Decisions */}
          {project.decisions && project.decisions.length > 0 && (
            <div className="mb-6">
              <SectionLabel>KEY ARCHITECTURAL & ENGINEERING DECISIONS</SectionLabel>
              <div className="space-y-3.5 mt-3">
                {project.decisions.map((decision, idx) => (
                  <div key={idx} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      className="font-mono text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--accent)' }}
                    >
                      0{idx + 1}.
                    </span>
                    <span style={{ color: 'var(--ink)', opacity: 0.85 }}>{decision}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Divider />

          {/* Tech Stack Breakdown */}
          {project.stack && (
            <div className="mb-6">
              <SectionLabel>TECH STACK BREAKDOWN</SectionLabel>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2.5 py-1 rounded-sm"
                    style={{
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border)',
                      color: 'var(--ink)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && (
            <div className="mb-6">
              <SectionLabel>CORE HIGHLIGHTS & DELIVERABLES</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-sm text-xs font-mono"
                    style={{
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Actions Bar (min 44px height buttons) */}
        <div
          className="sticky bottom-0 border-t p-4 sm:p-5 flex flex-wrap items-center gap-3 transition-colors duration-300"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          {project.mobileOnly ? (
            <div
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs"
              style={{
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                minHeight: '44px',
              }}
            >
              <Smartphone size={15} strokeWidth={1.75} />
              <span>Cross-platform Mobile (iOS &amp; Android via EAS)</span>
            </div>
          ) : (
            project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary touch-target text-xs sm:text-sm font-semibold rounded px-5 py-2.5 font-sans"
              >
                <span>{project.liveLabel || 'Open Live Demo'}</span>
                <ExternalLink size={14} strokeWidth={1.75} />
              </a>
            )
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary touch-target text-xs sm:text-sm font-medium rounded px-5 py-2.5 font-sans"
            >
              <Github size={14} strokeWidth={1.75} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </motion.aside>
    </>
  );
}

export default function CaseStudyDrawer({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && <DrawerContent key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}
