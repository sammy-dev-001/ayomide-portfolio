import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  return (
    <motion.div
      key="toast"
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 16, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        background: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: '4px',
        padding: '10px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        whiteSpace: 'nowrap',
      }}
    >
      <CheckCircle2 size={16} className="text-status" style={{ color: 'var(--status)' }} />
      <span
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: '13px',
          color: 'var(--ink)',
          fontWeight: 500,
        }}
      >
        {message}
      </span>
    </motion.div>
  );
}
