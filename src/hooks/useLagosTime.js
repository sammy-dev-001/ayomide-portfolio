import { useState, useEffect } from 'react';
import { PERSONAL } from '../data/portfolio';

/**
 * Returns a live-updating Lagos time string in HH:MM:SS WAT format.
 */
export function useLagosTime() {
  const [time, setTime] = useState(() => getLagosTime());

  useEffect(() => {
    const id = setInterval(() => setTime(getLagosTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function getLagosTime() {
  try {
    return new Date().toLocaleTimeString('en-GB', {
      timeZone: PERSONAL.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }
}

export default useLagosTime;
