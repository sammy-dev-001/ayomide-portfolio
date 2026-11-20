import { useState } from 'react';
import { Mail, Github, Linkedin, Copy, FileText, Send, ArrowUpRight } from 'lucide-react';
import { PERSONAL, CONTACT_SCOPES } from '../data/portfolio';

const EMAIL = 'samueldaniyan564@gmail.com';

export default function Contact({ onCopyEmail, showToast }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedScopes, setSelectedScopes] = useState([]);
  const [brief, setBrief] = useState('');

  const toggleScope = (scope) => {
    setSelectedScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  const handleSendBrief = () => {
    const scopeStr = selectedScopes.length > 0 ? selectedScopes.join(', ') : 'General Inquiry';
    const message = brief.trim() || 'Hi Ayomide, I would like to discuss a project with you.';
    
    // Copy formatted brief to clipboard as a reliable backup
    const clipboardBackup = `To: ${EMAIL}\nSubject: Project Brief: ${scopeStr}\n\n${message}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(clipboardBackup).catch(() => {});
    }

    const subject = encodeURIComponent(`Project Brief: ${scopeStr}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    if (showToast) {
      showToast('Opening mail client — brief copied to clipboard');
    }
  };

  const handleOpenGmail = () => {
    const scopeStr = selectedScopes.length > 0 ? selectedScopes.join(', ') : 'General Inquiry';
    const message = brief.trim() || 'Hi Ayomide, I would like to discuss a project with you.';
    const subject = encodeURIComponent(`Project Brief: ${scopeStr}`);
    const body = encodeURIComponent(message);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRequestResume = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).catch(() => {});
    }
    const subject = encodeURIComponent('CV Request — Ayomide Daniyan');
    const body = encodeURIComponent('Hi Ayomide, I would like to request a copy of your CV.');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    if (showToast) {
      showToast('Opening mail client — email copied to clipboard');
    }
  };

  const contactRows = [
    {
      icon: <Mail size={18} strokeWidth={1.75} />,
      title: EMAIL,
      desc: 'Direct email for roles, freelance projects, and inquiries.',
      action: { label: 'Copy Email', onClick: onCopyEmail },
      mono: true,
    },
    {
      icon: <Linkedin size={18} strokeWidth={1.75} />,
      title: 'linkedin.com/in/ayomide-daniyan-6a4233447',
      desc: 'Professional network, background, and recommendations.',
      action: {
        label: 'View Profile',
        onClick: () => window.open(PERSONAL.linkedin, '_blank', 'noopener,noreferrer'),
      },
      mono: true,
    },
    {
      icon: <Github size={18} strokeWidth={1.75} />,
      title: 'github.com/sammy-dev-001',
      desc: 'Public codebases, project architectures, and contributions.',
      action: {
        label: 'View GitHub',
        onClick: () => window.open(PERSONAL.github, '_blank', 'noopener,noreferrer'),
      },
      mono: true,
    },
    {
      icon: <FileText size={18} strokeWidth={1.75} />,
      title: 'Curriculum Vitae',
      desc: 'Available directly upon request.',
      action: { label: 'Request CV', onClick: handleRequestResume },
      mono: false,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-10 lg:px-16 transition-colors duration-300 border-t"
      style={{
        background: 'var(--canvas)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12">
          <span className="section-label">GET IN TOUCH</span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-3 mb-4 font-sans leading-tight"
            style={{ color: 'var(--ink)' }}
          >
            Let&apos;s build{' '}
            <em className="font-serif-italic font-normal" style={{ color: 'var(--accent)' }}>
              something
            </em>{' '}
            real.
          </h2>

          <p className="text-sm sm:text-base max-w-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
            High-velocity MVPs, real-time web platforms, or frontend architecture overhauls — if the
            problem demands craft and speed, let&apos;s talk.
          </p>
        </div>

        {/* Dual-Track Interactive Card */}
        <div
          className="card rounded-md overflow-hidden transition-colors duration-300 shadow-lg"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-strong)',
          }}
        >
          {/* Track Switcher Tab Bar (Min 44px touch targets) */}
          <div
            className="flex border-b transition-colors duration-300"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              onClick={() => setActiveTab(0)}
              className="flex-1 py-4 px-4 text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-150 touch-target text-center relative"
              style={{
                color: activeTab === 0 ? 'var(--accent)' : 'var(--muted)',
                background: activeTab === 0 ? 'var(--surface-hover)' : 'transparent',
              }}
            >
              Hire Me for a Project (Freelance)
              {activeTab === 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab(1)}
              className="flex-1 py-4 px-4 text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-150 touch-target text-center relative"
              style={{
                color: activeTab === 1 ? 'var(--accent)' : 'var(--muted)',
                background: activeTab === 1 ? 'var(--surface-hover)' : 'transparent',
              }}
            >
              Roles, Internships &amp; Collabs
              {activeTab === 1 && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </button>
          </div>

          {/* TAB 0: Hire Me (Project Brief Builder) */}
          {activeTab === 0 && (
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              {/* Scope Selector */}
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase mb-3 block" style={{ color: 'var(--muted)' }}>
                  SELECT PROJECT SCOPE
                </span>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_SCOPES.map((scope) => {
                    const isSelected = selectedScopes.includes(scope);
                    return (
                      <button
                        key={scope}
                        type="button"
                        onClick={() => toggleScope(scope)}
                        className="touch-target px-4 py-2 rounded font-mono text-xs transition-all duration-150 cursor-pointer"
                        style={{
                          background: isSelected ? 'rgba(255,77,0,0.1)' : 'var(--surface-subtle)',
                          border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                          color: isSelected ? 'var(--accent)' : 'var(--ink)',
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      >
                        {scope}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brief Textarea */}
              <div>
                <span className="font-mono text-[10px] tracking-widest uppercase mb-2 block" style={{ color: 'var(--muted)' }}>
                  PROJECT BRIEF / GOALS (OPTIONAL)
                </span>
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Tell me about your product, expected timeline, and what success looks like..."
                  rows={3}
                  className="w-full p-3.5 rounded text-sm font-sans outline-none transition-colors duration-150"
                  style={{
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border)',
                    color: 'var(--ink)',
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSendBrief}
                  className="btn-primary touch-target font-sans text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <Send size={15} strokeWidth={1.75} />
                  <span>Send Project Brief</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenGmail}
                  className="btn-secondary touch-target font-sans text-xs sm:text-sm font-medium cursor-pointer"
                  title="Open draft directly in Gmail web"
                >
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                  <span>Open in Gmail</span>
                </button>

                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="btn-secondary touch-target font-sans text-xs sm:text-sm font-medium cursor-pointer"
                >
                  <Copy size={15} strokeWidth={1.75} />
                  <span>Copy Email</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: Roles, Internships & Collabs */}
          {activeTab === 1 && (
            <div className="p-6 sm:p-8 flex flex-col divide-y transition-colors duration-300" style={{ borderColor: 'var(--border)' }}>
              {contactRows.map((row, idx) => (
                <div
                  key={idx}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: 'var(--surface-subtle)',
                        border: '1px solid var(--border)',
                        color: 'var(--accent)',
                      }}
                    >
                      {row.icon}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-semibold ${row.mono ? 'font-mono' : 'font-sans'}`}
                        style={{ color: 'var(--ink)' }}
                      >
                        {row.title}
                      </h4>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                        {row.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={row.action.onClick}
                    className="btn-secondary touch-target self-start sm:self-auto text-xs font-mono font-medium"
                  >
                    <span>{row.action.label}</span>
                    <ArrowUpRight size={13} strokeWidth={1.75} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
