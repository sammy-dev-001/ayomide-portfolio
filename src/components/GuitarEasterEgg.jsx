import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Music } from 'lucide-react';

export default function GuitarEasterEgg({ isOpen, onClose }) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowHint(false);
      return;
    }

    const timer = setTimeout(() => setShowHint(true), 800);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="guitar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col transition-colors duration-300"
          style={{
            background: 'var(--canvas)',
          }}
        >
          {/* Top Bar (Sticky, min 44px touch targets) */}
          <div
            className="h-14 border-b flex items-center justify-between px-4 sm:px-6 z-10 transition-colors duration-300"
            style={{
              background: 'var(--header-bg)',
              borderColor: 'var(--border)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{
                  background: 'rgba(255,77,0,0.1)',
                  color: 'var(--accent)',
                }}
              >
                <Music size={14} strokeWidth={1.75} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--ink)' }}>
                Kinetic Strings &amp; Drums
              </span>
              <span className="hidden sm:inline font-mono text-xs" style={{ color: 'var(--muted)' }}>
                — Web Audio API Synthesizer
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close instrument modal"
              className="touch-target p-2 rounded transition-colors duration-150 cursor-pointer"
              style={{
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>

          {/* Iframe Canvas Area */}
          <div className="flex-1 w-full relative overflow-hidden" style={{ touchAction: 'manipulation' }}>
            <iframe
              src="/guitar.html"
              title="Kinetic Strings and Drums Synthesizer"
              className="w-full h-full border-none"
              style={{
                touchAction: 'manipulation',
              }}
            />
          </div>

          {/* Bottom Keyboard & Touch Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1.5 rounded text-[11px] font-mono shadow-md whitespace-nowrap"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--muted)',
                }}
              >
                <span>Tap or drag strings to pluck • Press Esc to close</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
