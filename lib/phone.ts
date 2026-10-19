// US phone check shared by the React forms (homepage form has its own copy in homepage-interactive.js).
// Returns null when valid, or a short customer-facing error message.
const INVALID_AREA = new Set(['000','111','123','211','311','411','511','555','611','711','811','911','987','999','666']);

export function phoneError(raw: string): string | null {
  let d = (raw || '').replace(/\D/g, '');
  if (d.length === 11 && d[0] === '1') d = d.slice(1);
  if (d.length !== 10) return 'Please enter a valid 10-digit US phone number.';
  const area = d.slice(0, 3), exch = d.slice(3, 6);
  if (area[0] === '0' || area[0] === '1' || INVALID_AREA.has(area)) return 'That area code is not valid. Please check your number.';
  if (exch[0] === '0' || exch[0] === '1') return 'That phone number is not valid. Please check it.';
  if (/^(\d)\1{9}$/.test(d) || d === '1234567890' || d === '9876543210') return 'That phone number is not valid. Please check it.';
  if (exch === '555' && d.slice(6, 8) === '01') return 'That phone number is not valid. Please check it.';
  return null;
}
