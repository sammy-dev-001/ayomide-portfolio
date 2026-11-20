import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL } from '../data/portfolio';
import { useLagosTime } from '../hooks/useLagosTime';

export default function Footer({ onCopyEmail }) {
  const time = useLagosTime();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <Github size={16} strokeWidth={1.75} />,
      href: PERSONAL?.github || 'https://github.com/sammy-dev-001',
      label: 'GitHub Profile',
      onClick: null,
    },
    {
      icon: <Linkedin size={16} strokeWidth={1.75} />,
      href: PERSONAL?.linkedin || 'https://linkedin.com/in/ayomide-daniyan-6a4233447',
      label: 'LinkedIn Profile',
      onClick: null,
    },
    {
      icon: <Mail size={16} strokeWidth={1.75} />,
      href: null,
      label: 'Copy Email',
      onClick: onCopyEmail,
    },
  ];

  return (
    <footer
      className="border-t py-12 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300"
      style={{
        background: 'var(--canvas)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* LEFT: Wordmark & Grounded Motto */}
        <div className="flex flex-col text-center md:text-left">
          <span
            className="font-mono text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: 'var(--ink)' }}
          >
            AYOMIDE DANIYAN
          </span>
          <p
            className="text-xs sm:text-sm font-sans italic"
            style={{ color: 'var(--muted)' }}
          >
            &ldquo;{PERSONAL.quote}&rdquo;
          </p>
        </div>

        {/* CENTER: Lagos Time Status & Social Icons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div
            className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-status" />
            <span>Lagos, NG • {time} WAT</span>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((s, idx) => {
              if (s.href) {
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="touch-target p-2 rounded transition-colors duration-150"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                    }}
                  >
                    {s.icon}
                  </a>
                );
              }
              return (
                <button
                  key={idx}
                  onClick={s.onClick}
                  aria-label={s.label}
                  className="touch-target p-2 rounded transition-colors duration-150 cursor-pointer"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                  }}
                >
                  {s.icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Copyright & Back-to-Top Button */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()}
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="touch-target p-2.5 rounded transition-all duration-150 cursor-pointer hover:-translate-y-0.5"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--ink)',
            }}
          >
            <ArrowUp size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </footer>
  );
}
