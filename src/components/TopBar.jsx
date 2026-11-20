import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X, Sun, Moon, Search, Sparkles } from 'lucide-react';
import { useLagosTime } from '../hooks/useLagosTime';
import { useTheme } from '../context/ThemeContext';
import { NAV_LINKS, PERSONAL } from '../data/portfolio';

export default function TopBar({ onCmdOpen, mobileNavOpen, setMobileNavOpen }) {
  const time = useLagosTime();
  const { theme, isAuto, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [cmdHovered, setCmdHovered] = useState(false);
  const observerRef = useRef(null);

  // IntersectionObserver: track active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(`#${l.id}`)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileNavOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setMobileNavOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileNavOpen]);

  const scrollTo = (id) => {
    const el = document.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 border-b transition-colors duration-300"
        style={{
          background: 'var(--header-bg)',
          borderColor: 'var(--border)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* LEFT: Wordmark */}
          <button
            onClick={() => scrollTo('home')}
            aria-label="Ayomide Daniyan — Scroll to top"
            className="flex items-center gap-2 group text-left touch-target"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <span
              className="font-mono text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'var(--ink)' }}
            >
              AYOMIDE DANIYAN
            </span>
          </button>

          {/* CENTER: Desktop Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id);
                  }}
                  className="text-xs font-medium tracking-wide uppercase transition-colors duration-150 py-2 relative"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    fontFamily: '"JetBrains Mono", monospace',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px]"
                      style={{ background: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Controls (Theme Toggle, Time, Cmd+K, Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop: Live Lagos WAT Time */}
            <div
              className="hidden lg:flex items-center gap-2 text-[11px] font-mono tracking-tight px-2.5 py-1 rounded"
              style={{
                color: 'var(--muted)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
              title="Lagos, Nigeria Local Time (West Africa Time)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-status" />
              <span>{time} WAT</span>
            </div>

            {/* Desktop: Vertical separator */}
            <div
              className="hidden md:block w-px h-5 mx-0.5"
              style={{ background: 'var(--border)' }}
            />

            {/* Theme Toggle Button (Mobile & Desktop) */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode (${isAuto ? 'Auto active' : 'Manual'})`}
              title={`Theme: ${theme === 'dark' ? 'Night Mode' : 'Day Mode'} ${isAuto ? '(Auto by local time)' : '(Manual)'}`}
              className="touch-target relative rounded p-2 transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--ink)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun size={16} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon size={16} strokeWidth={1.75} style={{ color: 'var(--accent)' }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Micro Auto indicator badge */}
              {isAuto && (
                <span
                  className="absolute -top-1 -right-1 text-[8px] font-mono px-1 rounded uppercase tracking-wider font-bold"
                  style={{
                    background: 'var(--accent)',
                    color: '#ffffff',
                    lineHeight: '11px',
                  }}
                  title="Auto synced to visitor local time"
                >
                  A
                </span>
              )}
            </button>

            {/* Desktop ⌘K Trigger */}
            <button
              onClick={onCmdOpen}
              onMouseEnter={() => setCmdHovered(true)}
              onMouseLeave={() => setCmdHovered(false)}
              aria-label="Open command palette (⌘K)"
              className="hidden md:flex items-center gap-2 text-xs font-mono px-2.5 py-1.5 rounded transition-all duration-150"
              style={{
                color: 'var(--muted)',
                border: '1px solid var(--border)',
                background: cmdHovered ? 'var(--surface-hover)' : 'var(--surface)',
              }}
            >
              <Search size={13} strokeWidth={1.75} />
              <span>⌘K</span>
            </button>

            {/* Mobile Search/Command Button */}
            <button
              onClick={onCmdOpen}
              aria-label="Open command palette search"
              className="md:hidden touch-target rounded p-2 transition-colors duration-150"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--ink)',
              }}
            >
              <Search size={18} strokeWidth={1.75} />
            </button>

            {/* Mobile Hamburger / Menu Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileNavOpen}
              className="md:hidden touch-target rounded p-2 transition-colors duration-150"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--ink)',
              }}
            >
              {mobileNavOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Height Editorial Menu Drawer (Framer Motion) ── */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-14 z-40 flex flex-col justify-between p-6 overflow-y-auto"
            style={{
              background: 'var(--mobile-menu-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Nav links */}
            <div className="flex flex-col gap-2 pt-4">
              <span
                className="text-[10px] font-mono uppercase tracking-widest mb-2"
                style={{ color: 'var(--accent)' }}
              >
                NAVIGATION
              </span>

              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.2 }}
                    onClick={() => scrollTo(link.id)}
                    className="flex items-center justify-between py-4 text-left border-b touch-target"
                    style={{
                      borderBottomColor: 'var(--border)',
                      color: isActive ? 'var(--accent)' : 'var(--ink)',
                    }}
                  >
                    <span className="text-2xl font-bold tracking-tight font-sans">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                      0{idx + 1}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Drawer Bottom Panel: Lagos Clock & Quick Actions */}
            <div className="pt-8 border-t flex flex-col gap-5" style={{ borderColor: 'var(--border)' }}>
              {/* Lagos Local Time */}
              <div
                className="flex items-center justify-between p-3 rounded"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status" />
                  <span className="text-xs font-mono" style={{ color: 'var(--ink)' }}>
                    Lagos, NG (WAT)
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold" style={{ color: 'var(--accent)' }}>
                  {time}
                </span>
              </div>

              {/* Theme status & toggle inside mobile drawer */}
              <div
                className="flex items-center justify-between p-3 rounded"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  Theme: {theme === 'dark' ? 'Night Studio' : 'Day Paper'} ({isAuto ? 'Auto' : 'Manual'})
                </span>
                <button
                  onClick={toggleTheme}
                  className="text-xs font-mono px-3 py-1.5 rounded touch-target font-semibold"
                  style={{
                    background: 'var(--accent)',
                    color: '#ffffff',
                  }}
                >
                  Switch
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 pt-2">
                {PERSONAL?.github && (
                  <a
                    href={PERSONAL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="touch-target p-2 rounded transition-colors"
                    style={{
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                  >
                    <Github size={18} strokeWidth={1.75} />
                  </a>
                )}
                {PERSONAL?.linkedin && (
                  <a
                    href={PERSONAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="touch-target p-2 rounded transition-colors"
                    style={{
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                  >
                    <Linkedin size={18} strokeWidth={1.75} />
                  </a>
                )}
                {PERSONAL?.email && (
                  <a
                    href={`mailto:${PERSONAL.email}`}
                    aria-label="Send Email"
                    className="touch-target p-2 rounded transition-colors"
                    style={{
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                  >
                    <Mail size={18} strokeWidth={1.75} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
