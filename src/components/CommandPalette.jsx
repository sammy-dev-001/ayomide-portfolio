import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home,
  Briefcase,
  User,
  Award,
  Mail,
  Github,
  Linkedin,
  Music,
  ArrowUpRight,
  Layers,
  Zap,
  Command,
  Copy,
  Sun,
  Moon,
  Clock,
  Sparkles,
} from 'lucide-react';
import { PROJECTS, PERSONAL } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

function buildCommands({ onCopyEmail, onGuitarOpen, onProjectOpen, theme, isAuto, toggleTheme, setAutoTheme }) {
  return [
    {
      group: 'NAVIGATE',
      items: [
        {
          id: 'nav-home',
          label: 'Home',
          description: 'Scroll to the top of the page',
          icon: Home,
          action: () => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }),
        },
        {
          id: 'nav-work',
          label: 'Work',
          description: 'View selected projects',
          icon: Briefcase,
          action: () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }),
        },
        {
          id: 'nav-about',
          label: 'About',
          description: 'Engineering stack & toolbox',
          icon: User,
          action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }),
        },
        {
          id: 'nav-proof',
          label: 'Proof',
          description: 'Credentials, hackathon & community',
          icon: Award,
          action: () => document.querySelector('#proof')?.scrollIntoView({ behavior: 'smooth' }),
        },
        {
          id: 'nav-contact',
          label: 'Contact',
          description: 'Start a project or send a message',
          icon: Mail,
          action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
        },
      ],
    },
    {
      group: 'THEME',
      items: [
        {
          id: 'theme-toggle',
          label: theme === 'dark' ? 'Switch to Day Mode (Archival Paper)' : 'Switch to Night Mode (Tactile Studio)',
          description: `Current: ${theme === 'dark' ? 'Night Studio' : 'Day Paper'} • Manual override`,
          icon: theme === 'dark' ? Sun : Moon,
          action: toggleTheme,
        },
        {
          id: 'theme-auto',
          label: 'Set Theme to Auto (Local Time)',
          description: isAuto ? 'Already following your local time of day' : 'Sync automatically (Day: 06:00-17:59, Night: 18:00-05:59)',
          icon: Clock,
          action: setAutoTheme,
        },
      ],
    },
    {
      group: 'PROJECTS',
      items: PROJECTS.map((p) => ({
        id: `proj-${p.id}`,
        label: p.title,
        description: `${p.category} — ${p.subtitle}`,
        icon: Layers,
        action: () => onProjectOpen(p),
      })),
    },
    {
      group: 'ACTIONS',
      items: [
        {
          id: 'act-email',
          label: 'Copy Email Address',
          description: PERSONAL.email,
          icon: Copy,
          action: onCopyEmail,
        },
        {
          id: 'act-guitar',
          label: 'Launch Kinetic Strings & Drums',
          description: 'Interactive Web Audio synthesizer & live notation',
          icon: Music,
          action: onGuitarOpen,
        },
        {
          id: 'act-github',
          label: 'View GitHub Profile',
          description: 'sammy-dev-001 — open in new tab',
          icon: Github,
          action: () => window.open(PERSONAL.github, '_blank', 'noopener,noreferrer'),
        },
        {
          id: 'act-linkedin',
          label: 'View LinkedIn Profile',
          description: 'ayomide-daniyan-6a4233447 — open in new tab',
          icon: Linkedin,
          action: () => window.open(PERSONAL.linkedin, '_blank', 'noopener,noreferrer'),
        },
      ],
    },
  ];
}

