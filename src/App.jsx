import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Works from './components/Works';
import Stack from './components/Stack';
import Proof from './components/Proof';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import CaseStudyDrawer from './components/CaseStudyDrawer';
import GuitarEasterEgg from './components/GuitarEasterEgg';
import Toast from './components/ui/Toast';

function PortfolioApp() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [guitarOpen, setGuitarOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('samueldaniyan564@gmail.com')
      .then(() => showToast('Email copied to clipboard'))
      .catch(() => showToast('Copy failed: samueldaniyan564@gmail.com'));
  };

  const openProject = (project) => {
    setActiveProject(project);
    document.body.classList.add('drawer-open');
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.classList.remove('drawer-open');
  };

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setGuitarOpen(false);
        closeProject();
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock scroll when overlays open
  useEffect(() => {
    if (cmdOpen || guitarOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!activeProject) {
      document.body.style.overflow = '';
    }
  }, [cmdOpen, guitarOpen, activeProject]);

  return (
    <>
      <div className="relative min-h-screen bg-canvas text-ink transition-colors duration-300">
        <TopBar
          onCmdOpen={() => setCmdOpen(true)}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
        />
        <main id="main-content">
          <Hero
            onCopyEmail={copyEmail}
            onCmdOpen={() => setCmdOpen(true)}
          />
          <Works onProjectOpen={openProject} />
          <Stack />
          <Proof onGuitarOpen={() => setGuitarOpen(true)} />
          <Contact onCopyEmail={copyEmail} showToast={showToast} />
        </main>
        <Footer onCopyEmail={copyEmail} />
      </div>

      {/* Overlays */}
      <CaseStudyDrawer
        project={activeProject}
        onClose={closeProject}
      />
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onCopyEmail={copyEmail}
        onGuitarOpen={() => { setCmdOpen(false); setGuitarOpen(true); }}
        onProjectOpen={(p) => { setCmdOpen(false); openProject(p); }}
      />
      <GuitarEasterEgg
        isOpen={guitarOpen}
        onClose={() => setGuitarOpen(false)}
      />
      {toast && <Toast message={toast} />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
