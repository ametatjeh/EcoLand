/**
 * Date Formatting and Parsing Utilities for Eco Land.
 *
 * Requirements:
 * - Display format to user: dd/mm/yyyy
 * - HTML type="date" and API payload format: YYYY-MM-DD
 * - Avoid timezone shift bugs by purely operating on date parts or string slicing
 * - Handle empty values gracefully
 */

/**
 * Normalizes any incoming date string (ISO 8601, 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', etc.)
 * to an HTML date input value format: 'YYYY-MM-DD'.
 * Returns '' if the date is invalid or null/empty.
 *
 * @param {string|null|undefined|Date} val
 * @returns {string} 'YYYY-MM-DD' or ''
 */
export function toDateInputValue(val) {
  if (!val) return '';
  if (val instanceof Date) {
    if (isNaN(val.getTime())) return '';
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const d = String(val.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  const str = String(val).trim();
  if (!str || str === 'dd/mm/yyyy' || str === '-') return '';

  // Case 1: Already starts with YYYY-MM-DD (e.g. "2026-10-14", "2026-10-14T00:00:00.000000Z")
  const ymdMatch = str.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (ymdMatch) {
    const y = ymdMatch[1];
    const m = ymdMatch[2].padStart(2, '0');
    const d = ymdMatch[3].padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // Case 2: dd/mm/yyyy or d/m/yyyy format
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmyMatch) {
    const d = dmyMatch[1].padStart(2, '0');
    const m = dmyMatch[2].padStart(2, '0');
    const y = dmyMatch[3];
    return `${y}-${m}-${d}`;
  }

  return '';
}

/**
 * Formats any date string or Date object to user-facing display: 'dd/mm/yyyy'.
 * Returns fallback (default '-') if invalid or empty.
 *
 * @param {string|null|undefined|Date} val
 * @param {string} fallback
 * @returns {string} 'DD/MM/YYYY' or fallback
 */
export function formatDateDisplay(val, fallback = '-') {
  if (!val) return fallback;
  const ymd = toDateInputValue(val);
  if (!ymd) return fallback;
  const [y, m, d] = ymd.split('-');
  return `${d}/${m}/${y}`;
}

/**
 * Parses user input or form field value to clean 'YYYY-MM-DD' payload for API.
 * Rejects invalid strings, placeholders like 'dd/mm/yyyy', or unparseable text.
 *
 * @param {string|null|undefined} val
 * @returns {string|null} 'YYYY-MM-DD' or null if empty/invalid
 */
export function parseDateForPayload(val) {
  if (!val) return null;
  const res = toDateInputValue(val);
  return res || null;
}