export default function CommandPalette({
  isOpen,
  onClose,
  onCopyEmail,
  onGuitarOpen,
  onProjectOpen,
}) {
  const { theme, isAuto, toggleTheme, setAutoTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [highlightedId, setHighlightedId] = useState('nav-home');
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commandGroups = useMemo(
    () => buildCommands({ onCopyEmail, onGuitarOpen, onProjectOpen, theme, isAuto, toggleTheme, setAutoTheme }),
    [onCopyEmail, onGuitarOpen, onProjectOpen, theme, isAuto, toggleTheme, setAutoTheme]
  );

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandGroups;

    return commandGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            group.group.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [commandGroups, query]);

  const flatItems = useMemo(
    () => filteredGroups.flatMap((g) => g.items),
    [filteredGroups]
  );

  useEffect(() => {
    if (flatItems.length > 0) {
      if (!flatItems.some((i) => i.id === highlightedId)) {
        setHighlightedId(flatItems[0].id);
      }
    } else {
      setHighlightedId(null);
    }
  }, [flatItems, highlightedId]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!highlightedId || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-id="${highlightedId}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightedId]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      const idx = flatItems.findIndex((i) => i.id === highlightedId);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedId(flatItems[Math.min(idx + 1, flatItems.length - 1)]?.id ?? null);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedId(flatItems[Math.max(idx - 1, 0)]?.id ?? null);
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedId) {
            const item = flatItems.find((i) => i.id === highlightedId);
            item?.action();
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    },
    [isOpen, flatItems, highlightedId, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const execute = (item) => {
    item.action();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] p-3"
          style={{
            background: 'var(--cmd-overlay-bg)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            key="cmd-box"
            initial={{ scale: 0.96, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl rounded flex flex-col overflow-hidden shadow-2xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              maxHeight: '75vh',
            }}
          >
            {/* Search Input Bar */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <Command size={16} strokeWidth={1.75} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                aria-label="Search commands"
                className="w-full bg-transparent border-none outline-none text-sm font-sans"
                style={{
                  color: 'var(--ink)',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-mono px-1.5 py-0.5 rounded touch-target"
                  style={{
                    color: 'var(--muted)',
                    background: 'var(--surface-hover)',
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Scrollable list */}
            <div
              ref={listRef}
              className="overflow-y-auto py-2 divide-y divide-transparent"
              style={{ flex: 1 }}
            >
              {filteredGroups.length === 0 ? (
                <div
                  className="py-12 text-center text-xs font-mono"
                  style={{ color: 'var(--muted)' }}
                >
                  No commands matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredGroups.map((group, gIdx) => (
                  <div key={group.group}>
                    <div
                      className="px-4 pt-3 pb-1.5 text-[10px] font-mono uppercase tracking-widest"
                      style={{
                        color: 'var(--muted)',
                        borderTop: gIdx > 0 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      {group.group}
                    </div>

                    {group.items.map((item) => {
                      const isHighlighted = item.id === highlightedId;
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          data-id={item.id}
                          onClick={() => execute(item)}
                          onMouseEnter={() => setHighlightedId(item.id)}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-100 touch-target"
                          style={{
                            background: isHighlighted ? 'var(--surface-hover)' : 'transparent',
                            borderLeft: isHighlighted ? '2px solid var(--accent)' : '2px solid transparent',
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isHighlighted ? 'var(--surface-subtle)' : 'var(--surface)',
                              border: '1px solid var(--border)',
                              color: isHighlighted ? 'var(--accent)' : 'var(--muted)',
                            }}
                          >
                            <Icon size={14} strokeWidth={1.75} />
                          </div>

                          <div className="flex flex-col min-w-0 flex-1">
                            <span
                              className="text-xs font-semibold font-sans truncate"
                              style={{ color: 'var(--ink)' }}
                            >
                              {item.label}
                            </span>
                            <span
                              className="text-[11px] font-mono truncate"
                              style={{ color: 'var(--muted)' }}
                            >
                              {item.description}
                            </span>
                          </div>

                          {isHighlighted && (
                            <span
                              className="hidden sm:inline font-mono text-[10px]"
                              style={{ color: 'var(--accent)' }}
                            >
                              ↵
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              className="px-4 py-2.5 border-t flex items-center justify-between text-[10px] font-mono"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--surface-subtle)',
                color: 'var(--muted)',
              }}
            >
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
              <span className="hidden sm:inline">Ayomide Daniyan Portfolio</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
